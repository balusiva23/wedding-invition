import React, { useState, useEffect } from 'react';
import { WeddingRingScene } from '../3d/WeddingRingScene';
import { KolamDivider } from '../common/KolamDivider';
import { WeddingConfig } from '../../types/wedding';
import { Heart, MapPin, Sparkles } from 'lucide-react';
import { languageService } from '../../services/languageService';
import { Language } from '../../data/translations';

export const CoupleSection: React.FC<{ config: WeddingConfig }> = ({ config }) => {
  const { couple } = config;
  const [lang, setLang] = useState<Language>(languageService.getLanguage());

  useEffect(() => {
    const unsub = languageService.subscribe((l) => setLang(l));
    return () => unsub();
  }, []);

  const t = languageService.t();

  const brideName = lang === 'ta' && couple.tamilBrideName ? couple.tamilBrideName : couple.brideFullName;
  const groomName = lang === 'ta' && couple.tamilGroomName ? couple.tamilGroomName : couple.groomFullName;
  const quote = lang === 'ta' && couple.tamilInvitationQuote ? couple.tamilInvitationQuote : couple.invitationQuote;

  return (
    <section id="couple" className="relative py-24 px-4 bg-[#120508] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-amber-400 mb-2">
            <Sparkles className="w-4 h-4" />
            <span className="font-serif text-xs uppercase tracking-[0.25em] font-semibold">
              {t.couple.title}
            </span>
            <Sparkles className="w-4 h-4" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-amber-100 mb-4">
            {t.couple.title}
          </h2>

          <p className="text-xs sm:text-sm text-amber-100/70 font-light leading-relaxed italic">
            "{quote}"
          </p>

          <KolamDivider className="my-6" />
        </div>

        {/* Couple Cards Grid with 3D Ring Centerpiece */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Bride Column */}
          <div className="lg:col-span-4 flex flex-col items-center text-center p-6 rounded-3xl bg-gradient-to-b from-maroon-900/40 via-maroon-950/60 to-black/80 border border-amber-500/25 shadow-2xl hover:border-amber-400/50 transition-all group">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden p-1.5 bg-gradient-to-tr from-amber-400 via-amber-200 to-amber-600 shadow-xl mb-6">
              <img
                src={couple.heroImage || "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800&auto=format&fit=crop"}
                alt={couple.brideFullName}
                className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 rounded-full border-2 border-amber-300/40 pointer-events-none" />
            </div>

            <span className="text-xs font-serif uppercase tracking-[0.2em] text-amber-400/90 font-semibold mb-1">
              {t.couple.theBride}
            </span>
            <h3 className="font-serif text-2xl font-bold text-amber-100 mb-2">
              {brideName}
            </h3>

            <div className="flex items-center space-x-1.5 text-xs text-amber-300/70 mb-4">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>{couple.brideOrigin}</span>
            </div>

            <p className="text-xs text-amber-100/80 font-light leading-relaxed border-t border-amber-500/20 pt-4">
              {lang === 'ta' ? 'பெற்றோர்:' : 'Daughter of'} <strong className="text-amber-200 font-medium">{couple.brideParents}</strong>
            </p>
          </div>

          {/* Center 3D Ring Column */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center text-center p-4">
            <div className="w-64 h-64 flex items-center justify-center">
              <WeddingRingScene className="w-full h-full" />
            </div>

            <div className="text-amber-300/90 font-serif text-sm tracking-widest uppercase font-bold mt-2">
              {lang === 'ta' ? 'இரு மனங்கள் இணையும் பந்தம்' : 'Two Souls Bound by Destiny'}
            </div>
            <p className="text-[11px] text-amber-200/60 max-w-xs mt-1 font-light">
              {lang === 'ta' ? 'வேத மந்திரங்கள் முழங்க, புனித அக்னி சாட்சியாக தொடங்கும் புதிய இல்லற வாழ்வு.' : 'Under the sacred agni and chanting of Vedic mantras, two lives unite in timeless devotion.'}
            </p>
          </div>

          {/* Groom Column */}
          <div className="lg:col-span-4 flex flex-col items-center text-center p-6 rounded-3xl bg-gradient-to-b from-maroon-900/40 via-maroon-950/60 to-black/80 border border-amber-500/25 shadow-2xl hover:border-amber-400/50 transition-all group">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden p-1.5 bg-gradient-to-tr from-amber-400 via-amber-200 to-amber-600 shadow-xl mb-6">
              <img
                src={couple.couplePhoto || "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop"}
                alt={couple.groomFullName}
                className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 rounded-full border-2 border-amber-300/40 pointer-events-none" />
            </div>

            <span className="text-xs font-serif uppercase tracking-[0.2em] text-amber-400/90 font-semibold mb-1">
              {t.couple.theGroom}
            </span>
            <h3 className="font-serif text-2xl font-bold text-amber-100 mb-2">
              {groomName}
            </h3>

            <div className="flex items-center space-x-1.5 text-xs text-amber-300/70 mb-4">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>{couple.groomOrigin}</span>
            </div>

            <p className="text-xs text-amber-100/80 font-light leading-relaxed border-t border-amber-500/20 pt-4">
              {lang === 'ta' ? 'பெற்றோர்:' : 'Son of'} <strong className="text-amber-200 font-medium">{couple.groomParents}</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

