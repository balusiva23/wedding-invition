import React, { useState, useEffect } from 'react';
import { WeddingConfig } from '../../types/wedding';
import { KolamDivider } from '../common/KolamDivider';
import { MapPin, Navigation, Copy, Check, Phone, Car, Sparkles } from 'lucide-react';
import { shareService } from '../../services/shareService';
import { languageService } from '../../services/languageService';
import { Language } from '../../data/translations';

export const VenueSection: React.FC<{ venue: WeddingConfig['venue'] }> = ({ venue }) => {
  const [copied, setCopied] = useState(false);
  const [lang, setLang] = useState<Language>(languageService.getLanguage());

  useEffect(() => {
    const unsub = languageService.subscribe((l) => setLang(l));
    return () => unsub();
  }, []);

  const t = languageService.t();

  const venueName = lang === 'ta' && venue.tamilName ? venue.tamilName : venue.name;
  const hallName = lang === 'ta' && venue.tamilHall ? venue.tamilHall : venue.hall;

  const handleCopyAddress = async () => {
    const fullText = `${venueName}, ${hallName}, ${venue.address}, ${venue.city}, ${venue.state} - ${venue.postalCode}`;
    const success = await shareService.copyToClipboard(fullText);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section id="venue" className="relative py-24 px-4 bg-[#180509] overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-amber-400 mb-2">
            <Sparkles className="w-4 h-4" />
            <span className="font-serif text-xs uppercase tracking-[0.25em] font-semibold">
              {t.venue.title}
            </span>
            <Sparkles className="w-4 h-4" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-amber-100 mb-3">
            {t.venue.title}
          </h2>

          <p className="text-xs sm:text-sm text-amber-100/70 font-light max-w-md mx-auto leading-relaxed">
            {t.venue.subtitle}
          </p>

          <KolamDivider className="my-6" />
        </div>

        {/* Venue Card */}
        <div className="rounded-3xl bg-gradient-to-b from-maroon-900/40 via-maroon-950/70 to-black/80 border border-amber-500/25 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Venue Image */}
          <div className="lg:col-span-6 relative h-72 lg:h-auto min-h-[300px]">
            <img
              src={venue.image}
              alt={venue.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-maroon-950 via-transparent to-transparent opacity-80" />
            <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-amber-500/90 text-maroon-950 font-serif font-bold text-xs uppercase tracking-wider shadow">
              {t.venue.mandapamDetails}
            </div>
          </div>

          {/* Venue Details */}
          <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between">
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-amber-100 mb-2">
                {venueName}
              </h3>

              <p className="text-xs sm:text-sm text-amber-300 font-serif mb-4">
                {hallName}
              </p>

              <div className="space-y-3 text-xs sm:text-sm text-amber-100/80 mb-6 font-light">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    {venue.address}, {venue.city}, {venue.state} - {venue.postalCode}
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <Car className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{venue.parkingInfo}</span>
                </div>

                {venue.phone && (
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{t.venue.callVenue}: {venue.phone}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6 border-t border-amber-500/20 flex flex-wrap gap-3">
              <a
                href={venue.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-5 py-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-maroon-950 font-serif font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 flex items-center justify-center space-x-2 transition-all active:scale-95"
              >
                <Navigation className="w-4 h-4" />
                <span>{t.venue.openGoogleMaps}</span>
              </a>

              <button
                onClick={handleCopyAddress}
                className="px-5 py-3 rounded-full border border-amber-400/40 hover:bg-amber-500/10 text-amber-200 font-serif text-xs uppercase tracking-wider flex items-center space-x-1.5 transition-all active:scale-95"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? t.gift.copied : 'Copy Address'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
