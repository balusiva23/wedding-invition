import React, { useState, useEffect } from 'react';
import { WeddingConfig } from '../../types/wedding';
import { KolamDivider } from '../common/KolamDivider';
import { Heart, Sparkles, Share2, Lock } from 'lucide-react';
import { languageService } from '../../services/languageService';
import { Language } from '../../data/translations';

interface ClosingSectionProps {
  config: WeddingConfig;
  onOpenShare: () => void;
  onOpenAdmin: () => void;
}

export const ClosingSection: React.FC<ClosingSectionProps> = ({
  config,
  onOpenShare,
  onOpenAdmin,
}) => {
  const { couple } = config;
  const [lang, setLang] = useState<Language>(languageService.getLanguage());

  useEffect(() => {
    const unsub = languageService.subscribe((l) => setLang(l));
    return () => unsub();
  }, []);

  const t = languageService.t();

  const brideName = lang === 'ta' && couple.tamilBrideName ? couple.tamilBrideName : couple.brideShortName;
  const groomName = lang === 'ta' && couple.tamilGroomName ? couple.tamilGroomName : couple.groomShortName;

  return (
    <footer className="relative pt-24 pb-12 px-4 bg-gradient-to-b from-[#180509] via-[#20050B] to-[#0A0204] text-center border-t border-amber-500/20 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="inline-flex items-center space-x-2 text-amber-400 mb-4">
          <Sparkles className="w-4 h-4" />
          <span className="font-serif text-xs uppercase tracking-[0.25em] font-semibold">
            {t.closing.gratitude}
          </span>
          <Sparkles className="w-4 h-4" />
        </div>

        <h2 className="font-display text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-300 to-amber-500 mb-3">
          {lang === 'ta' ? 'திருமணத்தில் சந்திப்போம்! ❤️' : 'See You at the Wedding! ❤️'}
        </h2>

        <p className="text-xs sm:text-sm text-amber-200/80 max-w-md mx-auto font-serif leading-relaxed mb-6">
          {t.closing.footerBlessing}
        </p>

        <KolamDivider className="my-8" />

        {/* Monogram Emblem */}
        <div className="w-16 h-16 rounded-full border-2 border-amber-400/50 bg-maroon-950 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-amber-500/10">
          <span className="font-serif text-lg font-bold text-amber-300">
            {couple.monogram}
          </span>
        </div>

        <div className="font-serif text-xs text-amber-300/80 uppercase tracking-widest mb-6">
          {brideName} & {groomName} — December 12, 2026
        </div>

        {/* Action Row */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <button
            onClick={onOpenShare}
            className="px-5 py-2.5 rounded-full bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/30 text-amber-200 text-xs font-serif uppercase tracking-wider flex items-center space-x-2 transition-all"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{t.closing.shareBtn}</span>
          </button>

          <button
            onClick={onOpenAdmin}
            className="px-5 py-2.5 rounded-full bg-black/40 hover:bg-black/60 border border-amber-500/20 text-amber-300/80 text-xs font-serif uppercase tracking-wider flex items-center space-x-2 transition-all"
          >
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.closing.adminLogin}</span>
          </button>
        </div>

        <p className="text-[11px] text-amber-100/40 font-light">
          Designed with love for South Indian Wedding Heritage 🪔 © 2026
        </p>
      </div>
    </footer>
  );
};

