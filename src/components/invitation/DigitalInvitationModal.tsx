import React, { useState, useEffect, useRef } from 'react';
import { WeddingConfig } from '../../types/wedding';
import { KolamDivider } from '../common/KolamDivider';
import { X, Printer, Globe, Sparkles } from 'lucide-react';
import { languageService } from '../../services/languageService';
import { Language } from '../../data/translations';

interface DigitalInvitationModalProps {
  config: WeddingConfig;
  onClose: () => void;
}

export const DigitalInvitationModal: React.FC<DigitalInvitationModalProps> = ({
  config,
  onClose,
}) => {
  const { couple, venue } = config;
  const [lang, setLang] = useState<Language>(languageService.getLanguage());
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsub = languageService.subscribe((l) => setLang(l));
    return () => unsub();
  }, []);

  const isTamil = lang === 'ta';

  // Robust isolated iframe printing mechanism
  const handlePrint = () => {
    if (!cardRef.current) {
      window.print();
      return;
    }

    const printContent = cardRef.current.innerHTML;
    const printFrame = document.createElement('iframe');
    printFrame.style.position = 'fixed';
    printFrame.style.right = '0';
    printFrame.style.bottom = '0';
    printFrame.style.width = '0';
    printFrame.style.height = '0';
    printFrame.style.border = '0';
    document.body.appendChild(printFrame);

    const doc = printFrame.contentWindow?.document;
    if (!doc) {
      window.print();
      return;
    }

    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html lang="${isTamil ? 'ta' : 'en'}">
      <head>
        <title>${isTamil ? 'கல்யாண பத்திரிகை - அனன்யா & அர்ஜுன்' : 'Wedding Invitation - Ananya & Arjun'}</title>
        <meta charset="utf-8">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Anek+Tamil:wght@400;600;700;800&family=Cinzel:wght@500;700;900&family=Mukta+Malar:wght@400;600;700&family=Playfair+Display:ital,wght@0,500;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap" rel="stylesheet">
        <style>
          @page {
            size: A4 portrait;
            margin: 10mm;
          }
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          body {
            font-family: ${isTamil ? "'Anek Tamil', 'Mukta Malar', sans-serif" : "'Playfair Display', 'Cinzel', serif"};
            background-color: #FFFDF7;
            color: #4A0E17;
            padding: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .patrikai-container {
            width: 100%;
            max-width: 680px;
            margin: 0 auto;
            padding: 36px 30px;
            background: #FFFDF7;
            border: 4px double #8B1E2D;
            border-radius: 20px;
            text-align: center;
            position: relative;
          }
          .inner-border {
            border: 1.5px solid #C59A27;
            border-radius: 14px;
            padding: 24px 20px;
          }
          .invocation {
            font-size: 14px;
            font-weight: 700;
            color: #8B1E2D;
            letter-spacing: 0.15em;
            margin-bottom: 8px;
          }
          .title {
            font-size: 20px;
            font-weight: 800;
            color: #982536;
            letter-spacing: 0.1em;
            margin-bottom: 16px;
            text-transform: uppercase;
          }
          .intro-text {
            font-size: 13px;
            line-height: 1.7;
            color: #5A1E26;
            margin-bottom: 22px;
          }
          .couple-section {
            margin: 20px 0;
          }
          .name {
            font-size: 28px;
            font-weight: 800;
            color: #7B1113;
            letter-spacing: 0.05em;
          }
          .parent-info {
            font-size: 12px;
            color: #8B4513;
            margin-top: 4px;
          }
          .with-text {
            font-size: 16px;
            font-weight: 700;
            color: #C59A27;
            margin: 10px 0;
          }
          .muhurtham-box {
            background-color: #FFF6E5;
            border: 1px solid #E6CA65;
            border-radius: 12px;
            padding: 14px;
            margin: 22px 0;
          }
          .muhurtham-heading {
            font-size: 13px;
            font-weight: 700;
            color: #8B1E2D;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            margin-bottom: 4px;
          }
          .muhurtham-date {
            font-size: 16px;
            font-weight: 800;
            color: #4A0E17;
          }
          .muhurtham-time {
            font-size: 13px;
            font-weight: 600;
            color: #7A3E1D;
            margin-top: 3px;
          }
          .venue-section {
            margin: 18px 0;
            font-size: 13px;
            line-height: 1.6;
            color: #4A0E17;
          }
          .venue-name {
            font-size: 18px;
            font-weight: 800;
            color: #7B1113;
          }
          .blessing-footer {
            margin-top: 20px;
            font-size: 12px;
            font-style: italic;
            color: #8B1E2D;
            line-height: 1.6;
          }
          .welcoming-family {
            margin-top: 14px;
            font-size: 12px;
            font-weight: 700;
            color: #4A0E17;
          }
          .kolam-dec {
            margin: 14px auto;
            width: 80px;
            height: 2px;
            background: linear-gradient(to right, transparent, #C59A27, transparent);
          }
        </style>
      </head>
      <body>
        <div class="patrikai-container">
          ${printContent}
        </div>
      </body>
      </html>
    `);
    doc.close();

    setTimeout(() => {
      printFrame.contentWindow?.focus();
      printFrame.contentWindow?.print();
      setTimeout(() => {
        document.body.removeChild(printFrame);
      }, 2000);
    }, 400);
  };

  const brideDisplayName = isTamil && couple.tamilBrideName ? couple.tamilBrideName : couple.brideFullName;
  const groomDisplayName = isTamil && couple.tamilGroomName ? couple.tamilGroomName : couple.groomFullName;
  const venueDisplayName = isTamil && venue.tamilName ? venue.tamilName : venue.name;
  const hallDisplayName = isTamil && venue.tamilHall ? venue.tamilHall : venue.hall;
  const muhurthamTimeDisplay = isTamil && couple.tamilMuhurthamTime ? couple.tamilMuhurthamTime : couple.muhurthamTime;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn select-none">
      <div className="relative w-full max-w-2xl my-8 rounded-3xl bg-gradient-to-b from-[#FFFDF7] to-[#FBF6E9] text-maroon-950 p-6 sm:p-10 shadow-2xl border-4 border-double border-amber-600/70 text-center">
        {/* Top Controls: Close + Language Switcher inside Modal */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <button
            onClick={() => {
              const next = languageService.toggleLanguage();
              setLang(next);
            }}
            className="flex items-center space-x-1.5 px-3 py-1 rounded-full border border-amber-600/40 bg-amber-100 hover:bg-amber-200 text-maroon-900 text-xs font-serif font-bold shadow transition-all"
            title="Switch Patrikai Language"
          >
            <Globe className="w-3.5 h-3.5 text-amber-700" />
            <span>{isTamil ? 'English' : 'தமிழ்'}</span>
          </button>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-maroon-900/70 hover:text-maroon-950 hover:bg-amber-500/20 transition-colors"
            title="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Printable Card Area */}
        <div ref={cardRef} className="print-patrikai-card">
          <div className="inner-border border-2 border-amber-600/40 p-6 sm:p-8 rounded-2xl relative bg-[#FFFDF7]/60">
            {/* Auspicious Invocations */}
            <div className="text-amber-800 font-serif text-xs sm:text-sm uppercase tracking-[0.25em] font-bold mb-2">
              {isTamil ? '॥ ஸ்ரீ கணேசாய நமஹ ॥ ஸ்ரீ மீனாட்சி சுந்தரேஸ்வரர் துணை ॥' : '॥ श्री महागणपतये नमः ॥ शुभ विवाह ॥'}
            </div>

            <div className="text-amber-700 font-serif text-base sm:text-lg font-bold italic mb-4 tracking-wider">
              {isTamil ? 'சுபமஸ்து ✦ கல்யாண பத்திரிகை' : 'Subhamasthu ✦ Kalyana Patrikai'}
            </div>

            <p className="text-xs sm:text-sm text-maroon-900/90 font-serif leading-relaxed max-w-lg mx-auto mb-6">
              {isTamil
                ? 'எல்லாம் வல்ல இறைவனின் திருவருளாலும், பெரியோர்களின் நல்லாசியோடும் நடைபெறும் எங்களது இல்லத் திருமண நல்விழாவிற்கு தாங்கள் குடும்ப சமேதராக வருகை தந்து மணமக்களை வாழ்த்தி அருள அன்போடு அழைக்கிறோம்.'
                : 'With the divine grace of the Almighty and the heartfelt blessings of our revered elders, we cordially solicit your esteemed presence with family on the auspicious occasion of the Vedic wedding ceremony of'}
            </p>

            {/* Bride & Groom Block */}
            <div className="my-6 space-y-3">
              <div>
                <span className="text-[11px] font-serif uppercase tracking-widest text-amber-800 font-semibold block">
                  {isTamil ? 'மணமகள்' : 'The Bride'}
                </span>
                <h2 className="font-display text-2xl sm:text-4xl font-bold text-maroon-900 tracking-wide mt-0.5">
                  {brideDisplayName}
                </h2>
                <p className="text-xs sm:text-sm text-amber-900/90 font-serif mt-1">
                  {isTamil ? `சுந்தரம் & லட்சுமி அவர்களின் அன்புத் திருப்புதல்வி` : `Daughter of ${couple.brideParents}`}
                </p>
              </div>

              <div className="my-2 text-lg sm:text-xl font-display font-bold text-amber-600">
                {isTamil ? 'இணை சேரும் மணமகன்' : 'with'}
              </div>

              <div>
                <span className="text-[11px] font-serif uppercase tracking-widest text-amber-800 font-semibold block">
                  {isTamil ? 'மணமகன்' : 'The Groom'}
                </span>
                <h2 className="font-display text-2xl sm:text-4xl font-bold text-maroon-900 tracking-wide mt-0.5">
                  {groomDisplayName}
                </h2>
                <p className="text-xs sm:text-sm text-amber-900/90 font-serif mt-1">
                  {isTamil ? `நடராஜன் & சாவித்ரி அவர்களின் அன்புத் திருக்குமாரன்` : `Son of ${couple.groomParents}`}
                </p>
              </div>
            </div>

            <KolamDivider light className="my-4" />

            {/* Muhurtham Details Box */}
            <div className="bg-[#FFF6E5] border-2 border-amber-300/80 rounded-2xl p-4 sm:p-5 my-6 text-xs sm:text-sm font-serif shadow-sm">
              <div className="font-bold text-maroon-900 uppercase tracking-widest text-xs mb-1">
                {isTamil ? 'சுப முகூர்த்தம்' : 'Auspicious Muhurtham'}
              </div>
              <div className="text-maroon-950 font-bold text-sm sm:text-lg">
                {isTamil ? '2026 டிசம்பர் 12, சனிக்கிழமை' : 'Saturday, December 12, 2026'}
              </div>
              <div className="text-amber-900 font-semibold mt-1 text-xs sm:text-sm">
                {muhurthamTimeDisplay}
              </div>
            </div>

            {/* Venue */}
            <div className="text-xs sm:text-sm font-serif text-maroon-900/90 leading-relaxed mb-6">
              <strong className="block text-maroon-950 font-bold text-base sm:text-lg">
                {venueDisplayName}
              </strong>
              <span className="text-amber-900 font-medium block">{hallDisplayName}</span>
              <span className="text-maroon-800">{venue.address}, {venue.city}, Tamil Nadu</span>
            </div>

            {/* Closing Blessing */}
            <p className="text-xs sm:text-sm text-amber-800 italic font-serif leading-relaxed">
              {isTamil
                ? '"தங்கள் வருகையே எங்களின் பெரும் பாக்கியம், தங்களின் பொற்பாதங்கள் பதித்து புதுமணத் தம்பதிகளை வாழ்த்தி அருள அன்போடு வேண்டுகிறோம்."'
                : '"Your auspicious presence and prayers are the greatest blessing for our new beginning."'}
            </p>

            <div className="mt-4 pt-3 border-t border-amber-600/30 text-xs font-serif font-bold text-maroon-950">
              {isTamil ? 'தங்களின் நல்வரவை நாடும்: சுந்தரம் & நடராஜன் குடும்பத்தினர்' : 'Warmly Welcomed by: Sundaram & Natarajan Families'}
            </div>
          </div>
        </div>

        {/* Action Row */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={handlePrint}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-maroon-900 to-maroon-950 hover:from-maroon-800 hover:to-maroon-900 text-amber-100 font-serif font-bold text-xs uppercase tracking-wider shadow-lg flex items-center space-x-2 transition-transform active:scale-95 cursor-pointer"
          >
            <Printer className="w-4 h-4 text-amber-300" />
            <span>{isTamil ? 'பத்திரிகை அச்சிடுக (Print Patrikai)' : 'Print Patrikai'}</span>
          </button>

          <button
            onClick={onClose}
            className="px-6 py-3 rounded-full border border-maroon-900/30 text-maroon-950 font-serif font-semibold text-xs uppercase tracking-wider hover:bg-amber-100 transition-colors"
          >
            {isTamil ? 'மூடுக (Close)' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};

