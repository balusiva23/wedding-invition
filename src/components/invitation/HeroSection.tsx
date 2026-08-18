import React, { useState, useEffect } from 'react';
import { WeddingLampScene } from '../3d/WeddingLampScene';
import { TempleBell } from '../common/TempleBell';
import { KolamDivider } from '../common/KolamDivider';
import { DivineHeaderBackground } from '../common/DivineHeaderBackground';
import { WeddingConfig, DivinePairThemeId } from '../../types/wedding';
import { getDivinePairConfig, divinePairsList, resolveDivinePairInfo } from '../../data/divineThemesData';
import { Calendar, MapPin, ChevronDown, Sparkles, Heart } from 'lucide-react';
import { audioService } from '../../services/audioService';
import { languageService } from '../../services/languageService';
import { Language } from '../../data/translations';

interface HeroSectionProps {
  config: WeddingConfig;
  onEnterStory: () => void;
  onOpenDigitalCard: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  config,
  onEnterStory,
  onOpenDigitalCard,
}) => {
  const { couple, venue, theme } = config;
  const [lang, setLang] = useState<Language>(languageService.getLanguage());
  const [activeDivinePair, setActiveDivinePair] = useState<DivinePairThemeId>(
    theme.divinePair || 'meenakshi-sundareswarar'
  );
  const [showDivineMenu, setShowDivineMenu] = useState(false);

  useEffect(() => {
    const unsub = languageService.subscribe((l) => setLang(l));
    return () => unsub();
  }, []);

  useEffect(() => {
    if (theme.divinePair) {
      setActiveDivinePair(theme.divinePair);
    }
  }, [theme.divinePair]);

  const t = languageService.t();
  const currentDivine = resolveDivinePairInfo(activeDivinePair, theme.customDivinePair);

  const handleEnterClick = () => {
    if (config.music.enabled && !audioService.getIsPlaying()) {
      audioService.toggleMusic(config.music.audioUrl);
    }
    onEnterStory();
  };

  const handleSelectDivinePair = (pairId: DivinePairThemeId) => {
    setActiveDivinePair(pairId);
    audioService.playTempleBellSound();
    setShowDivineMenu(false);
  };

  const brideName = lang === 'ta' && couple.tamilBrideName ? couple.tamilBrideName : couple.brideShortName;
  const groomName = lang === 'ta' && couple.tamilGroomName ? couple.tamilGroomName : couple.groomShortName;
  const tagline = lang === 'ta' && couple.tamilTagline ? couple.tamilTagline : couple.heroTagline;
  const subtitle = lang === 'ta' && couple.tamilSubtitle ? couple.tamilSubtitle : couple.heroSubtitle;
  const venueDisplayName = lang === 'ta' && venue.tamilName ? venue.tamilName : venue.name;

  const [centerpieceMode, setCenterpieceMode] = useState<'god-portrait' | 'lamp-3d' | 'god-and-lamp'>(
    theme.centerpieceType || 'god-portrait'
  );

  useEffect(() => {
    if (theme.centerpieceType) {
      setCenterpieceMode(theme.centerpieceType);
    }
  }, [theme.centerpieceType]);

  const handleToggleCenterpiece = (mode: 'god-portrait' | 'lamp-3d' | 'god-and-lamp') => {
    setCenterpieceMode(mode);
    audioService.playTempleBellSound();
  };

  const godImageUrl = theme.customGodImageUrl || currentDivine.image;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-between text-center px-4 pt-24 pb-12 overflow-hidden bg-gradient-to-b from-[#180509] via-[#24060C] to-[#120508]"
    >
      {/* South Indian Divine Pair Sanctum Sanctorum Background */}
      <DivineHeaderBackground
        divinePairId={activeDivinePair}
        showPrabhavali={theme.showDivinePrabhavali !== false}
      />

      {/* Hanging Temple Bells on corners */}
      <div className="absolute top-20 left-4 sm:left-12 z-20">
        <TempleBell />
      </div>
      <div className="absolute top-20 right-4 sm:right-12 z-20">
        <TempleBell />
      </div>

      {/* Top Auspicious Invocation Header */}
      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center animate-fadeIn">
        {/* Dynamic Divine Pair Invocation Banner & Quick Selectors */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
          <div className="relative inline-block">
            <button
              onClick={() => setShowDivineMenu(!showDivineMenu)}
              className="group inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-amber-400/40 bg-gradient-to-r from-amber-950/70 via-maroon-950/80 to-amber-950/70 backdrop-blur-md hover:border-amber-400 hover:scale-105 transition-all shadow-lg cursor-pointer"
              title="Click to switch Divine Couple Theme / தெய்வ அருள்"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
              <span className="font-serif text-[11px] sm:text-xs uppercase tracking-[0.2em] text-amber-300 font-semibold">
                {lang === 'ta' ? currentDivine.tamilInvocation : currentDivine.invocation}
              </span>
              <span className="text-[10px] text-amber-400/60 font-sans group-hover:text-amber-200">▾</span>
            </button>

            {/* Divine Pair Dropdown Menu */}
            {showDivineMenu && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 sm:w-80 rounded-2xl bg-[#22060B]/95 backdrop-blur-xl border border-amber-400/50 p-2 shadow-2xl shadow-black z-50 text-left animate-fadeIn">
                <div className="px-3 py-1.5 text-[10px] font-serif uppercase tracking-widest text-amber-400/80 border-b border-amber-500/20 font-bold flex items-center justify-between">
                  <span>{lang === 'ta' ? 'தெய்வ ஜோடி அருள் தீம்' : 'Select Divine Pair Theme'}</span>
                  <span className="text-[9px] text-amber-300/60">5 Sacred Pairs</span>
                </div>

                <div className="space-y-1 mt-1.5">
                  {divinePairsList.map((item) => {
                    const isSelected = item.id === activeDivinePair;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleSelectDivinePair(item.id)}
                        className={`w-full p-2 rounded-xl text-left transition-all flex items-center justify-between text-xs font-serif ${
                          isSelected
                            ? 'bg-amber-500/25 border border-amber-400/60 text-amber-100 font-bold'
                            : 'text-amber-200/80 hover:bg-amber-950/60 hover:text-white'
                        }`}
                      >
                        <div className="flex flex-col">
                          <span className="text-xs">
                            🪔 {lang === 'ta' ? item.tamilName : item.name}
                          </span>
                          <span className="text-[10px] text-amber-300/60">
                            {lang === 'ta' ? item.tamilTemple : item.temple}
                          </span>
                        </div>
                        {isSelected && <span className="text-amber-400 text-xs">✓</span>}
                      </button>
                    );
                  })}

                  {/* Custom Deity Option in Dropdown */}
                  {(theme.customDivinePair?.enabled || theme.divinePair === 'custom') && (
                    <button
                      onClick={() => handleSelectDivinePair('custom')}
                      className={`w-full p-2 rounded-xl text-left transition-all flex items-center justify-between text-xs font-serif ${
                        activeDivinePair === 'custom'
                          ? 'bg-amber-500/25 border border-amber-400/60 text-amber-100 font-bold'
                          : 'text-amber-200/80 hover:bg-amber-950/60 hover:text-white'
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className="text-xs">
                          ✨ {lang === 'ta' ? (theme.customDivinePair?.tamilName || 'விருப்ப குலதெய்வம்') : (theme.customDivinePair?.name || 'Custom Family Deity')}
                        </span>
                        <span className="text-[10px] text-amber-300/60">
                          {lang === 'ta' ? (theme.customDivinePair?.tamilTemple || 'குடும்ப திருக்கோவில்') : (theme.customDivinePair?.temple || 'Family Shrine')}
                        </span>
                      </div>
                      {activeDivinePair === 'custom' && <span className="text-amber-400 text-xs">✓</span>}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Centerpiece Mode Switcher Pill */}
          <div className="inline-flex items-center p-0.5 rounded-full bg-black/60 border border-amber-500/30 backdrop-blur-md shadow-inner text-[10px] font-serif">
            <button
              onClick={() => handleToggleCenterpiece('god-portrait')}
              className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                centerpieceMode === 'god-portrait'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-maroon-950 font-bold shadow'
                  : 'text-amber-200/70 hover:text-white'
              }`}
              title="Divine God Portrait / தெய்வ படம்"
            >
              🖼️ {lang === 'ta' ? 'தெய்வ படம்' : 'God Portrait'}
            </button>
            <button
              onClick={() => handleToggleCenterpiece('lamp-3d')}
              className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                centerpieceMode === 'lamp-3d'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-maroon-950 font-bold shadow'
                  : 'text-amber-200/70 hover:text-white'
              }`}
              title="3D Brass Lamp / குத்துவிளக்கு"
            >
              🪔 {lang === 'ta' ? 'திருவிளக்கு' : '3D Lamp'}
            </button>
            <button
              onClick={() => handleToggleCenterpiece('god-and-lamp')}
              className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                centerpieceMode === 'god-and-lamp'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-maroon-950 font-bold shadow'
                  : 'text-amber-200/70 hover:text-white'
              }`}
              title="God Portrait + Lamp / இரண்டும்"
            >
              ✨ {lang === 'ta' ? 'இரண்டும்' : 'Both'}
            </button>
          </div>
        </div>

        {/* Sacred Shloka Subtitle */}
        <p className="text-[11px] sm:text-xs text-amber-300/90 font-serif italic max-w-xl mx-auto mb-2 tracking-wide">
          "{lang === 'ta' ? currentDivine.tamilShloka : currentDivine.shloka}"
        </p>

        <h3 className="font-serif text-xs sm:text-sm tracking-[0.25em] uppercase text-amber-200/80 mb-2">
          {tagline}
        </h3>

        <p className="text-xs sm:text-sm text-amber-100/70 max-w-lg mx-auto font-light leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* Centerpiece: Dynamic Divine God Portrait OR 3D Brass Lamp OR Combo */}
      <div className="relative z-10 w-full max-w-4xl mx-auto my-auto flex flex-col items-center">
        {/* Mode 1: Divine Couple God Portrait (Ornate Sacred Tanjore Frame) */}
        {centerpieceMode === 'god-portrait' && (
          <div className="relative flex flex-col items-center justify-center my-3 sm:my-5 animate-fadeIn">
            {/* Glowing Golden Aura behind portrait */}
            <div className="absolute inset-0 -m-6 rounded-3xl bg-radial from-amber-400/35 via-amber-600/15 to-transparent blur-xl pointer-events-none" />

            {/* Sacred Ornate Frame Container */}
            <div className="relative p-2 sm:p-3 rounded-2xl bg-gradient-to-b from-[#4a2408] via-[#2d1204] to-[#1a0802] border-2 sm:border-3 border-amber-400 shadow-[0_0_35px_rgba(212,175,55,0.45)]">
              {/* Inner Gold Foil Rim */}
              <div className="relative overflow-hidden rounded-xl border border-amber-300/60">
                <img
                  src={godImageUrl}
                  alt={currentDivine.name}
                  className="w-52 sm:w-64 md:w-72 h-52 sm:h-64 md:h-72 object-cover object-center shadow-2xl transition-transform duration-700 hover:scale-105"
                  onError={(e) => {
                    // Fallback to meenakshi if custom URL fails
                    (e.target as HTMLImageElement).src = '/images/gods/meenakshi-sundareswarar.jpg';
                  }}
                />

                {/* Subtle Holy Glow & Shimmer */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-amber-400/10 pointer-events-none" />

                {/* Corner Golden Embellishments */}
                <div className="absolute top-1 left-1 text-amber-300 text-xs">🪔</div>
                <div className="absolute top-1 right-1 text-amber-300 text-xs">🪔</div>
                <div className="absolute bottom-1 left-1 text-amber-300 text-xs">🌸</div>
                <div className="absolute bottom-1 right-1 text-amber-300 text-xs">🌸</div>
              </div>

              {/* Bottom Divine Caption Plaque */}
              <div className="mt-2 text-center">
                <span className="inline-block px-3 py-0.5 rounded-full bg-black/70 border border-amber-400/50 text-[10px] sm:text-[11px] font-serif font-bold text-amber-200 uppercase tracking-widest shadow-inner">
                  {lang === 'ta' ? currentDivine.tamilName : currentDivine.name}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Mode 2: 3D Brass Kuthuvilakku Lamp */}
        {centerpieceMode === 'lamp-3d' && (
          <div className="w-full flex justify-center -my-8 sm:-my-12 animate-fadeIn">
            <WeddingLampScene />
          </div>
        )}

        {/* Mode 3: Divine God Portrait + Glowing Lamps Combo */}
        {centerpieceMode === 'god-and-lamp' && (
          <div className="relative flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-8 my-2 animate-fadeIn">
            {/* Left Kuthuvilakku Lamp Glow */}
            <div className="hidden sm:flex flex-col items-center opacity-85">
              <span className="text-4xl animate-bounce">🪔</span>
              <span className="text-[10px] text-amber-300 font-serif mt-1">தீபம்</span>
            </div>

            {/* Center Sacred Divine Picture */}
            <div className="relative p-2 sm:p-2.5 rounded-2xl bg-gradient-to-b from-[#4a2408] via-[#2d1204] to-[#1a0802] border-2 border-amber-400 shadow-[0_0_30px_rgba(212,175,55,0.4)]">
              <div className="relative overflow-hidden rounded-xl border border-amber-300/60">
                <img
                  src={godImageUrl}
                  alt={currentDivine.name}
                  className="w-44 sm:w-56 md:w-60 h-44 sm:h-56 md:h-60 object-cover object-center shadow-2xl"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/gods/meenakshi-sundareswarar.jpg';
                  }}
                />
              </div>
              <div className="mt-1.5 text-center">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-black/70 border border-amber-400/50 text-[10px] font-serif font-bold text-amber-200 uppercase tracking-wider">
                  {lang === 'ta' ? currentDivine.tamilName : currentDivine.name}
                </span>
              </div>
            </div>

            {/* Right Kuthuvilakku Lamp Glow */}
            <div className="hidden sm:flex flex-col items-center opacity-85">
              <span className="text-4xl animate-bounce">🪔</span>
              <span className="text-[10px] text-amber-300 font-serif mt-1">மங்களம்</span>
            </div>
          </div>
        )}

        {/* Grand Royal Couple Names */}
        <div
          className={`relative flex flex-col items-center transition-all ${
            centerpieceMode === 'lamp-3d'
              ? '-mt-4 sm:-mt-8'
              : 'mt-6 sm:mt-8 md:mt-10 pt-2'
          }`}
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6">
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-300 to-amber-500 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
              {brideName}
            </h1>

            <span className="font-display text-2xl sm:text-4xl text-amber-400/80 italic font-serif">
              &
            </span>

            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-300 to-amber-500 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
              {groomName}
            </h1>
          </div>

          <KolamDivider className="my-4" />

          {/* Wedding Date & Venue Chips */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-amber-100/90 font-serif">
            <div className="flex items-center space-x-2 bg-maroon-950/60 border border-amber-500/30 px-3.5 py-1.5 rounded-full shadow-inner">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>{t.hero.weddingDateLabel}</span>
            </div>

            <div className="flex items-center space-x-2 bg-maroon-950/60 border border-amber-500/30 px-3.5 py-1.5 rounded-full shadow-inner">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>{venueDisplayName}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA Buttons */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
        <button
          onClick={handleEnterClick}
          className="group relative px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-maroon-950 font-serif font-bold text-sm uppercase tracking-widest shadow-xl shadow-amber-500/25 transition-all hover:scale-105 active:scale-95 flex items-center space-x-2 cursor-pointer"
        >
          <span>{t.hero.enterStory}</span>
          <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
        </button>

        <button
          onClick={onOpenDigitalCard}
          className="px-6 py-3 rounded-full border border-amber-400/40 hover:bg-amber-500/10 text-amber-200 font-serif text-xs uppercase tracking-wider transition-all"
        >
          {t.hero.viewPatrikai}
        </button>
      </div>
    </section>
  );
};


