import React, { useState, useEffect } from 'react';
import { WeddingConfig } from '../../types/wedding';
import { weddingDataService } from '../../services/weddingDataService';
import {
  Users,
  Heart,
  Calendar,
  Sparkles,
  Camera,
  MapPin,
  Hotel,
  Palette,
  Gift,
  CheckSquare,
  MessageSquare,
  Sliders,
  Save,
  Globe,
  RotateCcw,
  Eye,
  FileCode,
  Layers,
  ArrowLeft,
  Smartphone,
  Tablet,
  Monitor,
  Menu,
  X,
  Volume2,
  KeyRound,
  Lock,
  Check
} from 'lucide-react';
import { CoupleEditor } from './CoupleEditor';
import { StoryEditor } from './StoryEditor';
import { EventsEditor } from './EventsEditor';
import { CeremonyEditor } from './CeremonyEditor';
import { FamilyEditor } from './FamilyEditor';
import { GalleryEditor } from './GalleryEditor';
import { VenueEditor } from './VenueEditor';
import { TravelEditor } from './TravelEditor';
import { DressCodeEditor } from './DressCodeEditor';
import { GiftEditor } from './GiftEditor';
import { RSVPTable } from './RSVPTable';
import { WishesModeration } from './WishesModeration';
import { ThemeBrandingEditor } from './ThemeBrandingEditor';
import { SectionOrderVisibilityEditor } from './SectionOrderVisibilityEditor';
import { BackupRestore } from './BackupRestore';
import { MusicEditor } from './MusicEditor';
import { ToastMessage } from '../common/Toast';

interface AdminLayoutProps {
  onReturnToPublic: () => void;
  onShowToast: (toast: Omit<ToastMessage, 'id'>) => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ onReturnToPublic, onShowToast }) => {
  const [activeTab, setActiveTab] = useState<string>('couple');
  const [draftConfig, setDraftConfig] = useState<WeddingConfig>(weddingDataService.getDraftConfig());
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Admin PIN Protection
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('admin_authenticated') === 'true';
  });
  const [enteredPin, setEnteredPin] = useState('');
  const [pinError, setPinError] = useState('');

  // Change PIN Modal State
  const [showChangePinModal, setShowChangePinModal] = useState(false);
  const [currentPinInput, setCurrentPinInput] = useState('');
  const [newPinInput, setNewPinInput] = useState('');
  const [confirmPinInput, setConfirmPinInput] = useState('');
  const [changePinError, setChangePinError] = useState('');

  useEffect(() => {
    const unsub = weddingDataService.subscribe(() => {
      setDraftConfig(weddingDataService.getDraftConfig());
    });
    return () => unsub();
  }, []);

  const handleVerifyPin = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPin = draftConfig.adminPin || '2026';
    if (enteredPin.trim() === correctPin || (enteredPin.trim() === '2026' && !draftConfig.adminPin)) {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_authenticated', 'true');
      setPinError('');
      onShowToast({
        type: 'success',
        title: 'Admin Unlocked! 🔓',
        message: 'Welcome to Wedding Management Control Suite.',
      });
    } else {
      setPinError('Incorrect PIN. Please enter your valid security passcode.');
    }
  };

  const handleChangePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentActualPin = draftConfig.adminPin || '2026';
    
    if (currentPinInput.trim() !== currentActualPin && !(currentPinInput.trim() === '2026' && !draftConfig.adminPin)) {
      setChangePinError('Current PIN is incorrect.');
      return;
    }

    if (!newPinInput.trim() || newPinInput.trim().length < 4) {
      setChangePinError('New PIN must be at least 4 characters/digits.');
      return;
    }

    if (newPinInput.trim() !== confirmPinInput.trim()) {
      setChangePinError('New PIN and Confirm PIN do not match.');
      return;
    }

    const updatedPin = newPinInput.trim();
    handleUpdateConfig((prev) => ({
      ...prev,
      adminPin: updatedPin,
    }));

    // Also auto-save to current published config
    weddingDataService.saveDraft({
      ...draftConfig,
      adminPin: updatedPin,
    });
    weddingDataService.publishConfig({
      ...draftConfig,
      adminPin: updatedPin,
    });

    setShowChangePinModal(false);
    setCurrentPinInput('');
    setNewPinInput('');
    setConfirmPinInput('');
    setChangePinError('');

    onShowToast({
      type: 'success',
      title: 'Security PIN Updated! 🔐',
      message: 'Your new admin passcode has been saved successfully.',
    });
  };

  const handleUpdateConfig = (updater: (prev: WeddingConfig) => WeddingConfig) => {
    const updated = updater(draftConfig);
    setDraftConfig(updated);
    weddingDataService.saveDraft(updated);
    setHasUnsavedChanges(true);
  };

  const handlePublish = () => {
    weddingDataService.publishConfig(draftConfig);
    setHasUnsavedChanges(false);
    onShowToast({
      type: 'success',
      title: 'Published Successfully! ✨',
      message: 'All changes are now live on your public wedding invitation.',
    });
  };

  const handleReset = () => {
    if (window.confirm('Reset all wedding configuration to default sample data?')) {
      weddingDataService.resetToDefault();
      setDraftConfig(weddingDataService.getDraftConfig());
      setHasUnsavedChanges(false);
      onShowToast({
        type: 'info',
        title: 'Reset to Defaults',
        message: 'Loaded sample South Indian wedding demo content.',
      });
    }
  };

  const navItems = [
    { id: 'couple', label: 'Couple Details', icon: <Heart className="w-4 h-4" /> },
    { id: 'story', label: 'Story Timeline', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'events', label: 'Wedding Events', icon: <Calendar className="w-4 h-4" /> },
    { id: 'ceremonies', label: 'Cultural Ceremonies', icon: <Sliders className="w-4 h-4" /> },
    { id: 'family', label: 'Family Blessings', icon: <Users className="w-4 h-4" /> },
    { id: 'gallery', label: 'Photo Gallery', icon: <Camera className="w-4 h-4" /> },
    { id: 'venue', label: 'Venue & Map', icon: <MapPin className="w-4 h-4" /> },
    { id: 'travel', label: 'Guest Accommodations', icon: <Hotel className="w-4 h-4" /> },
    { id: 'dress-code', label: 'Attire & Dress Code', icon: <Palette className="w-4 h-4" /> },
    { id: 'gift', label: 'Gift & Blessings Info', icon: <Gift className="w-4 h-4" /> },
    { id: 'music', label: 'Music & Audio', icon: <Volume2 className="w-4 h-4" /> },
    { id: 'rsvp', label: 'RSVP Management', icon: <CheckSquare className="w-4 h-4" /> },
    { id: 'wishes', label: 'Guest Wishes Moderation', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'theme', label: 'Theme & Styling', icon: <Palette className="w-4 h-4" /> },
    { id: 'sections', label: 'Sections Visibility & Order', icon: <Layers className="w-4 h-4" /> },
    { id: 'backup', label: 'Backup & Security Settings', icon: <FileCode className="w-4 h-4" /> },
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#140609] text-amber-100 flex items-center justify-center p-4 antialiased">
        <div className="w-full max-w-md p-8 rounded-3xl bg-[#22060B] border border-amber-500/40 shadow-2xl shadow-black/90 text-center space-y-6 animate-fadeIn">
          <div className="w-16 h-16 rounded-full bg-amber-500/20 border-2 border-amber-400/50 flex items-center justify-center mx-auto text-amber-300 shadow-inner">
            <Lock className="w-8 h-8 text-amber-400" />
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-amber-100 mb-1">
              Admin & Organizer Suite
            </h2>
            <p className="text-xs text-amber-300/70 font-light leading-relaxed">
              Enter your Security PIN to access wedding customization and management.
            </p>
          </div>

          <form onSubmit={handleVerifyPin} className="space-y-4">
            <div>
              <input
                type="password"
                maxLength={8}
                autoFocus
                placeholder="••••"
                value={enteredPin}
                onChange={(e) => setEnteredPin(e.target.value)}
                className="w-full text-center tracking-[0.4em] px-4 py-3 rounded-2xl bg-black/60 border border-amber-500/40 text-amber-100 text-lg focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-500/30"
              />
              {pinError && (
                <p className="text-xs text-rose-400 mt-2 font-light">{pinError}</p>
              )}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onReturnToPublic}
                className="flex-1 py-3 rounded-xl border border-amber-500/30 text-amber-200 hover:bg-amber-500/10 text-xs font-serif transition-colors"
              >
                Back to Site
              </button>
              <button
                type="submit"
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-maroon-950 font-serif font-bold text-xs uppercase tracking-widest shadow-xl transition-transform active:scale-95"
              >
                Unlock Editor
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#140609] text-amber-100 flex flex-col antialiased">
      {/* Admin Top Header */}
      <header className="sticky top-0 z-40 bg-[#24060C] border-b border-amber-500/30 px-4 sm:px-6 py-3 flex items-center justify-between shadow-xl">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-2 text-amber-300 md:hidden hover:bg-amber-500/10 rounded-lg"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <button
            onClick={onReturnToPublic}
            className="p-2 rounded-xl bg-black/40 hover:bg-black/60 border border-amber-500/20 text-amber-300 flex items-center space-x-1.5 text-xs font-serif transition-colors"
            title="Return to Public Wedding Invitation"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">View Public Site</span>
          </button>

          <div className="h-6 w-[1px] bg-amber-500/20 hidden sm:block" />

          <div className="flex flex-col">
            <span className="text-xs font-serif font-bold text-amber-200">
              Wedding Content Editor & Dashboard
            </span>
            <span className="text-[10px] text-amber-400/60 hidden sm:inline">
              Phase 2 Organizer Control Suite
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2.5">
          {/* Live Preview Button */}
          <button
            onClick={() => onReturnToPublic()}
            className="px-3.5 py-1.5 rounded-full bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/40 text-amber-200 text-xs font-serif uppercase tracking-wider flex items-center space-x-1.5 transition-all"
            title="Preview changes in full invitation mode"
          >
            <Eye className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden md:inline">Live Preview</span>
          </button>
          {/* Change PIN Button */}
          <button
            onClick={() => {
              setChangePinError('');
              setCurrentPinInput('');
              setNewPinInput('');
              setConfirmPinInput('');
              setShowChangePinModal(true);
            }}
            className="px-3 py-1.5 rounded-full bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/40 text-amber-200 text-xs font-serif uppercase tracking-wider flex items-center space-x-1.5 transition-all"
            title="Change Admin Security PIN / Passcode"
          >
            <KeyRound className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Change PIN</span>
          </button>

          {/* Reset button */}
          <button
            onClick={handleReset}
            className="p-2 rounded-full border border-amber-500/20 text-amber-400/60 hover:text-amber-200 hover:bg-amber-950/60 transition-colors"
            title="Reset to sample demo data"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Publish CTA */}
          <button
            onClick={handlePublish}
            className="px-5 py-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-maroon-950 font-serif font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 flex items-center space-x-1.5 transition-all active:scale-95"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Publish Live</span>
          </button>
        </div>
      </header>

      {/* Main Content Area: Sidebar + Active Editor */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="w-64 bg-[#1c050a] border-r border-amber-500/20 flex-col justify-between hidden md:flex shrink-0">
          <div className="py-4 overflow-y-auto max-h-[calc(100vh-60px)]">
            <div className="px-4 text-[10px] uppercase font-serif tracking-widest text-amber-400/50 mb-2 font-semibold">
              Configuration Sections
            </div>
            <nav className="space-y-0.5 px-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-serif text-left transition-all ${
                    activeTab === item.id
                      ? 'bg-amber-500 text-maroon-950 font-bold shadow-md'
                      : 'text-amber-200/70 hover:bg-amber-950/40 hover:text-amber-100'
                  }`}
                >
                  <span className={activeTab === item.id ? 'text-maroon-950' : 'text-amber-400'}>
                    {item.icon}
                  </span>
                  <span className="truncate">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Mobile Slide-out Drawer */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden bg-black/80 backdrop-blur-md flex">
            <div className="w-72 bg-[#1c050a] border-r border-amber-500/30 p-4 flex flex-col justify-between h-full overflow-y-auto">
              <div>
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-amber-500/20">
                  <span className="font-serif text-sm font-bold text-amber-200">Editor Menu</span>
                  <button
                    onClick={() => setMobileSidebarOpen(false)}
                    className="p-1 text-amber-400"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="space-y-1">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setMobileSidebarOpen(false);
                      }}
                      className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-serif text-left ${
                        activeTab === item.id
                          ? 'bg-amber-500 text-maroon-950 font-bold'
                          : 'text-amber-200/80 hover:bg-amber-950/40'
                      }`}
                    >
                      <span className={activeTab === item.id ? 'text-maroon-950' : 'text-amber-400'}>
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>
            <div className="flex-1" onClick={() => setMobileSidebarOpen(false)} />
          </div>
        )}

        {/* Active Editor Panel */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 bg-[#120508]">
          <div className="max-w-4xl mx-auto pb-16">
            {activeTab === 'couple' && (
              <CoupleEditor config={draftConfig} onUpdate={handleUpdateConfig} />
            )}
            {activeTab === 'story' && (
              <StoryEditor config={draftConfig} onUpdate={handleUpdateConfig} />
            )}
            {activeTab === 'events' && (
              <EventsEditor config={draftConfig} onUpdate={handleUpdateConfig} />
            )}
            {activeTab === 'ceremonies' && (
              <CeremonyEditor config={draftConfig} onUpdate={handleUpdateConfig} />
            )}
            {activeTab === 'family' && (
              <FamilyEditor config={draftConfig} onUpdate={handleUpdateConfig} />
            )}
            {activeTab === 'gallery' && (
              <GalleryEditor config={draftConfig} onUpdate={handleUpdateConfig} />
            )}
            {activeTab === 'venue' && (
              <VenueEditor config={draftConfig} onUpdate={handleUpdateConfig} />
            )}
            {activeTab === 'travel' && (
              <TravelEditor config={draftConfig} onUpdate={handleUpdateConfig} />
            )}
            {activeTab === 'dress-code' && (
              <DressCodeEditor config={draftConfig} onUpdate={handleUpdateConfig} />
            )}
            {activeTab === 'gift' && (
              <GiftEditor config={draftConfig} onUpdate={handleUpdateConfig} />
            )}
            {activeTab === 'music' && (
              <MusicEditor config={draftConfig} onUpdate={handleUpdateConfig} />
            )}
            {activeTab === 'rsvp' && <RSVPTable />}
            {activeTab === 'wishes' && <WishesModeration />}
            {activeTab === 'theme' && (
              <ThemeBrandingEditor config={draftConfig} onUpdate={handleUpdateConfig} />
            )}
            {activeTab === 'sections' && (
              <SectionOrderVisibilityEditor config={draftConfig} onUpdate={handleUpdateConfig} />
            )}
            {activeTab === 'backup' && (
              <BackupRestore
                onOpenChangePin={() => {
                  setChangePinError('');
                  setCurrentPinInput('');
                  setNewPinInput('');
                  setConfirmPinInput('');
                  setShowChangePinModal(true);
                }}
                onImportSuccess={() => {
                  setDraftConfig(weddingDataService.getDraftConfig());
                  onShowToast({
                    type: 'success',
                    title: 'Import Successful',
                    message: 'Restored wedding data from JSON backup.',
                  });
                }}
              />
            )}
          </div>
        </main>
      </div>

      {/* Change Password / PIN Modal */}
      {showChangePinModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="relative w-full max-w-md p-6 sm:p-8 rounded-3xl bg-[#22060B] border border-amber-500/40 shadow-2xl text-left space-y-5">
            <button
              onClick={() => setShowChangePinModal(false)}
              className="absolute top-5 right-5 p-1.5 rounded-full text-amber-400/80 hover:text-amber-200 hover:bg-amber-950/60"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
                <KeyRound className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-amber-100">
                  Change Admin Passcode / PIN
                </h3>
                <p className="text-xs text-amber-300/60 font-light">
                  Set a custom secret passcode to guard your wedding editor.
                </p>
              </div>
            </div>

            {changePinError && (
              <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs font-light">
                {changePinError}
              </div>
            )}

            <form onSubmit={handleChangePinSubmit} className="space-y-4 text-xs font-serif">
              <div>
                <label className="block text-amber-300 mb-1.5 font-medium">
                  Current Passcode / PIN *
                </label>
                <input
                  type="password"
                  required
                  placeholder="Enter current PIN"
                  value={currentPinInput}
                  onChange={(e) => setCurrentPinInput(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-amber-500/30 text-amber-100 text-sm focus:outline-none focus:border-amber-400 tracking-widest"
                />
              </div>

              <div>
                <label className="block text-amber-300 mb-1.5 font-medium">
                  New Passcode / PIN * (Min 4 digits)
                </label>
                <input
                  type="password"
                  required
                  maxLength={12}
                  placeholder="Enter new PIN"
                  value={newPinInput}
                  onChange={(e) => setNewPinInput(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-amber-500/30 text-amber-100 text-sm focus:outline-none focus:border-amber-400 tracking-widest"
                />
              </div>

              <div>
                <label className="block text-amber-300 mb-1.5 font-medium">
                  Confirm New Passcode / PIN *
                </label>
                <input
                  type="password"
                  required
                  maxLength={12}
                  placeholder="Re-enter new PIN"
                  value={confirmPinInput}
                  onChange={(e) => setConfirmPinInput(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-amber-500/30 text-amber-100 text-sm focus:outline-none focus:border-amber-400 tracking-widest"
                />
              </div>

              <div className="pt-3 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowChangePinModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-amber-500/30 text-amber-200 hover:bg-amber-500/10 text-xs font-serif transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-maroon-950 font-serif font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center space-x-1.5 transition-transform active:scale-95"
                >
                  <Check className="w-4 h-4 text-maroon-950" />
                  <span>Update PIN</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
