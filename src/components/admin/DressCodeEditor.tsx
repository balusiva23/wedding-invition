import React from 'react';
import { WeddingConfig } from '../../types/wedding';
import { Palette } from 'lucide-react';

interface DressCodeEditorProps {
  config: WeddingConfig;
  onUpdate: (updater: (prev: WeddingConfig) => WeddingConfig) => void;
}

export const DressCodeEditor: React.FC<DressCodeEditorProps> = ({ config, onUpdate }) => {
  const { dressCode } = config;

  const handleChange = (field: keyof typeof dressCode, value: any) => {
    onUpdate((prev) => ({
      ...prev,
      dressCode: {
        ...prev.dressCode,
        [field]: value,
      },
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-serif font-bold text-amber-200 flex items-center gap-2">
            <Palette className="w-5 h-5 text-amber-400" />
            <span>Wedding Attire & Dress Code</span>
          </h2>
          <p className="text-xs text-amber-100/60 font-light mt-1">
            Guide guests on traditional South Indian wedding attire and auspicious colors.
          </p>
        </div>

        <label className="flex items-center space-x-2 text-xs font-serif text-amber-300 cursor-pointer">
          <input
            type="checkbox"
            checked={dressCode.enabled}
            onChange={(e) => handleChange('enabled', e.target.checked)}
            className="w-4 h-4 accent-amber-500 rounded"
          />
          <span>Enable Section</span>
        </label>
      </div>

      <div className="p-6 rounded-2xl bg-[#1c050a] border border-amber-500/25 space-y-4">
        <div>
          <label className="block text-xs font-serif text-amber-200 mb-1">Section Title</label>
          <input
            type="text"
            value={dressCode.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400"
          />
        </div>

        <div>
          <label className="block text-xs font-serif text-amber-200 mb-1">General Description</label>
          <textarea
            rows={2}
            value={dressCode.description}
            onChange={(e) => handleChange('description', e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400 resize-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-serif text-amber-200 mb-1">👗 Ladies Guidelines</label>
            <textarea
              rows={3}
              value={dressCode.ladies}
              onChange={(e) => handleChange('ladies', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-serif text-amber-200 mb-1">👔 Gentlemen Guidelines</label>
            <textarea
              rows={3}
              value={dressCode.gentlemen}
              onChange={(e) => handleChange('gentlemen', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400 resize-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-serif text-amber-200 mb-1">
            Palette Hex Colors (comma separated)
          </label>
          <input
            type="text"
            value={dressCode.colorsToEmbrace.join(', ')}
            onChange={(e) =>
              handleChange(
                'colorsToEmbrace',
                e.target.value.split(',').map((c) => c.trim()).filter(Boolean)
              )
            }
            className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400 font-mono"
          />
        </div>
      </div>
    </div>
  );
};
