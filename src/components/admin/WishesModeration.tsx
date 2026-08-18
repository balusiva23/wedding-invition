import React, { useState, useEffect } from 'react';
import { GuestWish } from '../../types/wedding';
import { weddingDataService } from '../../services/weddingDataService';
import { MessageSquare, Star, Trash2, CheckCircle, EyeOff, Search } from 'lucide-react';

export const WishesModeration: React.FC = () => {
  const [wishes, setWishes] = useState<GuestWish[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setWishes(weddingDataService.getWishes(true));
    const unsub = weddingDataService.subscribe(() => {
      setWishes(weddingDataService.getWishes(true));
    });
    return () => unsub();
  }, []);

  const handleStatus = (id: string, status: 'approved' | 'pending' | 'hidden') => {
    weddingDataService.updateWishStatus(id, status);
  };

  const handleToggleFeatured = (id: string) => {
    weddingDataService.toggleWishFeatured(id);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this wish permanently?')) {
      weddingDataService.deleteWish(id);
    }
  };

  const filtered = wishes.filter(
    (w) =>
      w.name.toLowerCase().includes(search.toLowerCase()) ||
      w.message.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-serif font-bold text-amber-200 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-amber-400" />
            <span>Guest Wishes Moderation</span>
          </h2>
          <p className="text-xs text-amber-100/60 font-light mt-1">
            Approve, feature, hide, or moderate guest blessings for the public wall.
          </p>
        </div>
      </div>

      <div className="relative">
        <Search className="w-4 h-4 text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search wishes by guest name or message..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/50 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400"
        />
      </div>

      <div className="space-y-3">
        {filtered.map((w) => (
          <div
            key={w.id}
            className="p-5 rounded-2xl bg-[#1c050a] border border-amber-500/25 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="space-y-1 max-w-xl">
              <div className="flex items-center space-x-2">
                <span className="font-serif text-sm font-bold text-amber-100">{w.name}</span>
                {w.relationship && (
                  <span className="text-[10px] text-amber-400/80 bg-amber-900/40 px-2 py-0.5 rounded-full border border-amber-500/20">
                    {w.relationship}
                  </span>
                )}
                <span className="text-[10px] text-amber-100/40 font-mono">({w.date})</span>
              </div>
              <p className="text-xs text-amber-100/80 font-light italic">"{w.message}"</p>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              <button
                onClick={() => handleToggleFeatured(w.id)}
                className={`p-2 rounded-xl border text-xs flex items-center space-x-1 ${
                  w.featured
                    ? 'border-amber-400 bg-amber-400/20 text-amber-300'
                    : 'border-amber-500/20 text-amber-100/40 hover:text-amber-200'
                }`}
                title={w.featured ? 'Featured on Top' : 'Mark as Featured'}
              >
                <Star className={`w-4 h-4 ${w.featured ? 'fill-amber-400' : ''}`} />
              </button>

              <button
                onClick={() => handleStatus(w.id, w.status === 'approved' ? 'hidden' : 'approved')}
                className={`p-2 rounded-xl border text-xs flex items-center space-x-1 ${
                  w.status === 'approved'
                    ? 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300'
                    : 'border-amber-500/20 text-amber-100/40'
                }`}
                title={w.status === 'approved' ? 'Approved' : 'Hidden'}
              >
                {w.status === 'approved' ? <CheckCircle className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>

              <button
                onClick={() => handleDelete(w.id)}
                className="p-2 rounded-xl border border-rose-500/30 text-rose-400 hover:bg-rose-500/10"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
