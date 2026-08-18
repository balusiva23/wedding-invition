import React from 'react';
import { WeddingConfig, DivinePairThemeId } from '../../types/wedding';
import { Palette, Sparkles, Check } from 'lucide-react';
import { divinePairsList } from '../../data/divineThemesData';
import { audioService } from '../../services/audioService';

interface ThemeBrandingEditorProps {
  config: WeddingConfig;
  onUpdate: (updater: (prev: WeddingConfig) => WeddingConfig) => void;
}

export const ThemeBrandingEditor: React.FC<ThemeBrandingEditorProps> = ({ config, onUpdate }) => {
  const { theme } = config;

  const presets = [
    {
      id: 'royal-maroon',
      name: 'Royal Maroon & Gold',
      tamilName: 'செட்டிநாடு பட்டு & தங்கம்',
      region: 'Classic South Indian',
      primary: '#7E2230',
      secondary: '#C59A27',
      bgDark: '#120508',
      desc: 'Timeless Kanchipuram silk maroon and woven pure gold zari.',
    },
    {
      id: 'ivory-gold',
      name: 'Warm Ivory & Royal Gold',
      tamilName: 'சந்தன வெண்மை & பொன்',
      region: 'Temple Traditional',
      primary: '#982536',
      secondary: '#D4AF37',
      bgDark: '#1a0d08',
      desc: 'Auspicious sandalwood ivory with radiant temple gold.',
    },
    {
      id: 'temple-green',
      name: 'Temple Green & Saffron',
      tamilName: 'கோவில் பச்சை & குங்குமம்',
      region: 'Chola Temple Heritage',
      primary: '#1A382B',
      secondary: '#D4AF37',
      bgDark: '#0A1811',
      desc: 'Sacred Tulasi & Mango leaf emerald green with divine Kumkum.',
    },
    {
      id: 'sunset-terracotta',
      name: 'Sunset Terracotta & Zari',
      tamilName: 'மண் வாசம் & ஜரிகை',
      region: 'Vaigai River Sunset',
      primary: '#A8482A',
      secondary: '#E8B342',
      bgDark: '#180A06',
      desc: 'Earthy Chettinad terracotta clay with warm dusk radiance.',
    },
    {
      id: 'chettinad-heritage',
      name: 'Chettinad Heritage & Athangudi',
      tamilName: 'செட்டிநாடு அரண்மனை மரபு',
      region: 'Karaikudi / Sivagangai',
      primary: '#8E2800',
      secondary: '#D4AF37',
      bgDark: '#170503',
      desc: 'Authentic Athangudi tile colors, Burma teakwood, and brass lamps.',
    },
    {
      id: 'madurai-meenakshi',
      name: 'Madurai Meenakshi & Malligai',
      tamilName: 'மதுரை மீனாட்சி & மல்லிகை',
      region: 'Madurai Pandiya Nadu',
      primary: '#880827',
      secondary: '#EAA023',
      bgDark: '#1A0307',
      desc: 'Sacred Meenakshi Amman temple crimson, turmeric, and fresh Madurai jasmine.',
    },
    {
      id: 'thanjavur-royal',
      name: 'Thanjavur Brihadeeswara & 24K Gold',
      tamilName: 'தஞ்சாவூர் அரச தங்கக் கலை',
      region: 'Thanjavur / Cauvery Delta',
      primary: '#133826',
      secondary: '#E5B80B',
      bgDark: '#0A130E',
      desc: 'Grand Chola empire emerald with rich 24K Tanjore painting gold leaf.',
    },
    {
      id: 'kongu-tradition',
      name: 'Kongu Nadu & Festive Marigold',
      tamilName: 'கொங்கு நாட்டு மங்கள மஞ்சள்',
      region: 'Coimbatore / Erode / Salem',
      primary: '#D97706',
      secondary: '#991B1B',
      bgDark: '#1C060B',
      desc: 'Vibrant Sevvanthi flower yellow and deep wedding scarlet.',
    },
    {
      id: 'kanyakumari-dawn',
      name: 'Kanyakumari Ocean Dawn & Coral',
      tamilName: 'கன்னியாகுமரி முக்கடல் உதயம்',
      region: 'Kanyakumari / Tirunelveli',
      primary: '#B93838',
      secondary: '#F5A623',
      bgDark: '#0E0C17',
      desc: 'Triveni Sangamam dawn colors with Coromandel coastal pearl luster.',
    },
  ];

  const handleApplyPreset = (preset: (typeof presets)[0]) => {
    onUpdate((prev) => ({
      ...prev,
      theme: {
        ...prev.theme,
        preset: preset.id as any,
        primaryColor: preset.primary,
        secondaryColor: preset.secondary,
        bgDark: preset.bgDark,
      },
    }));
  };

  const handleSelectDivinePair = (divineId: DivinePairThemeId) => {
    audioService.playTempleBellSound();
    onUpdate((prev) => ({
      ...prev,
      theme: {
        ...prev.theme,
        divinePair: divineId,
      },
    }));
  };

  const handleIntensity = (intensity: 'low' | 'medium' | 'high') => {
    onUpdate((prev) => ({
      ...prev,
      theme: {
        ...prev.theme,
        particlesIntensity: intensity,
      },
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-serif font-bold text-amber-200 flex items-center gap-2">
          <Palette className="w-5 h-5 text-amber-400" />
          <span>Themes & Visual Branding</span>
        </h2>
        <p className="text-xs text-amber-100/60 font-light mt-1">
          Configure South Indian divine god background themes, aesthetic color palettes, and floral particle intensity.
        </p>
      </div>

      {/* South Indian Divine Pair God Background Theme */}
      <div className="p-6 rounded-2xl bg-[#1c050a] border border-amber-500/25 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-serif font-bold text-amber-300">
              South Indian Divine Couple Theme (தெய்வ ஜோடி அருள் தீம்)
            </h3>
          </div>
          <span className="text-[11px] text-amber-300/80 font-serif">5 Sacred Pairs</span>
        </div>

        <p className="text-xs text-amber-100/70 font-light leading-relaxed">
          Select your family's Ishta Deivam (இஷ்ட தெய்வம்). The Header & Hero section background will illuminate with the divine couple's sanctum Prabhavali arch, sacred shlokas, and traditional motifs.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {divinePairsList.map((divine) => {
            const isSelected = (theme.divinePair || 'meenakshi-sundareswarar') === divine.id;
            return (
              <div
                key={divine.id}
                onClick={() => handleSelectDivinePair(divine.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between space-y-3 ${
                  isSelected
                    ? 'border-amber-400 bg-amber-500/15 shadow-xl shadow-amber-500/15 ring-1 ring-amber-400/50'
                    : 'border-amber-500/20 bg-black/40 hover:border-amber-400/50 hover:bg-black/60'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between mb-1">
                    <span className="font-serif text-sm font-bold text-amber-100 flex items-center gap-1.5">
                      <span>🪔</span>
                      <span>{divine.name}</span>
                    </span>
                    {isSelected && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-400 text-maroon-950 font-serif text-[10px] font-bold">
                        ACTIVE
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-amber-300 font-medium block">
                    {divine.tamilName}
                  </span>
                  <span className="text-[10px] text-amber-400/70 block mt-0.5">
                    📍 {divine.tamilTemple}
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-black/40 border border-amber-500/15 text-[11px] text-amber-200/80 font-serif italic">
                  "{divine.tamilInvocation}"
                </div>

                <p className="text-[11px] text-amber-100/70 font-light">
                  {divine.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Centerpiece Selection (God Portrait vs 3D Lamp vs Both) */}
        <div className="pt-4 border-t border-amber-500/20 space-y-3">
          <div>
            <span className="text-xs font-serif font-bold text-amber-200 block">
              Header Centerpiece Display Mode (தலைப்பு மையக் காட்சி)
            </span>
            <span className="text-[11px] text-amber-100/60 font-light">
              Choose whether to display the Divine God Portrait, 3D Brass Lamp, or Both in the Hero section.
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'god-portrait', title: '🖼️ Divine God Portrait', tamil: 'தெய்வ திருவுருவ படம்', desc: 'Framed Tanjore divine portrait with golden aura' },
              { id: 'lamp-3d', title: '🪔 3D Brass Kuthuvilakku', tamil: 'மங்கள குத்துவிளக்கு', desc: 'Interactive 3D traditional brass oil lamp' },
              { id: 'god-and-lamp', title: '✨ Portrait + Deepam Combo', tamil: 'படம் மற்றும் திருவிளக்கு', desc: 'Divine picture flanked by auspicious deepams' },
            ].map((mode) => {
              const isSelected = (theme.centerpieceType || 'god-portrait') === mode.id;
              return (
                <button
                  key={mode.id}
                  onClick={() => {
                    audioService.playTempleBellSound();
                    onUpdate((prev) => ({
                      ...prev,
                      theme: {
                        ...prev.theme,
                        centerpieceType: mode.id as any,
                      },
                    }));
                  }}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'border-amber-400 bg-amber-500/20 text-amber-100 ring-1 ring-amber-400/50'
                      : 'border-amber-500/20 bg-black/40 text-amber-200/70 hover:bg-black/60'
                  }`}
                >
                  <span className="font-serif text-xs font-bold block">{mode.title}</span>
                  <span className="text-[10px] text-amber-300 block">{mode.tamil}</span>
                  <span className="text-[9px] text-amber-100/60 block mt-1">{mode.desc}</span>
                </button>
              );
            })}
          </div>

          {/* Custom God Image URL Input */}
          <div className="pt-2">
            <label className="text-xs font-serif font-medium text-amber-200 block mb-1">
              Custom Deity Picture URL (விருப்ப தெய்வ படம் / இணைய முகவரி)
            </label>
            <input
              type="text"
              value={theme.customGodImageUrl || ''}
              onChange={(e) =>
                onUpdate((prev) => ({
                  ...prev,
                  theme: {
                    ...prev.theme,
                    customGodImageUrl: e.target.value,
                  },
                }))
              }
              placeholder="Leave blank to use default theme portrait or paste image link"
              className="w-full px-3 py-2 rounded-xl bg-black/60 border border-amber-500/30 text-xs text-amber-100 placeholder-amber-100/30 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* Prabhavali Arch Toggle */}
        <div className="pt-3 border-t border-amber-500/20 flex items-center justify-between">
          <div>
            <span className="text-xs font-serif font-bold text-amber-200 block">
              Golden Prabhavali (திருவாச்சி) Sanctum Sanctorum Arch
            </span>
            <span className="text-[11px] text-amber-100/60 font-light">
              Display ornate South Indian golden temple arch behind couple centerpiece
            </span>
          </div>
          <input
            type="checkbox"
            checked={theme.showDivinePrabhavali !== false}
            onChange={(e) =>
              onUpdate((prev) => ({
                ...prev,
                theme: {
                  ...prev.theme,
                  showDivinePrabhavali: e.target.checked,
                },
              }))
            }
            className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400 cursor-pointer"
          />
        </div>
      </div>

      {/* Preset Cards */}
      <div className="p-6 rounded-2xl bg-[#1c050a] border border-amber-500/25 space-y-4">
        <h3 className="text-sm font-serif font-bold text-amber-300">Cultural Theme Presets</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {presets.map((p) => (
            <div
              key={p.id}
              onClick={() => handleApplyPreset(p)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between space-y-3 ${
                theme.preset === p.id
                  ? 'border-amber-400 bg-amber-500/15 shadow-xl shadow-amber-500/10 ring-1 ring-amber-400/50'
                  : 'border-amber-500/20 bg-black/40 hover:border-amber-400/50 hover:bg-black/60'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-serif text-sm font-bold text-amber-100">
                      {p.name}
                    </span>
                    {theme.preset === p.id && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-400 text-maroon-950 font-serif text-[10px] font-bold">
                        ACTIVE
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-amber-300 font-tamil font-medium block">
                    {p.tamilName}
                  </span>
                  <span className="text-[10px] text-amber-400/60 uppercase font-mono tracking-wider mt-0.5 block">
                    📍 {p.region}
                  </span>
                </div>

                <div className="flex items-center space-x-1.5 p-1 rounded-full bg-black/60 border border-amber-500/30">
                  <div className="w-5 h-5 rounded-full border border-white/20 shadow-sm" style={{ backgroundColor: p.primary }} title={`Primary: ${p.primary}`} />
                  <div className="w-5 h-5 rounded-full border border-white/20 shadow-sm" style={{ backgroundColor: p.secondary }} title={`Secondary: ${p.secondary}`} />
                  <div className="w-5 h-5 rounded-full border border-white/20 shadow-sm" style={{ backgroundColor: p.bgDark }} title={`Dark BG: ${p.bgDark}`} />
                </div>
              </div>

              <p className="text-[11px] text-amber-100/70 font-light leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Particle Intensity */}
      <div className="p-6 rounded-2xl bg-[#1c050a] border border-amber-500/25 space-y-4">
        <h3 className="text-sm font-serif font-bold text-amber-300">Jasmine & Marigold Petal Density</h3>

        <div className="grid grid-cols-3 gap-3">
          {(['low', 'medium', 'high'] as const).map((level) => (
            <button
              key={level}
              onClick={() => handleIntensity(level)}
              className={`py-2.5 rounded-xl border text-xs font-serif uppercase tracking-wider capitalize transition-all ${
                theme.particlesIntensity === level
                  ? 'bg-amber-500 text-maroon-950 font-bold'
                  : 'bg-black/40 border-amber-500/20 text-amber-200/70'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

