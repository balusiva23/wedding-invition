import React, { useState, useEffect } from 'react';
import { Menu, X, Share2, Sparkles, Settings, Globe, Lock } from 'lucide-react';
import { languageService } from '../../services/languageService';
import { Language } from '../../data/translations';
import { WeddingConfig } from '../../types/wedding';

interface NavigationProps {
  monogram: string;
  couple?: WeddingConfig['couple'];
  onOpenShare: () => void;
  onOpenAdmin: () => void;
  currentMode: 'invitation' | 'admin';
}

export const Navigation: React.FC<NavigationProps> = ({
  monogram,
  couple,
  onOpenShare,
  onOpenAdmin,
  currentMode,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState<Language>(languageService.getLanguage());

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    const unsub = languageService.subscribe((newLang) => {
      setLang(newLang);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      unsub();
    };
  }, []);

  const t = languageService.t();

  const handleToggleLang = () => {
    const next = languageService.toggleLanguage();
    setLang(next);
  };

  const navLinks = [
    { name: t.nav.story, href: '#story' },
    { name: t.nav.ceremonies, href: '#ceremonies' },
    { name: t.nav.events, href: '#events' },
    { name: t.nav.family, href: '#family' },
    { name: t.nav.gallery, href: '#gallery' },
    { name: t.nav.venue, href: '#venue' },
    { name: t.nav.wishes, href: '#wishes' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#1a060b]/85 backdrop-blur-md py-3 border-b border-amber-500/20 shadow-xl shadow-black/40'
            : 'bg-gradient-to-b from-black/80 via-black/30 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Monogram Brand */}
          <a
            href="#hero"
            className="flex items-center space-x-3 group cursor-pointer shrink-0 mr-2 md:mr-6 lg:mr-8"
          >
            <div className="h-11 sm:h-12 min-w-[48px] px-3.5 rounded-full border-2 border-amber-400/70 bg-gradient-to-br from-amber-400/25 via-maroon-900/60 to-amber-950/80 flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.35)] group-hover:border-amber-300 group-hover:scale-105 transition-all shrink-0">
              <span className="font-serif font-bold text-amber-300 text-xs sm:text-sm tracking-wider whitespace-nowrap drop-shadow-sm flex items-center justify-center leading-none">
                {monogram}
              </span>
            </div>
            <span className="font-serif tracking-widest text-xs sm:text-sm uppercase text-amber-100/90 hidden sm:inline-block font-semibold whitespace-nowrap">
              {lang === 'ta'
                ? (couple?.tamilBrideName && couple?.tamilGroomName ? `${couple.tamilBrideName} & ${couple.tamilGroomName}` : 'அனன்யா & அர்ஜுன்')
                : (couple?.brideShortName && couple?.groomShortName ? `${couple.brideShortName} & ${couple.groomShortName}` : 'Ananya & Arjun')}
            </span>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center space-x-5 xl:space-x-7 shrink-0">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs uppercase tracking-widest text-amber-100/80 hover:text-amber-300 transition-colors font-medium relative group py-1 whitespace-nowrap"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gradient-to-r from-amber-400 to-amber-200 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Quick Action CTAs */}
          <div className="flex items-center space-x-2.5 sm:space-x-3">
            {/* Primary Language Switcher Button (English ⇄ தமிழ்) */}
            <button
              onClick={handleToggleLang}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-amber-400/50 bg-amber-500/15 hover:bg-amber-400/25 text-amber-200 text-xs font-bold font-serif shadow-sm transition-transform active:scale-95 cursor-pointer"
              title={lang === 'en' ? 'தமிழில் பார்க்க (Switch to Tamil)' : 'Switch to English'}
              aria-label="Switch Language"
            >
              <Globe className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
              <span>{lang === 'en' ? 'தமிழ்' : 'English'}</span>
            </button>

            {/* Share Button */}
            <button
              onClick={onOpenShare}
              className="p-2 rounded-full border border-amber-500/30 text-amber-300 hover:bg-amber-500/10 transition-colors"
              title="Share Wedding Invitation"
              aria-label="Share Wedding Invitation"
            >
              <Share2 className="w-4 h-4" />
            </button>

            {/* RSVP Quick Button */}
            <a
              href="#rsvp"
              className="hidden sm:inline-flex items-center space-x-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-maroon-950 font-serif font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-transform active:scale-95"
            >
              <span>{t.nav.rsvp}</span>
              <span className="text-sm">❤️</span>
            </a>

            {/* Admin Mode Switcher */}
            <button
              onClick={onOpenAdmin}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${
                currentMode === 'admin'
                  ? 'border-amber-400 bg-amber-400/20 text-amber-200'
                  : 'border-amber-500/30 text-amber-300/80 hover:bg-amber-500/10'
              }`}
              title="Open Admin Dashboard & Settings"
            >
              <Lock className="w-3 h-3 text-amber-400" />
              <span className="hidden lg:inline">
                {currentMode === 'admin' ? t.nav.exitEditor : t.nav.editor}
              </span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-amber-300 md:hidden hover:bg-amber-500/10"
              aria-label="Open Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Glass Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#120508]/95 backdrop-blur-xl md:hidden flex flex-col justify-center items-center px-6 py-20 text-center animate-fadeIn">
          <div className="w-16 h-16 rounded-full border-2 border-amber-400/60 bg-maroon-900/60 flex items-center justify-center mb-6 shadow-xl shadow-amber-500/10">
            <span className="font-serif text-xl font-bold text-amber-300">{monogram}</span>
          </div>

          {/* Language Switch in Mobile Menu */}
          <div className="mb-6">
            <button
              onClick={() => {
                handleToggleLang();
              }}
              className="flex items-center space-x-2 px-5 py-2 rounded-full border border-amber-400 bg-amber-500/20 text-amber-200 text-sm font-bold font-serif shadow-lg"
            >
              <Globe className="w-4 h-4 text-amber-400" />
              <span>{lang === 'en' ? 'மொழி: தமிழ்' : 'Language: English'}</span>
            </button>
          </div>

          <nav className="flex flex-col space-y-5 mb-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-base tracking-widest uppercase text-amber-100 hover:text-amber-400 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="flex flex-col w-full max-w-xs space-y-3">
            <a
              href="#rsvp"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-maroon-950 font-serif font-bold text-sm uppercase tracking-widest shadow-xl flex items-center justify-center space-x-2"
            >
              <span>{t.rsvp.title}</span>
              <span>❤️</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full py-2.5 rounded-full border border-amber-500/40 text-amber-200 font-serif text-xs uppercase tracking-wider flex items-center justify-center space-x-2 bg-amber-950/40"
            >
              <Lock className="w-4 h-4 text-amber-400" />
              <span>{t.nav.editor}</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

