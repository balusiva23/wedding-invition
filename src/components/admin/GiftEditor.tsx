import React from 'react';
import { WeddingConfig } from '../../types/wedding';
import { Gift } from 'lucide-react';

interface GiftEditorProps {
  config: WeddingConfig;
  onUpdate: (updater: (prev: WeddingConfig) => WeddingConfig) => void;
}

export const GiftEditor: React.FC<GiftEditorProps> = ({ config, onUpdate }) => {
  const { gift } = config;

  const handleChange = (field: keyof typeof gift, value: any) => {
    onUpdate((prev) => ({
      ...prev,
      gift: {
        ...prev.gift,
        [field]: value,
      },
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-serif font-bold text-amber-200 flex items-center gap-2">
            <Gift className="w-5 h-5 text-amber-400" />
            <span>Gift & Blessings Information</span>
          </h2>
          <p className="text-xs text-amber-100/60 font-light mt-1">
            Configure the optional gift registry, UPI ID, or philanthropic fund message.
          </p>
        </div>

        <label className="flex items-center space-x-2 text-xs font-serif text-amber-300 cursor-pointer">
          <input
            type="checkbox"
            checked={gift.enabled}
            onChange={(e) => handleChange('enabled', e.target.checked)}
            className="w-4 h-4 accent-amber-500 rounded"
          />
          <span>Enable Section</span>
        </label>
      </div>

      <div className="p-6 rounded-2xl bg-[#1c050a] border border-amber-500/25 space-y-4">
        <div>
          <label className="block text-xs font-serif text-amber-200 mb-1">Title</label>
          <input
            type="text"
            value={gift.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400"
          />
        </div>

        <div>
          <label className="block text-xs font-serif text-amber-200 mb-1">Description</label>
          <textarea
            rows={2}
            value={gift.description}
            onChange={(e) => handleChange('description', e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400 resize-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-serif text-amber-200 mb-1">UPI ID (e.g. name@okhdfc)</label>
            <input
              type="text"
              value={gift.upiId}
              onChange={(e) => handleChange('upiId', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-serif text-amber-200 mb-1">UPI Name Display</label>
            <input
              type="text"
              value={gift.upiName}
              onChange={(e) => handleChange('upiName', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-serif text-amber-200 mb-1">Bank Name</label>
            <input
              type="text"
              value={gift.bankName}
              onChange={(e) => handleChange('bankName', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-serif text-amber-200 mb-1">Account Number</label>
            <input
              type="text"
              value={gift.accountNumber}
              onChange={(e) => handleChange('accountNumber', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-serif text-amber-200 mb-1">IFSC Code</label>
            <input
              type="text"
              value={gift.ifsc}
              onChange={(e) => handleChange('ifsc', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400 font-mono"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-serif text-amber-200 mb-1">Philanthropic / Gratitude Note</label>
          <input
            type="text"
            value={gift.note}
            onChange={(e) => handleChange('note', e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>
    </div>
  );
};
