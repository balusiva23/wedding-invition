import React from 'react';
import { WeddingConfig } from '../../types/wedding';
import { Layers, Eye, EyeOff, ArrowUp, ArrowDown } from 'lucide-react';

interface SectionOrderVisibilityEditorProps {
  config: WeddingConfig;
  onUpdate: (updater: (prev: WeddingConfig) => WeddingConfig) => void;
}

export const SectionOrderVisibilityEditor: React.FC<SectionOrderVisibilityEditorProps> = ({
  config,
  onUpdate,
}) => {
  const { sections, sectionOrder } = config;

  const sectionLabels: Record<string, string> = {
    hero: 'Hero 3D Lamp & Names',
    countdown: 'Live Muhurtham Countdown',
    couple: 'Couple Profiles & 3D Rings',
    story: 'Our Story Timeline',
    ceremonies: 'South Indian Ceremonies Guide',
    events: 'Wedding Events Schedule',
    family: 'Family Blessings',
    gallery: 'Photo Gallery',
    video: 'Pre-Wedding Film',
    venue: 'Venue & Map Location',
    travel: 'Guest Accommodations & Travel',
    dressCode: 'Attire & Dress Code',
    gift: 'Gift & Blessings Registry',
    rsvp: 'RSVP Form',
    wishes: 'Guest Blessings Wall',
    closing: 'Closing Section & Footer',
  };

  const handleToggle = (secKey: string) => {
    onUpdate((prev) => ({
      ...prev,
      sections: {
        ...prev.sections,
        [secKey]: !(prev.sections as any)[secKey],
      },
    }));
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= sectionOrder.length) return;

    const list = [...sectionOrder];
    const temp = list[index];
    list[index] = list[targetIdx];
    list[targetIdx] = temp;

    onUpdate((prev) => ({
      ...prev,
      sectionOrder: list,
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-serif font-bold text-amber-200 flex items-center gap-2">
          <Layers className="w-5 h-5 text-amber-400" />
          <span>Section Visibility & Reordering</span>
        </h2>
        <p className="text-xs text-amber-100/60 font-light mt-1">
          Enable/disable any section or rearrange the page flow of the public wedding invitation.
        </p>
      </div>

      <div className="space-y-2.5">
        {sectionOrder.map((secKey, idx) => {
          const isEnabled = (sections as any)[secKey] !== false;

          return (
            <div
              key={secKey}
              className={`p-4 rounded-2xl border flex items-center justify-between transition-all ${
                isEnabled
                  ? 'bg-[#1c050a] border-amber-500/25'
                  : 'bg-black/30 border-amber-500/10 opacity-60'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="w-6 h-6 rounded-full bg-black/50 border border-amber-500/30 flex items-center justify-center text-[10px] font-mono text-amber-400 font-bold">
                  {idx + 1}
                </span>
                <span className="font-serif text-xs font-bold text-amber-100">
                  {sectionLabels[secKey] || secKey}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleToggle(secKey)}
                  className={`p-1.5 rounded-lg border text-xs flex items-center space-x-1 ${
                    isEnabled
                      ? 'border-emerald-500/40 text-emerald-300'
                      : 'border-rose-500/40 text-rose-400'
                  }`}
                  title={isEnabled ? 'Visible on page' : 'Hidden from page'}
                >
                  {isEnabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>

                <button
                  disabled={idx === 0}
                  onClick={() => handleMove(idx, 'up')}
                  className="p-1.5 rounded-lg border border-amber-500/20 text-amber-300 hover:bg-amber-500/10 disabled:opacity-30"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>

                <button
                  disabled={idx === sectionOrder.length - 1}
                  onClick={() => handleMove(idx, 'down')}
                  className="p-1.5 rounded-lg border border-amber-500/20 text-amber-300 hover:bg-amber-500/10 disabled:opacity-30"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
