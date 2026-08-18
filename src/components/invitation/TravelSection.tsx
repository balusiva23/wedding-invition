import React, { useState, useEffect } from 'react';
import { AccommodationInfo } from '../../types/wedding';
import { KolamDivider } from '../common/KolamDivider';
import { Hotel, Plane, Train, Car, ExternalLink, MapPin } from 'lucide-react';
import { languageService } from '../../services/languageService';

export const TravelSection: React.FC<{ accommodations: AccommodationInfo[] }> = ({
  accommodations,
}) => {
  const activeItems = accommodations.filter((a) => a.enabled);
  const [, setLangState] = useState(languageService.getLanguage());

  useEffect(() => {
    const unsub = languageService.subscribe((l) => setLangState(l));
    return () => unsub();
  }, []);

  const t = languageService.t();

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Hotel':
        return <Hotel className="w-5 h-5 text-amber-400" />;
      case 'Airport':
        return <Plane className="w-5 h-5 text-amber-400" />;
      case 'Railway':
        return <Train className="w-5 h-5 text-amber-400" />;
      default:
        return <Car className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <section id="travel" className="relative py-24 px-4 bg-[#120508] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-amber-400 mb-2">
            <Hotel className="w-4 h-4" />
            <span className="font-serif text-xs uppercase tracking-[0.25em] font-semibold">
              {t.travel.title}
            </span>
            <Hotel className="w-4 h-4" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-amber-100 mb-3">
            {t.travel.title}
          </h2>

          <p className="text-xs sm:text-sm text-amber-100/70 max-w-md mx-auto font-light leading-relaxed">
            {t.travel.subtitle}
          </p>

          <KolamDivider className="my-6" />
        </div>

        {/* Accommodations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeItems.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-3xl bg-gradient-to-b from-maroon-900/40 to-maroon-950/70 border border-amber-500/25 shadow-xl hover:border-amber-400/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-950/60 border border-amber-400/30 flex items-center justify-center">
                    {getCategoryIcon(item.category)}
                  </div>
                  <span className="text-[11px] font-serif uppercase tracking-wider text-amber-300 bg-amber-900/30 px-3 py-1 rounded-full border border-amber-500/20">
                    {item.distance}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-amber-100 mb-2">
                  {item.name}
                </h3>

                <div className="flex items-start space-x-2 text-xs text-amber-300/80 mb-3">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>{item.address}</span>
                </div>

                <p className="text-xs text-amber-100/70 font-light leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-amber-500/15 flex items-center justify-between text-xs">
                {item.bookingUrl && (
                  <a
                    href={item.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-300 hover:text-amber-200 font-serif font-medium flex items-center gap-1.5"
                  >
                    <span>{t.travel.bookStay}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}

                {item.phone && (
                  <span className="text-amber-100/70">
                    Contact: <strong className="text-amber-200">{item.phone}</strong>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

