import React, { useState, useEffect } from 'react';
import { weddingDataService } from '../../services/weddingDataService';
import { KolamDivider } from '../common/KolamDivider';
import { audioService } from '../../services/audioService';
import { languageService } from '../../services/languageService';
import confetti from 'canvas-confetti';
import { HeartHandshake, CheckCircle2, User, Phone, Users, Utensils, MessageSquare, Sparkles } from 'lucide-react';

export const RSVPSection: React.FC<{ weddingDate: string }> = ({ weddingDate }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    guestCount: 1,
    attending: 'yes' as 'yes' | 'no' | 'maybe',
    mealPreference: 'Vegetarian' as 'Vegetarian' | 'Non-Vegetarian' | 'Jain',
    needsTransport: false,
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [, setLangState] = useState(languageService.getLanguage());

  useEffect(() => {
    const unsub = languageService.subscribe((l) => setLangState(l));
    return () => unsub();
  }, []);

  const t = languageService.t();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      setErrorMessage(t.rsvp.fullName + ' *');
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMessage(t.rsvp.phone + ' *');
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);

    setTimeout(() => {
      weddingDataService.submitRSVP(formData);
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Celebrate with audio chime + golden confetti!
      audioService.playCelebrationChime();
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#FFDF73', '#982536', '#FFFFFF'],
        });
      } catch (err) {
        console.warn('Confetti error:', err);
      }
    }, 600);
  };

  return (
    <section id="rsvp" className="relative py-24 px-4 bg-[#180509] overflow-hidden">
      <div className="max-w-3xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 text-amber-400 mb-2">
            <HeartHandshake className="w-4 h-4" />
            <span className="font-serif text-xs uppercase tracking-[0.25em] font-semibold">
              {t.rsvp.title}
            </span>
            <HeartHandshake className="w-4 h-4" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-amber-100 mb-3">
            {t.rsvp.title}
          </h2>

          <p className="text-xs sm:text-sm text-amber-100/70 font-light leading-relaxed">
            {t.rsvp.subtitle}
          </p>

          <KolamDivider className="my-6" />
        </div>

        {/* Form or Success State */}
        <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-maroon-900/40 via-maroon-950/70 to-black/80 border border-amber-500/30 shadow-2xl shadow-black/80">
          {isSubmitted ? (
            <div className="text-center py-8 flex flex-col items-center animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-950 border-2 border-emerald-400/80 flex items-center justify-center text-emerald-400 mb-4 shadow-lg shadow-emerald-500/20">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h3 className="font-serif text-2xl font-bold text-amber-100 mb-2">
                {formData.fullName}
              </h3>

              <p className="text-xs sm:text-sm text-amber-200/80 max-w-md font-light leading-relaxed mb-6">
                {t.rsvp.submittedSuccess} {t.rsvp.submittedMessage}
              </p>

              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    fullName: '',
                    phone: '',
                    email: '',
                    guestCount: 1,
                    attending: 'yes',
                    mealPreference: 'Vegetarian',
                    needsTransport: false,
                    message: '',
                  });
                }}
                className="px-6 py-2 rounded-full border border-amber-400/40 hover:bg-amber-500/10 text-amber-200 text-xs font-serif uppercase tracking-wider transition-all"
              >
                ← {t.rsvp.alreadySubmitted}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMessage && (
                <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/30 text-rose-200 text-xs text-center font-medium">
                  {errorMessage}
                </div>
              )}

              {/* Attendance Options */}
              <div>
                <label className="block text-xs font-serif uppercase tracking-wider text-amber-300 mb-2 font-medium">
                  {t.rsvp.attendingStatus} *
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { val: 'yes', label: t.rsvp.attendingYes },
                    { val: 'maybe', label: t.rsvp.attendingMaybe },
                    { val: 'no', label: t.rsvp.attendingNo },
                  ].map((opt) => (
                    <button
                      type="button"
                      key={opt.val}
                      onClick={() => setFormData({ ...formData, attending: opt.val as any })}
                      className={`py-3 px-2 rounded-2xl border text-xs font-serif text-center transition-all ${
                        formData.attending === opt.val
                          ? 'bg-amber-500 text-maroon-950 font-bold border-amber-300 shadow-md'
                          : 'bg-black/30 border-amber-500/20 text-amber-200/70 hover:border-amber-400/40'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-serif text-amber-200 mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-amber-400" /> {t.rsvp.fullName} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Ramesh Sundaram"
                    className="w-full px-4 py-3 rounded-2xl bg-black/40 border border-amber-500/25 text-amber-100 text-sm focus:outline-none focus:border-amber-400 transition-colors placeholder:text-amber-100/30"
                  />
                </div>

                <div>
                  <label className="block text-xs font-serif text-amber-200 mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-amber-400" /> {t.rsvp.phone} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98400 12345"
                    className="w-full px-4 py-3 rounded-2xl bg-black/40 border border-amber-500/25 text-amber-100 text-sm focus:outline-none focus:border-amber-400 transition-colors placeholder:text-amber-100/30"
                  />
                </div>
              </div>

              {/* Guest Count & Food Preference */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-serif text-amber-200 mb-1.5 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-amber-400" /> {t.rsvp.guestsCount}
                  </label>
                  <select
                    value={formData.guestCount}
                    onChange={(e) => setFormData({ ...formData, guestCount: parseInt(e.target.value) || 1 })}
                    className="w-full px-4 py-3 rounded-2xl bg-black/40 border border-amber-500/25 text-amber-100 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <option key={num} value={num} className="bg-maroon-950 text-amber-100">
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-serif text-amber-200 mb-1.5 flex items-center gap-1.5">
                    <Utensils className="w-3.5 h-3.5 text-amber-400" /> {t.rsvp.mealPreference}
                  </label>
                  <select
                    value={formData.mealPreference}
                    onChange={(e) => setFormData({ ...formData, mealPreference: e.target.value as any })}
                    className="w-full px-4 py-3 rounded-2xl bg-black/40 border border-amber-500/25 text-amber-100 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                  >
                    <option value="Vegetarian" className="bg-maroon-950 text-amber-100">
                      {t.rsvp.vegetarian}
                    </option>
                    <option value="Non-Vegetarian" className="bg-maroon-950 text-amber-100">
                      {t.rsvp.nonVegetarian}
                    </option>
                    <option value="Jain" className="bg-maroon-950 text-amber-100">
                      {t.rsvp.jain}
                    </option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-serif text-amber-200 mb-1.5 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-amber-400" /> {t.rsvp.message}
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Looking forward to celebrating with you both!"
                  className="w-full px-4 py-3 rounded-2xl bg-black/40 border border-amber-500/25 text-amber-100 text-sm focus:outline-none focus:border-amber-400 transition-colors placeholder:text-amber-100/30 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-maroon-950 font-serif font-bold text-sm uppercase tracking-widest shadow-xl shadow-amber-500/25 transition-all hover:scale-[1.01] active:scale-95 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>{t.rsvp.submitting}</span>
                ) : (
                  <>
                    <span>{t.rsvp.submit}</span>
                    <Sparkles className="w-4 h-4 text-maroon-950" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
