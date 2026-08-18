import React, { useState, useEffect } from 'react';
import { WeddingConfig } from '../../types/wedding';
import { KolamDivider } from '../common/KolamDivider';
import { Gift, QrCode, Copy, Check, HeartHandshake } from 'lucide-react';
import { shareService } from '../../services/shareService';
import { languageService } from '../../services/languageService';

export const GiftSection: React.FC<{ gift: WeddingConfig['gift'] }> = ({ gift }) => {
  const [copiedUPI, setCopiedUPI] = useState(false);
  const [, setLangState] = useState(languageService.getLanguage());

  useEffect(() => {
    const unsub = languageService.subscribe((l) => setLangState(l));
    return () => unsub();
  }, []);

  const t = languageService.t();

  if (!gift.enabled) return null;

  const handleCopyUPI = async () => {
    const success = await shareService.copyToClipboard(gift.upiId);
    if (success) {
      setCopiedUPI(true);
      setTimeout(() => setCopiedUPI(false), 2000);
    }
  };

  return (
    <section id="gift" className="relative py-20 px-4 bg-[#120508] overflow-hidden">
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center space-x-2 text-amber-400 mb-2">
          <Gift className="w-4 h-4" />
          <span className="font-serif text-xs uppercase tracking-[0.25em] font-semibold">
            {t.gift.title}
          </span>
          <Gift className="w-4 h-4" />
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-amber-100 mb-3">
          {t.gift.title}
        </h2>

        <p className="text-xs sm:text-sm text-amber-100/70 max-w-md mx-auto font-light leading-relaxed mb-8">
          {t.gift.subtitle}
        </p>

        {/* Gift Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-maroon-900/40 via-maroon-950/70 to-black/80 border border-amber-500/25 shadow-2xl text-left max-w-xl mx-auto">
          <div className="space-y-4 text-xs sm:text-sm text-amber-100/90 font-light">
            {/* UPI Option */}
            {gift.upiId && (
              <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/20 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-serif uppercase tracking-wider text-amber-300 block">
                    {t.gift.scanToBless}
                  </span>
                  <span className="font-mono text-xs sm:text-sm text-amber-100 font-semibold">
                    {gift.upiId}
                  </span>
                  <span className="text-[11px] text-amber-200/60 block">{gift.upiName}</span>
                </div>

                <button
                  onClick={handleCopyUPI}
                  className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 text-xs font-serif flex items-center space-x-1 border border-amber-400/30 transition-all"
                >
                  {copiedUPI ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedUPI ? t.gift.copied : t.gift.copyUPI}</span>
                </button>
              </div>
            )}

            {/* Bank Transfer Details */}
            {gift.accountNumber && (
              <div className="p-4 rounded-2xl bg-black/30 border border-amber-500/15 space-y-1 text-xs">
                <div className="font-serif text-amber-300 font-semibold mb-1">
                  {t.gift.bankDetails}:
                </div>
                <div>{t.gift.accountNumber}: <strong className="text-amber-200 font-mono">{gift.accountNumber}</strong></div>
                <div>{t.gift.bank}: <strong className="text-amber-200">{gift.bankName}</strong> ({t.gift.ifsc}: <span className="font-mono">{gift.ifsc}</span>)</div>
              </div>
            )}

            {gift.note && (
              <p className="text-[11px] text-amber-300/80 italic text-center pt-2">
                "{gift.note}"
              </p>
            )}
          </div>
        </div>

        <KolamDivider className="mt-12" />
      </div>
    </section>
  );
};

