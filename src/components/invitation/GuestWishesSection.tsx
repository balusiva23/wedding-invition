import React, { useState, useEffect } from 'react';
import { GuestWish } from '../../types/wedding';
import { weddingDataService } from '../../services/weddingDataService';
import { KolamDivider } from '../common/KolamDivider';
import { audioService } from '../../services/audioService';
import { languageService } from '../../services/languageService';
import { MessageCircleHeart, Heart, Send, Sparkles, User, MessageSquare } from 'lucide-react';

export const GuestWishesSection: React.FC = () => {
  const [wishes, setWishes] = useState<GuestWish[]>([]);
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [floatingHeartId, setFloatingHeartId] = useState<string | null>(null);
  const [, setLangState] = useState(languageService.getLanguage());

  useEffect(() => {
    setWishes(weddingDataService.getWishes());
    const unsubData = weddingDataService.subscribe(() => {
      setWishes(weddingDataService.getWishes());
    });
    const unsubLang = languageService.subscribe((l) => setLangState(l));
    return () => {
      unsubData();
      unsubLang();
    };
  }, []);

  const t = languageService.t();

  const handleSendWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      weddingDataService.addWish(name, message, relation);
      setName('');
      setRelation('');
      setMessage('');
      setIsSubmitting(false);
      audioService.playCelebrationChime();
    }, 400);
  };

  const handleLike = (id: string) => {
    setFloatingHeartId(id);
    weddingDataService.likeWish(id);
    setTimeout(() => setFloatingHeartId(null), 1000);
  };

  return (
    <section id="wishes" className="relative py-24 px-4 bg-[#120508] overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-amber-400 mb-2">
            <MessageCircleHeart className="w-4 h-4" />
            <span className="font-serif text-xs uppercase tracking-[0.25em] font-semibold">
              {t.wishes.title}
            </span>
            <MessageCircleHeart className="w-4 h-4" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-amber-100 mb-3">
            {t.wishes.title}
          </h2>

          <p className="text-xs sm:text-sm text-amber-100/70 max-w-md mx-auto font-light leading-relaxed">
            {t.wishes.subtitle}
          </p>

          <KolamDivider className="my-6" />
        </div>

        {/* Leave a Blessing Form */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-maroon-900/40 via-maroon-950/70 to-black/80 border border-amber-500/25 shadow-2xl mb-16 max-w-2xl mx-auto">
          <h3 className="font-serif text-lg font-bold text-amber-100 mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{t.wishes.leaveWish}</span>
          </h3>

          <form onSubmit={handleSendWish} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-serif text-amber-200 mb-1">{t.wishes.yourName} *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Meenakshi Sundaram"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-amber-500/25 text-amber-100 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-serif text-amber-200 mb-1">{t.wishes.relationship}</label>
                <input
                  type="text"
                  value={relation}
                  onChange={(e) => setRelation(e.target.value)}
                  placeholder="e.g. Bride's Uncle / Friend"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-amber-500/25 text-amber-100 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-serif text-amber-200 mb-1">{t.wishes.yourBlessing} *</label>
              <textarea
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="May your life together be blessed with love, laughter, and lifelong happiness!"
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-amber-500/25 text-amber-100 text-sm focus:outline-none focus:border-amber-400 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-maroon-950 font-serif font-bold text-xs uppercase tracking-widest shadow-lg flex items-center justify-center space-x-2 transition-all active:scale-95 disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? '...' : t.wishes.sendBlessing}</span>
            </button>
          </form>
        </div>

        {/* Wishes Wall Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishes.map((wish) => (
            <div
              key={wish.id}
              className="relative p-6 rounded-3xl bg-gradient-to-b from-maroon-900/30 to-maroon-950/60 border border-amber-500/20 shadow-xl flex flex-col justify-between hover:border-amber-400/40 transition-all"
            >
              {floatingHeartId === wish.id && (
                <div className="absolute top-4 right-4 text-2xl animate-bounce pointer-events-none text-rose-400">
                  ❤️
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-serif text-sm font-bold text-amber-100">{wish.name}</h4>
                    {wish.relationship && (
                      <span className="text-[10px] text-amber-300/70 font-serif block">
                        {wish.relationship}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-amber-400/50 font-mono">
                    {new Date(wish.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </div>

                <p className="text-xs text-amber-100/80 font-light leading-relaxed italic mb-4">
                  "{wish.message}"
                </p>
              </div>

              <div className="pt-3 border-t border-amber-500/10 flex items-center justify-between">
                <span className="text-[10px] text-amber-300/50 font-serif">Blessing</span>
                <button
                  onClick={() => handleLike(wish.id)}
                  className="flex items-center space-x-1.5 text-xs text-rose-300 hover:text-rose-400 bg-rose-950/40 hover:bg-rose-950/70 px-2.5 py-1 rounded-full border border-rose-500/20 transition-colors"
                >
                  <Heart className="w-3.5 h-3.5 fill-rose-400" />
                  <span className="font-mono text-[11px] font-bold">{wish.likes}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
