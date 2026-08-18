import React, { useState } from 'react';
import { WeddingConfig } from '../../types/wedding';
import { Heart, Sparkles, Image, Calendar, Clock, Link2, Globe } from 'lucide-react';
import { ImageManagerModal } from './ImageManagerModal';

interface CoupleEditorProps {
  config: WeddingConfig;
  onUpdate: (updater: (prev: WeddingConfig) => WeddingConfig) => void;
}

export const CoupleEditor: React.FC<CoupleEditorProps> = ({ config, onUpdate }) => {
  const { couple } = config;
  const [activeImageSlot, setActiveImageSlot] = useState<'heroImage' | 'couplePhoto' | null>(null);

  const handleChange = (field: keyof typeof couple, value: string) => {
    onUpdate((prev) => ({
      ...prev,
      couple: {
        ...prev.couple,
        [field]: value,
      },
    }));
  };

  const handleApplyImage = (url: string) => {
    if (activeImageSlot) {
      handleChange(activeImageSlot, url);
      setActiveImageSlot(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-serif font-bold text-amber-200 flex items-center gap-2">
          <Heart className="w-5 h-5 text-rose-400" />
          <span>Edit Couple & Wedding Details</span>
        </h2>
        <p className="text-xs text-amber-100/60 font-light mt-1">
          Update the Bride and Groom names, family lineage, wedding date, muhurtham time, and bilingual headings.
        </p>
      </div>

      {/* Bride & Groom Full & Short Names */}
      <div className="p-6 rounded-2xl bg-[#1c050a] border border-amber-500/25 space-y-4">
        <h3 className="text-sm font-serif font-bold text-amber-300">Couple Names & Origins</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-serif text-amber-200 mb-1">Bride Full Name (English)</label>
            <input
              type="text"
              value={couple.brideFullName}
              onChange={(e) => handleChange('brideFullName', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-serif text-amber-200 mb-1">Bride Name (தமிழ் / Tamil)</label>
            <input
              type="text"
              value={couple.tamilBrideName || ''}
              placeholder="அனன்யா"
              onChange={(e) => handleChange('tamilBrideName', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400 font-tamil"
            />
          </div>

          <div>
            <label className="block text-xs font-serif text-amber-200 mb-1">Groom Full Name (English)</label>
            <input
              type="text"
              value={couple.groomFullName}
              onChange={(e) => handleChange('groomFullName', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-serif text-amber-200 mb-1">Groom Name (தமிழ் / Tamil)</label>
            <input
              type="text"
              value={couple.tamilGroomName || ''}
              placeholder="அர்ஜுன்"
              onChange={(e) => handleChange('tamilGroomName', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400 font-tamil"
            />
          </div>

          <div>
            <label className="block text-xs font-serif text-amber-200 mb-1">Bride's Parents</label>
            <input
              type="text"
              value={couple.brideParents}
              onChange={(e) => handleChange('brideParents', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-serif text-amber-200 mb-1">Groom's Parents</label>
            <input
              type="text"
              value={couple.groomParents}
              onChange={(e) => handleChange('groomParents', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>
      </div>

      {/* Date & Muhurtham */}
      <div className="p-6 rounded-2xl bg-[#1c050a] border border-amber-500/25 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-serif font-bold text-amber-300 flex items-center gap-2">
            <span>📅</span>
            <span>Wedding Date & Auspicious Muhurtham</span>
          </h3>
          <span className="text-[10px] text-amber-400/70 font-mono">Timezone: {couple.timezone || 'Asia/Kolkata (IST)'}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Interactive Date & Time Picker */}
          <div className="sm:col-span-2 p-4 rounded-xl bg-black/60 border border-amber-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-serif font-bold text-amber-200">
                Pick Wedding Date & Time (தேதி & நேரம் தேர்வு)
              </label>
              <span className="text-[10px] text-amber-300/80 font-serif">📅 Calendar & Clock Picker</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
              <input
                type="datetime-local"
                value={
                  couple.weddingDate && couple.weddingDate.includes('T')
                    ? couple.weddingDate.substring(0, 16)
                    : '2026-12-12T07:30'
                }
                onChange={(e) => {
                  const val = e.target.value;
                  if (val) {
                    const isoWithOffset = `${val}:00+05:30`;
                    handleChange('weddingDate', isoWithOffset);
                  }
                }}
                className="w-full px-3.5 py-2.5 rounded-xl bg-amber-950/40 border border-amber-400/50 text-amber-100 text-sm font-serif focus:outline-none focus:border-amber-400 cursor-pointer shadow-inner [color-scheme:dark]"
              />

              {/* Formatted Date Confirmation Banner */}
              <div className="p-2.5 rounded-xl bg-gradient-to-r from-amber-500/15 via-maroon-900/30 to-amber-950/40 border border-amber-500/25 flex flex-col justify-center">
                <span className="text-[10px] text-amber-300 font-serif font-bold uppercase tracking-wider block">
                  Auspicious Day:
                </span>
                <span className="text-xs text-amber-100 font-serif font-medium">
                  {(() => {
                    try {
                      const d = new Date(couple.weddingDate);
                      if (isNaN(d.getTime())) return couple.weddingDate;
                      return d.toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                      });
                    } catch {
                      return couple.weddingDate;
                    }
                  })()}
                </span>
              </div>
            </div>

            {/* Raw ISO Format String & Copy / Manual Edit */}
            <div className="pt-1 flex items-center justify-between text-[11px] text-amber-100/60 font-mono">
              <span>ISO 8601 String: <span className="text-amber-300">{couple.weddingDate}</span></span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-serif text-amber-200 mb-1">Muhurtham Time Slot (English)</label>
            <input
              type="text"
              value={couple.muhurthamTime}
              placeholder="07:30 AM – 09:00 AM (Dhanur Lagnam)"
              onChange={(e) => handleChange('muhurthamTime', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-serif text-amber-200 mb-1">Muhurtham Time Slot (தமிழ்)</label>
            <input
              type="text"
              value={couple.tamilMuhurthamTime || ''}
              placeholder="காலை 07:30 – 09:00 மணி (தனுர் லக்னம்)"
              onChange={(e) => handleChange('tamilMuhurthamTime', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400 font-tamil"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-serif text-amber-200 mb-1">Monogram Display (Header Badge)</label>
            <input
              type="text"
              value={couple.monogram}
              placeholder="A ✦ A or A & A"
              onChange={(e) => handleChange('monogram', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400 font-serif"
            />
          </div>
        </div>
      </div>

      {/* Headings & Emotional Taglines */}
      <div className="p-6 rounded-2xl bg-[#1c050a] border border-amber-500/25 space-y-4">
        <h3 className="text-sm font-serif font-bold text-amber-300 flex items-center gap-2">
          <Globe className="w-4 h-4 text-amber-400" />
          <span>Bilingual Headings & Invocations</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-serif text-amber-200 mb-1">Hero Tagline (English)</label>
            <input
              type="text"
              value={couple.heroTagline}
              onChange={(e) => handleChange('heroTagline', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-serif text-amber-200 mb-1">Hero Tagline (தமிழ்)</label>
            <input
              type="text"
              value={couple.tamilTagline || ''}
              placeholder="இரு மனங்கள் இணையும் மங்களத் திருநாள்"
              onChange={(e) => handleChange('tamilTagline', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400 font-tamil"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-serif text-amber-200 mb-1">Hero Subtitle (English)</label>
            <textarea
              rows={2}
              value={couple.heroSubtitle}
              onChange={(e) => handleChange('heroSubtitle', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-serif text-amber-200 mb-1">Hero Subtitle (தமிழ்)</label>
            <textarea
              rows={2}
              value={couple.tamilSubtitle || ''}
              placeholder="எங்கள் இல்லத் திருமண நன்னாளுக்கு தங்களை அன்புடன் அழைக்கிறோம்"
              onChange={(e) => handleChange('tamilSubtitle', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400 resize-none font-tamil"
            />
          </div>
        </div>
      </div>

      {/* Couple Photos with Easy Google Drive & Upload button */}
      <div className="p-6 rounded-2xl bg-[#1c050a] border border-amber-500/25 space-y-4">
        <h3 className="text-sm font-serif font-bold text-amber-300">Couple Photographs (Google Drive / Upload)</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-black/40 border border-amber-500/20 space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-serif text-amber-200 font-bold">Bride Photo</label>
              <button
                onClick={() => setActiveImageSlot('heroImage')}
                className="px-2.5 py-1 rounded bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-[11px] text-amber-300 font-serif flex items-center space-x-1 transition-colors"
              >
                <Link2 className="w-3 h-3 text-amber-400" />
                <span>Google Drive / Upload</span>
              </button>
            </div>

            {couple.heroImage && (
              <div className="h-32 rounded-lg overflow-hidden border border-amber-500/20 bg-black">
                <img src={couple.heroImage} alt="Bride" className="w-full h-full object-cover" />
              </div>
            )}

            <input
              type="text"
              value={couple.heroImage || ''}
              onChange={(e) => handleChange('heroImage', e.target.value)}
              placeholder="Paste image link directly or use button above"
              className="w-full px-3 py-1.5 rounded-lg bg-black/50 border border-amber-500/30 text-amber-100 text-xs font-mono"
            />
          </div>

          <div className="p-4 rounded-xl bg-black/40 border border-amber-500/20 space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-serif text-amber-200 font-bold">Groom Photo</label>
              <button
                onClick={() => setActiveImageSlot('couplePhoto')}
                className="px-2.5 py-1 rounded bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-[11px] text-amber-300 font-serif flex items-center space-x-1 transition-colors"
              >
                <Link2 className="w-3 h-3 text-amber-400" />
                <span>Google Drive / Upload</span>
              </button>
            </div>

            {couple.couplePhoto && (
              <div className="h-32 rounded-lg overflow-hidden border border-amber-500/20 bg-black">
                <img src={couple.couplePhoto} alt="Groom" className="w-full h-full object-cover" />
              </div>
            )}

            <input
              type="text"
              value={couple.couplePhoto || ''}
              onChange={(e) => handleChange('couplePhoto', e.target.value)}
              placeholder="Paste image link directly or use button above"
              className="w-full px-3 py-1.5 rounded-lg bg-black/50 border border-amber-500/30 text-amber-100 text-xs font-mono"
            />
          </div>
        </div>
      </div>

      {/* Image Manager Modal */}
      {activeImageSlot && (
        <ImageManagerModal
          isOpen={true}
          onClose={() => setActiveImageSlot(null)}
          onSelectImage={handleApplyImage}
          currentImageUrl={activeImageSlot === 'heroImage' ? couple.heroImage : couple.couplePhoto}
          title={`Select Photo for ${activeImageSlot === 'heroImage' ? 'Bride' : 'Groom'}`}
        />
      )}
    </div>
  );
};
