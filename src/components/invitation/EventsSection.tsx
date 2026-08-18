import React, { useState, useEffect } from 'react';
import { WeddingEvent } from '../../types/wedding';
import { KolamDivider } from '../common/KolamDivider';
import { Calendar, Clock, MapPin, CalendarPlus, Navigation as NavIcon, Sparkles } from 'lucide-react';
import { calendarService } from '../../services/calendarService';
import { languageService } from '../../services/languageService';

export const EventsSection: React.FC<{ events: WeddingEvent[] }> = ({ events }) => {
  const activeEvents = events.filter((e) => e.enabled).sort((a, b) => a.order - b.order);
  const [, setLangState] = useState(languageService.getLanguage());

  useEffect(() => {
    const unsub = languageService.subscribe((l) => setLangState(l));
    return () => unsub();
  }, []);

  const t = languageService.t();

  const handleAddEventCalendar = (event: WeddingEvent) => {
    const url = calendarService.getGoogleCalendarUrl({
      title: `${event.name} — Ananya & Arjun Wedding`,
      description: event.description,
      location: `${event.venue}, ${event.address}`,
      startDate: event.date,
    });
    window.open(url, '_blank');
  };

  return (
    <section id="events" className="relative py-24 px-4 bg-[#180509] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-amber-400 mb-2">
            <Sparkles className="w-4 h-4" />
            <span className="font-serif text-xs uppercase tracking-[0.25em] font-semibold">
              {t.events.title}
            </span>
            <Sparkles className="w-4 h-4" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-amber-100 mb-3">
            {t.events.title}
          </h2>

          <p className="text-xs sm:text-sm text-amber-100/70 max-w-md mx-auto font-light leading-relaxed">
            {t.events.subtitle}
          </p>

          <KolamDivider className="my-6" />
        </div>

        {/* Events Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeEvents.map((event) => (
            <div
              key={event.id}
              className="rounded-3xl bg-gradient-to-b from-maroon-900/40 via-maroon-950/70 to-black/80 border border-amber-500/25 shadow-2xl overflow-hidden hover:border-amber-400/60 transition-all flex flex-col justify-between group"
            >
              {/* Event Image */}
              <div className="relative h-48 sm:h-52 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-maroon-950 via-maroon-950/30 to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-amber-500/90 text-maroon-950 font-serif font-bold text-[11px] uppercase tracking-wider shadow">
                  {event.type}
                </span>
              </div>

              {/* Event Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-amber-100 mb-3 group-hover:text-amber-300 transition-colors">
                    {event.name}
                  </h3>

                  {/* Date & Time */}
                  <div className="space-y-2 mb-4 text-xs font-serif text-amber-200/90">
                    <div className="flex items-center space-x-2.5">
                      <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>
                        {new Date(event.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2.5">
                      <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>
                        {event.startTime} – {event.endTime}
                      </span>
                    </div>

                    <div className="flex items-start space-x-2.5">
                      <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span className="leading-snug">
                        <strong className="text-amber-200">{event.venue}</strong>
                        <span className="block text-amber-300/60 text-[11px] font-sans">
                          {event.address}
                        </span>
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-amber-100/70 font-light leading-relaxed mb-6">
                    {event.description}
                  </p>
                </div>

                {/* CTAs */}
                <div className="flex items-center gap-2 pt-4 border-t border-amber-500/20">
                  {event.mapUrl && (
                    <a
                      href={event.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 px-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-400/30 text-amber-200 text-xs font-serif text-center flex items-center justify-center space-x-1.5 transition-colors"
                    >
                      <NavIcon className="w-3.5 h-3.5 text-amber-400" />
                      <span>{t.events.getDirections}</span>
                    </a>
                  )}

                  {event.calendarEnabled && (
                    <button
                      onClick={() => handleAddEventCalendar(event)}
                      className="p-2.5 rounded-xl bg-black/40 hover:bg-black/60 border border-amber-500/30 text-amber-300 transition-colors"
                      title={t.events.addToCalendar}
                    >
                      <CalendarPlus className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
