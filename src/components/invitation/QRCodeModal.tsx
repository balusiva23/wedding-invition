import React, { useState, useEffect } from 'react';
import { shareService } from '../../services/shareService';
import { languageService } from '../../services/languageService';
import { X, Download, QrCode, Sparkles } from 'lucide-react';

interface QRCodeModalProps {
  monogram: string;
  onClose: () => void;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({ monogram, onClose }) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const isTamil = languageService.getLanguage() === 'ta';

  useEffect(() => {
    const url = typeof window !== 'undefined' ? window.location.href : 'https://ananya-arjun-wedding.com';
    shareService.generateQRCodeDataUrl(url).then(setQrDataUrl);
  }, []);

  const handleDownload = () => {
    if (!qrDataUrl) return;
    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = 'Ananya_Arjun_Wedding_QR.png';
    link.click();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative w-full max-w-sm rounded-3xl bg-gradient-to-b from-[#2D060C] to-[#120508] border border-amber-400/50 p-6 sm:p-8 shadow-2xl text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-amber-400/80 hover:text-amber-200"
        >
          <X className="w-5 h-5" />
        </button>

        <span className="font-serif text-xs uppercase tracking-widest text-amber-300 block mb-1">
          {monogram}
        </span>
        <h3 className="font-serif text-xl font-bold text-amber-100 mb-4">
          {isTamil ? 'திருமண அழைப்பிதழ் QR' : 'Wedding Invitation QR'}
        </h3>

        {/* QR Code Container */}
        <div className="p-4 rounded-2xl bg-[#FFFDF7] border-2 border-amber-500/40 shadow-inner inline-block mb-4">
          {qrDataUrl ? (
            <img
              src={qrDataUrl}
              alt="Wedding QR Code"
              className="w-56 h-56 object-contain"
            />
          ) : (
            <div className="w-56 h-56 flex items-center justify-center text-amber-900 text-xs">
              {isTamil ? 'QR உருவாக்கப்படுகிறது...' : 'Generating QR...'}
            </div>
          )}
        </div>

        <p className="text-[11px] text-amber-200/70 font-light mb-6">
          {isTamil
            ? 'மொபைல் கேமரா மூலம் ஸ்கேன் செய்து இணையதள திருமண அழைப்பிதழை உடனடியாகப் பார்க்கலாம்.'
            : 'Scan with any mobile camera to open our interactive wedding invitation. Perfect for printed cards!'}
        </p>

        <button
          onClick={handleDownload}
          disabled={!qrDataUrl}
          className="w-full py-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-maroon-950 font-serif font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center space-x-2 transition-all active:scale-95 disabled:opacity-50"
        >
          <Download className="w-4 h-4" />
          <span>{isTamil ? 'QR குறியீட்டைப் பதிவிறக்குக' : 'Download QR Image'}</span>
        </button>
      </div>
    </div>
  );
};
