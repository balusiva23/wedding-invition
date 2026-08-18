import React from 'react';
import { WeddingConfig, CulturalCeremony } from '../../types/wedding';
import { Sliders, Plus, Trash2, ArrowUp, ArrowDown, Eye, EyeOff } from 'lucide-react';

interface CeremonyEditorProps {
  config: WeddingConfig;
  onUpdate: (updater: (prev: WeddingConfig) => WeddingConfig) => void;
}

export const CeremonyEditor: React.FC<CeremonyEditorProps> = ({ config, onUpdate }) => {
  const { ceremonies } = config;

  const handleAddCeremony = () => {
    const newC: CulturalCeremony = {
      id: 'c-' + Date.now(),
      name: 'Custom Ceremony',
      tamilName: 'சடங்கு',
      meaning: 'Cultural significance of ritual',
      description: 'Describe the Vedic ceremony and actions...',
      auspiciousSignificance: 'Sacred blessings and vows...',
      timeSlot: '09:00 AM',
      icon: 'sparkles',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop',
      order: ceremonies.length + 1,
      enabled: true,
    };
    onUpdate((prev) => ({
      ...prev,
      ceremonies: [...prev.ceremonies, newC],
    }));
  };

  const handleUpdate = (id: string, field: keyof CulturalCeremony, value: any) => {
    onUpdate((prev) => ({
      ...prev,
      ceremonies: prev.ceremonies.map((c) => (c.id === id ? { ...c, [field]: value } : c)),
    }));
  };

  const handleDelete = (id: string) => {
    onUpdate((prev) => ({
      ...prev,
      ceremonies: prev.ceremonies.filter((c) => c.id !== id),
    }));
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= ceremonies.length) return;

    const list = [...ceremonies];
    const temp = list[index];
    list[index] = list[targetIdx];
    list[targetIdx] = temp;
    list.forEach((item, idx) => {
      item.order = idx + 1;
    });

    onUpdate((prev) => ({
      ...prev,
      ceremonies: list,
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-serif font-bold text-amber-200 flex items-center gap-2">
            <Sliders className="w-5 h-5 text-amber-400" />
            <span>Cultural Vedic Ceremonies Guide</span>
          </h2>
          <p className="text-xs text-amber-100/60 font-light mt-1">
            Explain traditional South Indian rituals (Kashi Yatra, Oonjal, Mangalyadharanam, Sapthapadi, etc.).
          </p>
        </div>

        <button
          onClick={handleAddCeremony}
          className="px-4 py-2 rounded-full bg-amber-500 hover:bg-amber-400 text-maroon-950 font-serif font-bold text-xs uppercase tracking-wider flex items-center space-x-1.5 shadow"
        >
          <Plus className="w-4 h-4" />
          <span>Add Ceremony</span>
        </button>
      </div>

      <div className="space-y-4">
        {ceremonies.map((c, idx) => (
          <div
            key={c.id}
            className="p-5 rounded-2xl bg-[#1c050a] border border-amber-500/25 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-amber-500/15 pb-3">
              <span className="text-xs font-serif font-bold text-amber-300">
                Ceremony #{idx + 1}: {c.name} {c.tamilName ? `(${c.tamilName})` : ''}
              </span>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleUpdate(c.id, 'enabled', !c.enabled)}
                  className={`p-1.5 rounded-lg border text-xs ${
                    c.enabled ? 'border-emerald-500/40 text-emerald-300' : 'border-rose-500/40 text-rose-400'
                  }`}
                >
                  {c.enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>

                <button
                  disabled={idx === 0}
                  onClick={() => handleMove(idx, 'up')}
                  className="p-1.5 rounded-lg border border-amber-500/20 text-amber-300 hover:bg-amber-500/10 disabled:opacity-30"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>

                <button
                  disabled={idx === ceremonies.length - 1}
                  onClick={() => handleMove(idx, 'down')}
                  className="p-1.5 rounded-lg border border-amber-500/20 text-amber-300 hover:bg-amber-500/10 disabled:opacity-30"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleDelete(c.id)}
                  className="p-1.5 rounded-lg border border-rose-500/30 text-rose-400 hover:bg-rose-500/10"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-serif text-amber-200 mb-1">Ceremony English Name</label>
                <input
                  type="text"
                  value={c.name}
                  onChange={(e) => handleUpdate(c.id, 'name', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-serif text-amber-200 mb-1">Tamil / Sanskrit Script Name</label>
                <input
                  type="text"
                  value={c.tamilName || ''}
                  onChange={(e) => handleUpdate(c.id, 'tamilName', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-serif text-amber-200 mb-1">Time Slot</label>
                <input
                  type="text"
                  value={c.timeSlot || ''}
                  onChange={(e) => handleUpdate(c.id, 'timeSlot', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-serif text-amber-200 mb-1">Short Meaning</label>
              <input
                type="text"
                value={c.meaning}
                onChange={(e) => handleUpdate(c.id, 'meaning', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-black/50 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-serif text-amber-200 mb-1">Ritual Description</label>
              <textarea
                rows={2}
                value={c.description}
                onChange={(e) => handleUpdate(c.id, 'description', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-black/50 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400 resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-serif text-amber-200 mb-1">Auspicious Significance</label>
              <textarea
                rows={2}
                value={c.auspiciousSignificance}
                onChange={(e) => handleUpdate(c.id, 'auspiciousSignificance', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-black/50 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400 resize-none"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
