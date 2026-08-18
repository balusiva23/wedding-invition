import React from 'react';
import { WeddingConfig, AccommodationInfo } from '../../types/wedding';
import { Hotel, Plus, Trash2, Eye, EyeOff } from 'lucide-react';

interface TravelEditorProps {
  config: WeddingConfig;
  onUpdate: (updater: (prev: WeddingConfig) => WeddingConfig) => void;
}

export const TravelEditor: React.FC<TravelEditorProps> = ({ config, onUpdate }) => {
  const { accommodations } = config;

  const handleAdd = () => {
    const newAcc: AccommodationInfo = {
      id: 'acc-' + Date.now(),
      name: 'Partner Hotel / Transport',
      category: 'Hotel',
      description: 'Room blocks or shuttle pickup information...',
      address: 'Chennai, Tamil Nadu',
      distance: '2 km from Mandapam',
      phone: '+91 44 1234 5678',
      bookingUrl: 'https://example.com',
      enabled: true,
    };
    onUpdate((prev) => ({
      ...prev,
      accommodations: [...prev.accommodations, newAcc],
    }));
  };

  const handleUpdate = (id: string, field: keyof AccommodationInfo, value: any) => {
    onUpdate((prev) => ({
      ...prev,
      accommodations: prev.accommodations.map((a) => (a.id === id ? { ...a, [field]: value } : a)),
    }));
  };

  const handleDelete = (id: string) => {
    onUpdate((prev) => ({
      ...prev,
      accommodations: prev.accommodations.filter((a) => a.id !== id),
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-serif font-bold text-amber-200 flex items-center gap-2">
            <Hotel className="w-5 h-5 text-amber-400" />
            <span>Guest Accommodations & Travel Info</span>
          </h2>
          <p className="text-xs text-amber-100/60 font-light mt-1">
            Manage partner hotels, airport shuttle desks, and railway transit details.
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="px-4 py-2 rounded-full bg-amber-500 hover:bg-amber-400 text-maroon-950 font-serif font-bold text-xs uppercase tracking-wider flex items-center space-x-1.5 shadow"
        >
          <Plus className="w-4 h-4" />
          <span>Add Travel / Hotel</span>
        </button>
      </div>

      <div className="space-y-4">
        {accommodations.map((acc) => (
          <div
            key={acc.id}
            className="p-5 rounded-2xl bg-[#1c050a] border border-amber-500/25 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-amber-500/15 pb-3">
              <span className="text-xs font-serif font-bold text-amber-300">
                {acc.name} ({acc.category})
              </span>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleUpdate(acc.id, 'enabled', !acc.enabled)}
                  className={`p-1.5 rounded-lg border text-xs ${
                    acc.enabled ? 'border-emerald-500/40 text-emerald-300' : 'border-rose-500/40 text-rose-400'
                  }`}
                >
                  {acc.enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => handleDelete(acc.id)}
                  className="p-1.5 rounded-lg border border-rose-500/30 text-rose-400 hover:bg-rose-500/10"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-serif text-amber-200 mb-1">Name</label>
                <input
                  type="text"
                  value={acc.name}
                  onChange={(e) => handleUpdate(acc.id, 'name', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-serif text-amber-200 mb-1">Category</label>
                <select
                  value={acc.category}
                  onChange={(e) => handleUpdate(acc.id, 'category', e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400"
                >
                  <option value="Hotel" className="bg-maroon-950">Hotel</option>
                  <option value="Airport" className="bg-maroon-950">Airport</option>
                  <option value="Railway" className="bg-maroon-950">Railway Station</option>
                  <option value="Transit" className="bg-maroon-950">Transit</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-serif text-amber-200 mb-1">Distance Badge</label>
                <input
                  type="text"
                  value={acc.distance}
                  onChange={(e) => handleUpdate(acc.id, 'distance', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-serif text-amber-200 mb-1">Address / Landmark</label>
                <input
                  type="text"
                  value={acc.address}
                  onChange={(e) => handleUpdate(acc.id, 'address', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-serif text-amber-200 mb-1">Contact Phone</label>
                <input
                  type="text"
                  value={acc.phone || ''}
                  onChange={(e) => handleUpdate(acc.id, 'phone', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-serif text-amber-200 mb-1">Description & Booking Notes</label>
              <textarea
                rows={2}
                value={acc.description}
                onChange={(e) => handleUpdate(acc.id, 'description', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-black/50 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400 resize-none"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
