import React from 'react';
import { WeddingConfig, FamilyMember } from '../../types/wedding';
import { Users, Plus, Trash2 } from 'lucide-react';

interface FamilyEditorProps {
  config: WeddingConfig;
  onUpdate: (updater: (prev: WeddingConfig) => WeddingConfig) => void;
}

export const FamilyEditor: React.FC<FamilyEditorProps> = ({ config, onUpdate }) => {
  const { familyMembers } = config;

  const handleAdd = () => {
    const newF: FamilyMember = {
      id: 'fam-' + Date.now(),
      role: 'Family Role',
      names: ['Family Member Name'],
      description: 'Warm blessings and prayers...',
      side: 'bride',
    };
    onUpdate((prev) => ({
      ...prev,
      familyMembers: [...prev.familyMembers, newF],
    }));
  };

  const handleUpdate = (id: string, field: keyof FamilyMember, value: any) => {
    onUpdate((prev) => ({
      ...prev,
      familyMembers: prev.familyMembers.map((f) => (f.id === id ? { ...f, [field]: value } : f)),
    }));
  };

  const handleDelete = (id: string) => {
    onUpdate((prev) => ({
      ...prev,
      familyMembers: prev.familyMembers.filter((f) => f.id !== id),
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-serif font-bold text-amber-200 flex items-center gap-2">
            <Users className="w-5 h-5 text-amber-400" />
            <span>Family Lineage & Blessings</span>
          </h2>
          <p className="text-xs text-amber-100/60 font-light mt-1">
            Manage parents, grandparents, and siblings blessings.
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="px-4 py-2 rounded-full bg-amber-500 hover:bg-amber-400 text-maroon-950 font-serif font-bold text-xs uppercase tracking-wider flex items-center space-x-1.5 shadow"
        >
          <Plus className="w-4 h-4" />
          <span>Add Family Card</span>
        </button>
      </div>

      <div className="space-y-4">
        {familyMembers.map((fam) => (
          <div
            key={fam.id}
            className="p-5 rounded-2xl bg-[#1c050a] border border-amber-500/25 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-amber-500/15 pb-3">
              <span className="text-xs font-serif font-bold text-amber-300">
                {fam.role} ({fam.side === 'bride' ? "Bride's Side" : "Groom's Side"})
              </span>

              <button
                onClick={() => handleDelete(fam.id)}
                className="p-1.5 rounded-lg border border-rose-500/30 text-rose-400 hover:bg-rose-500/10"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-serif text-amber-200 mb-1">Role Title</label>
                <input
                  type="text"
                  value={fam.role}
                  onChange={(e) => handleUpdate(fam.id, 'role', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-serif text-amber-200 mb-1">Side</label>
                <select
                  value={fam.side}
                  onChange={(e) => handleUpdate(fam.id, 'side', e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400"
                >
                  <option value="bride" className="bg-maroon-950">Bride's Family</option>
                  <option value="groom" className="bg-maroon-950">Groom's Family</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-serif text-amber-200 mb-1">
                Names (comma separated)
              </label>
              <input
                type="text"
                value={fam.names.join(', ')}
                onChange={(e) =>
                  handleUpdate(
                    fam.id,
                    'names',
                    e.target.value.split(',').map((n) => n.trim()).filter(Boolean)
                  )
                }
                className="w-full px-3 py-2 rounded-xl bg-black/50 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-serif text-amber-200 mb-1">Blessing Quote</label>
              <textarea
                rows={2}
                value={fam.description || ''}
                onChange={(e) => handleUpdate(fam.id, 'description', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-black/50 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400 resize-none"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
