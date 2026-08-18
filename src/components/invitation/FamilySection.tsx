import React, { useState, useEffect } from 'react';
import { FamilyMember } from '../../types/wedding';
import { KolamDivider } from '../common/KolamDivider';
import { Heart, Users } from 'lucide-react';
import { languageService } from '../../services/languageService';

export const FamilySection: React.FC<{ familyMembers: FamilyMember[] }> = ({ familyMembers }) => {
  const [, setLangState] = useState(languageService.getLanguage());

  useEffect(() => {
    const unsub = languageService.subscribe((l) => setLangState(l));
    return () => unsub();
  }, []);

  const t = languageService.t();

  return (
    <section id="family" className="relative py-24 px-4 bg-[#120508] overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-amber-400 mb-2">
            <Users className="w-4 h-4" />
            <span className="font-serif text-xs uppercase tracking-[0.25em] font-semibold">
              {t.family.title}
            </span>
            <Users className="w-4 h-4" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-amber-100 mb-3">
            {t.family.title}
          </h2>

          <p className="text-xs sm:text-sm text-amber-100/70 max-w-md mx-auto font-light leading-relaxed">
            {t.family.subtitle}
          </p>

          <KolamDivider className="my-6" />
        </div>

        {/* Family Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {familyMembers.map((fam) => (
            <div
              key={fam.id}
              className="p-8 rounded-3xl bg-gradient-to-b from-maroon-900/40 via-maroon-950/60 to-black/80 border border-amber-500/25 shadow-xl hover:border-amber-400/50 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-[11px] font-serif uppercase tracking-[0.2em] text-amber-400 font-bold block mb-2">
                  {fam.role}
                </span>

                <div className="space-y-1.5 mb-4">
                  {fam.names.map((name, i) => (
                    <h3 key={i} className="font-serif text-xl font-bold text-amber-100">
                      {name}
                    </h3>
                  ))}
                </div>

                {fam.description && (
                  <p className="text-xs text-amber-100/70 font-light leading-relaxed italic">
                    "{fam.description}"
                  </p>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-amber-500/15 flex items-center justify-between text-xs text-amber-400/80 font-serif">
                <span>{fam.side === 'bride' ? t.family.brideSide : t.family.groomSide}</span>
                <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400/30" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

