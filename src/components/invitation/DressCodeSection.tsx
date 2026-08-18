import React, { useState, useEffect } from 'react';
import { WeddingConfig } from '../../types/wedding';
import { KolamDivider } from '../common/KolamDivider';
import { Sparkles, Palette } from 'lucide-react';
import { languageService } from '../../services/languageService';

export const DressCodeSection: React.FC<{ dressCode: WeddingConfig['dressCode'] }> = ({
  dressCode,
}) => {
  const [, setLangState] = useState(languageService.getLanguage());

  useEffect(() => {
    const unsub = languageService.subscribe((l) => setLangState(l));
    return () => unsub();
  }, []);

  const t = languageService.t();

  if (!dressCode.enabled) return null;

  return (
    <section id="dress-code" className="relative py-20 px-4 bg-[#180509] overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center space-x-2 text-amber-400 mb-2">
          <Palette className="w-4 h-4" />
          <span className="font-serif text-xs uppercase tracking-[0.25em] font-semibold">
            {t.dressCode.title}
          </span>
          <Palette className="w-4 h-4" />
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-amber-100 mb-3">
          {t.dressCode.title}
        </h2>

        <p className="text-xs sm:text-sm text-amber-100/70 max-w-md mx-auto font-light leading-relaxed mb-8">
          {t.dressCode.subtitle}
        </p>

        {/* 2 Column Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mb-8">
          <div className="p-6 rounded-3xl bg-gradient-to-b from-maroon-900/40 to-maroon-950/70 border border-amber-500/25">
            <span className="text-xs font-serif uppercase tracking-widest text-amber-400 font-bold block mb-2">
              👗 {t.dressCode.ladies}
            </span>
            <p className="text-xs sm:text-sm text-amber-100/90 font-light leading-relaxed">
              {dressCode.ladies}
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-gradient-to-b from-maroon-900/40 to-maroon-950/70 border border-amber-500/25">
            <span className="text-xs font-serif uppercase tracking-widest text-amber-400 font-bold block mb-2">
              👔 {t.dressCode.gentlemen}
            </span>
            <p className="text-xs sm:text-sm text-amber-100/90 font-light leading-relaxed">
              {dressCode.gentlemen}
            </p>
          </div>
        </div>

        {/* Color Palette Swatches */}
        {dressCode.colorsToEmbrace && dressCode.colorsToEmbrace.length > 0 && (
          <div className="inline-flex flex-col items-center p-4 rounded-2xl bg-black/40 border border-amber-500/20">
            <span className="text-[11px] font-serif uppercase tracking-wider text-amber-300 mb-3">
              {t.dressCode.auspiciousHues}
            </span>
            <div className="flex items-center gap-3">
              {dressCode.colorsToEmbrace.map((col, idx) => (
                <div
                  key={idx}
                  className="w-7 h-7 rounded-full shadow-md border border-white/20 hover:scale-125 transition-transform"
                  style={{ backgroundColor: col }}
                  title={col}
                />
              ))}
            </div>
          </div>
        )}

        <KolamDivider className="mt-12" />
      </div>
    </section>
  );
};

