import React, { useState, useEffect } from 'react';
import { WeddingConfig } from '../../types/wedding';
import { shareService } from '../../services/shareService';
import { languageService } from '../../services/languageService';
import { X, Share2, Copy, Check, QrCode, MessageCircle } from 'lucide-react';

interface ShareModalProps {
  config: WeddingConfig;
  onClose: () => void;
  onOpenQR: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ config, onClose, onOpenQR }) => {
  const [copied, setCopied] = useState(false);
  const { social } = config;
  const [, setLangState] = useState(languageService.getLanguage());

  useEffect(() => {
    const unsub = languageService.subscribe((l) => setLangState(l));
    return () => unsub();
  }, []);

  const isTamil = languageService.getLanguage() === 'ta';
  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://ananya-arjun-wedding.com';

  const handleCopy = async () => {
    const success = await shareService.copyToClipboard(currentUrl);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleWhatsApp = () => {
    const msg = isTamil
      ? `🪔 சுப விவாக அழைப்பிதழ்! அனன்யா & அர்ஜுன் திருமண நல்விழாவிற்கு தாங்கள் குடும்ப சமேதராக வருகை தந்து வாழ்த்துமாறு அன்போடு அழைக்கிறோம்: ${currentUrl}`
      : social.whatsappMessageTemplate;
    const shareUrl = shareService.getWhatsAppShareUrl(msg, currentUrl);
    window.open(shareUrl, '_blank');
  };

  const handleNativeShare = async () => {
    await shareService.shareNative({
      title: isTamil ? 'அனன்யா & அர்ஜுன் திருமண அழைப்பிதழ்' : social.shareTitle,
      text: isTamil ? 'எங்களது இல்ல திருமண நல்விழா அழைப்பிதழ்' : social.shareDescription,
      url: currentUrl,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative w-full max-w-md rounded-3xl bg-gradient-to-b from-[#2D060C] to-[#120508] border border-amber-400/50 p-6 sm:p-8 shadow-2xl text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-amber-400/80 hover:text-amber-200 hover:bg-amber-950/60"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-amber-950/60 border border-amber-400/40 flex items-center justify-center mx-auto mb-4 text-amber-300">
          <Share2 className="w-6 h-6" />
        </div>

        <h3 className="font-serif text-2xl font-bold text-amber-100 mb-1">
          {isTamil ? 'அழைப்பிதழைப் பகிர்க' : 'Share Our Wedding'}
        </h3>

        <p className="text-xs text-amber-100/70 font-light mb-6">
          {isTamil ? 'உறவினர்கள் மற்றும் நண்பர்களுக்கு திருமண அழைப்பிதழை அனுப்பவும்.' : 'Invite friends, family, and loved ones to our auspicious celebration.'}
        </p>

        <div className="space-y-3">
          {/* WhatsApp Direct Share */}
          <button
            onClick={handleWhatsApp}
            className="w-full py-3.5 px-4 rounded-2xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-serif font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>{isTamil ? 'WhatsApp-ல் பகிர்க' : 'Share via WhatsApp'}</span>
          </button>

          {/* Copy Link Button */}
          <button
            onClick={handleCopy}
            className="w-full py-3 px-4 rounded-2xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/30 text-amber-200 font-serif text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-amber-400" />}
            <span>{copied ? (isTamil ? 'இணைப்பு நகலெடுக்கப்பட்டது!' : 'Link Copied!') : (isTamil ? 'இணையதள இணைப்பை நகலெடு' : 'Copy Website Link')}</span>
          </button>

          {/* QR Code Trigger */}
          <button
            onClick={() => {
              onClose();
              onOpenQR();
            }}
            className="w-full py-3 px-4 rounded-2xl bg-black/40 hover:bg-black/60 border border-amber-500/20 text-amber-300/80 font-serif text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all"
          >
            <QrCode className="w-4 h-4 text-amber-400" />
            <span>{isTamil ? 'QR குறியீட்டைப் பார்க்க' : 'Show Invitation QR Code'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
