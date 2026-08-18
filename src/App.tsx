import React, { useState, useEffect } from 'react';
import { weddingDataService } from './services/weddingDataService';
import { languageService } from './services/languageService';
import { WeddingConfig } from './types/wedding';
import { Navigation } from './components/common/Navigation';
import { HeroSection } from './components/invitation/HeroSection';
import { CountdownSection } from './components/invitation/CountdownSection';
import { CoupleSection } from './components/invitation/CoupleSection';
import { StoryTimelineSection } from './components/invitation/StoryTimelineSection';
import { CulturalCeremonySection } from './components/invitation/CulturalCeremonySection';
import { EventsSection } from './components/invitation/EventsSection';
import { FamilySection } from './components/invitation/FamilySection';
import { GallerySection } from './components/invitation/GallerySection';
import { VideoSection } from './components/invitation/VideoSection';
import { VenueSection } from './components/invitation/VenueSection';
import { TravelSection } from './components/invitation/TravelSection';
import { DressCodeSection } from './components/invitation/DressCodeSection';
import { GiftSection } from './components/invitation/GiftSection';
import { RSVPSection } from './components/invitation/RSVPSection';
import { GuestWishesSection } from './components/invitation/GuestWishesSection';
import { ClosingSection } from './components/invitation/ClosingSection';
import { DigitalInvitationModal } from './components/invitation/DigitalInvitationModal';
import { ShareModal } from './components/invitation/ShareModal';
import { QRCodeModal } from './components/invitation/QRCodeModal';
import { MusicPlayer } from './components/common/MusicPlayer';
import { PetalParticleCanvas } from './components/3d/PetalParticleCanvas';
import { CustomCursor } from './components/common/CustomCursor';
import { ToastContainer, ToastMessage } from './components/common/Toast';
import { AdminLayout } from './components/admin/AdminLayout';

export function App() {
  const [config, setConfig] = useState<WeddingConfig>(weddingDataService.getConfig());
  const [mode, setMode] = useState<'invitation' | 'admin'>('invitation');
  const [lang, setLang] = useState(languageService.getLanguage());

  // Modals
  const [showDigitalCard, setShowDigitalCard] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showQR, setShowQR] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Mobile Sticky RSVP visibility
  const [showStickyRSVP, setShowStickyRSVP] = useState(true);

  useEffect(() => {
    // Check URL hash or query for /admin
    if (
      window.location.hash === '#admin' ||
      window.location.hash === '#/admin' ||
      window.location.pathname.includes('/admin') ||
      new URLSearchParams(window.location.search).get('admin') === 'true'
    ) {
      setMode('admin');
    }

    const unsubData = weddingDataService.subscribe(() => {
      setConfig(weddingDataService.getConfig());
    });

    const unsubLang = languageService.subscribe((newLang) => {
      setLang(newLang);
    });

    const handleScroll = () => {
      const rsvpEl = document.getElementById('rsvp');
      if (rsvpEl) {
        const rect = rsvpEl.getBoundingClientRect();
        const inView = rect.top < window.innerHeight && rect.bottom >= 0;
        setShowStickyRSVP(!inView);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      unsubData();
      unsubLang();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Update theme variables & language class on root document
  useEffect(() => {
    if (config.theme) {
      document.documentElement.style.setProperty('--color-primary', config.theme.primaryColor || '#982536');
      document.documentElement.style.setProperty('--color-secondary', config.theme.secondaryColor || '#D4AF37');
      document.documentElement.style.setProperty('--color-accent', config.theme.accentColor || '#C94C4C');
      document.documentElement.style.setProperty('--color-bg-dark', config.theme.bgDark || '#180509');
      document.documentElement.style.setProperty('--color-bg-light', config.theme.bgLight || '#24060C');
    }
    if (lang === 'ta') {
      document.body.classList.add('lang-ta');
    } else {
      document.body.classList.remove('lang-ta');
    }
  }, [config.theme, lang]);

  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const newToast: ToastMessage = {
      ...toast,
      id: 'toast-' + Date.now(),
    };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
    }, 4000);
  };

  const handleEnterStory = () => {
    const target = document.getElementById('story') || document.getElementById('couple');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Render individual dynamic section based on key
  const renderSection = (secKey: string) => {
    if (config.sections && (config.sections as any)[secKey] === false) {
      return null;
    }

    switch (secKey) {
      case 'hero':
        return (
          <HeroSection
            key="hero"
            config={config}
            onEnterStory={handleEnterStory}
            onOpenDigitalCard={() => setShowDigitalCard(true)}
          />
        );
      case 'countdown':
        return (
          <CountdownSection
            key="countdown"
            weddingDate={config.couple.weddingDate}
            muhurthamTime={config.couple.muhurthamTime}
            venueName={config.venue.name}
          />
        );
      case 'couple':
        return <CoupleSection key="couple" config={config} />;
      case 'story':
        return <StoryTimelineSection key="story" milestones={config.storyMilestones} />;
      case 'ceremonies':
        return <CulturalCeremonySection key="ceremonies" ceremonies={config.ceremonies} />;
      case 'events':
        return <EventsSection key="events" events={config.events} />;
      case 'family':
        return <FamilySection key="family" familyMembers={config.familyMembers} />;
      case 'gallery':
        return <GallerySection key="gallery" gallery={config.gallery} />;
      case 'video':
        return <VideoSection key="video" video={config.video} />;
      case 'venue':
        return <VenueSection key="venue" venue={config.venue} />;
      case 'travel':
        return <TravelSection key="travel" accommodations={config.accommodations} />;
      case 'dressCode':
        return <DressCodeSection key="dressCode" dressCode={config.dressCode} />;
      case 'gift':
        return <GiftSection key="gift" gift={config.gift} />;
      case 'rsvp':
        return <RSVPSection key="rsvp" weddingDate={config.couple.weddingDate} />;
      case 'wishes':
        return <GuestWishesSection key="wishes" />;
      case 'closing':
        return (
          <ClosingSection
            key="closing"
            config={config}
            onOpenShare={() => setShowShare(true)}
            onOpenAdmin={() => setMode('admin')}
          />
        );
      default:
        return null;
    }
  };

  if (mode === 'admin') {
    return (
      <>
        <CustomCursor />
        <AdminLayout
          onReturnToPublic={() => setMode('invitation')}
          onShowToast={addToast}
        />
        <ToastContainer
          toasts={toasts}
          onDismiss={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))}
        />
      </>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#120508] text-[#F7F5EE] antialiased selection:bg-amber-500/30 selection:text-amber-200">
      {/* Falling Floral Petals Shower */}
      <PetalParticleCanvas density={config.theme.particlesIntensity} />

      {/* Gold Aura Custom Cursor */}
      <CustomCursor />

      {/* Top Floating Glass Navigation */}
      <Navigation
        monogram={config.couple.monogram}
        couple={config.couple}
        onOpenShare={() => setShowShare(true)}
        onOpenAdmin={() => setMode('admin')}
        currentMode={mode}
      />

      {/* Dynamic Ordered Sections */}
      <main>
        {config.sectionOrder.map((secKey) => renderSection(secKey))}
      </main>

      {/* Floating Classical Music Player */}
      {config.music.enabled && (
        <MusicPlayer
          title={config.music.title}
          artist={config.music.artist}
          audioUrl={config.music.audioUrl}
        />
      )}

      {/* Mobile Sticky RSVP Pill */}
      {showStickyRSVP && (
        <div className="fixed bottom-6 left-6 z-30 sm:hidden animate-fadeIn">
          <a
            href="#rsvp"
            className="px-4 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-maroon-950 font-serif font-bold text-xs uppercase tracking-widest shadow-xl flex items-center space-x-1.5 border border-amber-300"
          >
            <span>RSVP</span>
            <span>❤️</span>
          </a>
        </div>
      )}

      {/* Modals */}
      {showDigitalCard && (
        <DigitalInvitationModal
          config={config}
          onClose={() => setShowDigitalCard(false)}
        />
      )}

      {showShare && (
        <ShareModal
          config={config}
          onClose={() => setShowShare(false)}
          onOpenQR={() => setShowQR(true)}
        />
      )}

      {showQR && (
        <QRCodeModal
          monogram={config.couple.monogram}
          onClose={() => setShowQR(false)}
        />
      )}

      {/* Toasts */}
      <ToastContainer
        toasts={toasts}
        onDismiss={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))}
      />
    </div>
  );
}
export default App;
