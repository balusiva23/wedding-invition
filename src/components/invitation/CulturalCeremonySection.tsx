import React, { useState, useEffect } from 'react';
import { CulturalCeremony } from '../../types/wedding';
import { KolamDivider } from '../common/KolamDivider';
import { Sparkles, X, Compass, Flower2, Wind, Flame, HeartHandshake, Info } from 'lucide-react';
import { languageService } from '../../services/languageService';
import { Language } from '../../data/translations';

export const CulturalCeremonySection: React.FC<{ ceremonies: CulturalCeremony[] }> = ({
  ceremonies,
}) => {
  const [selectedCeremony, setSelectedCeremony] = useState<CulturalCeremony | null>(null);
  const [lang, setLang] = useState<Language>(languageService.getLanguage());

  useEffect(() => {
    const unsub = languageService.subscribe((l) => setLang(l));
    return () => unsub();
  }, []);

  const t = languageService.t();

  const activeCeremonies = ceremonies
    .filter((c) => c.enabled)
    .sort((a, b) => a.order - b.order);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'compass':
        return <Compass className="w-6 h-6 text-amber-400" />;
      case 'flower':
        return <Flower2 className="w-6 h-6 text-amber-400" />;
      case 'wind':
        return <Wind className="w-6 h-6 text-amber-400" />;
      case 'flame':
        return <Flame className="w-6 h-6 text-amber-400" />;
      default:
        return <HeartHandshake className="w-6 h-6 text-amber-400" />;
    }
  };

  return (
    <section id="ceremonies" className="relative py-24 px-4 bg-[#120508] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-amber-400 mb-2">
            <Sparkles className="w-4 h-4" />
            <span className="font-serif text-xs uppercase tracking-[0.25em] font-semibold">
              {t.ceremonies.title}
            </span>
            <Sparkles className="w-4 h-4" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-amber-100 mb-3">
            {t.ceremonies.title}
          </h2>

          <p className="text-xs sm:text-sm text-amber-100/70 font-light max-w-lg mx-auto leading-relaxed">
            {t.ceremonies.subtitle}
          </p>

          <KolamDivider className="my-6" />
        </div>

        {/* Ceremonies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeCeremonies.map((c) => (
            <div
              key={c.id}
              onClick={() => setSelectedCeremony(c)}
              className="cursor-pointer group relative rounded-3xl bg-gradient-to-b from-maroon-900/40 to-maroon-950/80 border border-amber-500/25 p-6 shadow-xl hover:border-amber-400 hover:shadow-amber-500/10 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-950/60 border border-amber-400/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {getIcon(c.icon)}
                  </div>
                  {c.timeSlot && (
                    <span className="text-[10px] uppercase font-serif tracking-wider text-amber-300/80 bg-amber-900/40 px-2.5 py-1 rounded-full border border-amber-500/20">
                      {c.timeSlot}
                    </span>
                  )}
                </div>

                <div className="mb-2">
                  <h3 className="font-serif text-xl font-bold text-amber-100 group-hover:text-amber-300 transition-colors">
                    {lang === 'ta' && c.tamilName ? c.tamilName : c.name}
                  </h3>
                  {lang !== 'ta' && c.tamilName && (
                    <span className="text-xs font-serif text-amber-400/90 font-medium">
                      {c.tamilName}
                    </span>
                  )}
                </div>

                <p className="text-xs text-amber-300/90 font-serif italic mb-3">
                  "{c.meaning}"
                </p>

                <p className="text-xs text-amber-100/70 font-light line-clamp-3 leading-relaxed">
                  {c.description}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-amber-500/15 flex items-center justify-between text-amber-300 text-xs font-serif group-hover:translate-x-1 transition-transform">
                <span className="flex items-center gap-1 font-medium">
                  <Info className="w-3.5 h-3.5" /> {t.ceremonies.spiritualSignificance}
                </span>
                <span>→</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ceremony Detailed Modal */}
      {selectedCeremony && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl rounded-3xl bg-gradient-to-b from-maroon-900 via-maroon-950 to-black border border-amber-400/50 p-6 sm:p-8 shadow-2xl shadow-black/80 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedCeremony(null)}
              className="absolute top-6 right-6 p-2 rounded-full text-amber-300/70 hover:text-white hover:bg-amber-500/20 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center">
                {getIcon(selectedCeremony.icon)}
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold text-amber-100">
                  {lang === 'ta' && selectedCeremony.tamilName ? selectedCeremony.tamilName : selectedCeremony.name}
                </h3>
                {selectedCeremony.tamilName && (
                  <span className="text-sm font-serif text-amber-400 font-medium">
                    {selectedCeremony.tamilName}
                  </span>
                )}
              </div>
            </div>

            {selectedCeremony.image && (
              <div className="relative h-56 rounded-2xl overflow-hidden mb-6 border border-amber-500/30">
                <img
                  src={selectedCeremony.image}
                  alt={selectedCeremony.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="space-y-4 text-xs sm:text-sm text-amber-100/90 leading-relaxed font-light">
              <div className="p-4 rounded-2xl bg-black/40 border border-amber-500/20">
                <span className="text-amber-300 font-serif font-bold uppercase tracking-wider text-[11px] block mb-1">
                  Meaning & Essence:
                </span>
                <p className="italic text-amber-200">{selectedCeremony.meaning}</p>
              </div>

              <div>
                <span className="text-amber-300 font-serif font-bold uppercase tracking-wider text-[11px] block mb-1">
                  Ritual Description:
                </span>
                <p>{selectedCeremony.description}</p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-400/30">
                <span className="text-amber-300 font-serif font-bold uppercase tracking-wider text-[11px] block mb-1">
                  Auspicious Significance:
                </span>
                <p>{selectedCeremony.auspiciousSignificance}</p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedCeremony(null)}
                className="px-6 py-2.5 rounded-full bg-amber-500 text-maroon-950 font-serif font-bold text-xs uppercase tracking-wider hover:bg-amber-400 transition-colors shadow"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
