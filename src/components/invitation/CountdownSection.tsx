import React, { useState, useEffect } from 'react';
import { Calendar, Clock, BellRing, Download } from 'lucide-react';
import { calendarService } from '../../services/calendarService';
import { languageService } from '../../services/languageService';

interface CountdownSectionProps {
  weddingDate: string;
  muhurthamTime: string;
  venueName: string;
}

export const CountdownSection: React.FC<CountdownSectionProps> = ({
  weddingDate,
  muhurthamTime,
  venueName,
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPassed: false,
  });
  const [, setLangState] = useState(languageService.getLanguage());

  useEffect(() => {
    const unsub = languageService.subscribe((l) => setLangState(l));
    return () => unsub();
  }, []);

  const t = languageService.t();

  useEffect(() => {
    const target = new Date(weddingDate).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPassed: true });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isPassed: false });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [weddingDate]);

  const handleAddToGoogleCalendar = () => {
    const url = calendarService.getGoogleCalendarUrl({
      title: 'Wedding of Ananya & Arjun ❤️ (Muhurtham)',
      description: `Auspicious South Indian Vedic Muhurtham & Mangalyadharanam: ${muhurthamTime}`,
      location: venueName,
      startDate: weddingDate,
    });
    window.open(url, '_blank');
  };

  const handleDownloadICS = () => {
    calendarService.downloadICSFile({
      title: 'Ananya & Arjun Wedding Celebration',
      description: `Sacred South Indian Wedding Muhurtham at ${venueName}. Timing: ${muhurthamTime}`,
      location: venueName,
      startDate: weddingDate,
    });
  };

  const timeBlocks = [
    { label: t.countdown.days, value: timeLeft.days },
    { label: t.countdown.hours, value: timeLeft.hours },
    { label: t.countdown.minutes, value: timeLeft.minutes },
    { label: t.countdown.seconds, value: timeLeft.seconds },
  ];

  return (
    <section className="relative py-16 px-4 bg-[#180509] border-y border-amber-500/20 text-center overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="inline-flex items-center space-x-2 mb-3 text-amber-400">
          <Clock className="w-4 h-4" />
          <span className="font-serif text-xs uppercase tracking-[0.25em] font-semibold">
            {t.countdown.title}
          </span>
        </div>

        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-amber-100 mb-2">
          {t.countdown.title}
        </h2>

        <p className="text-xs sm:text-sm text-amber-200/70 max-w-md mx-auto mb-8 font-light">
          {t.countdown.subtitle}
        </p>

        {/* Counter Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto mb-10">
          {timeBlocks.map((unit) => (
            <div
              key={unit.label}
              className="relative p-5 rounded-2xl bg-gradient-to-b from-maroon-900/60 to-maroon-950/90 border border-amber-400/30 shadow-2xl shadow-black/60 flex flex-col items-center justify-center group hover:border-amber-400 transition-colors"
            >
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-amber-300/40 to-transparent" />
              
              <span className="font-display text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-amber-100 to-amber-400 tracking-wider">
                {String(unit.value).padStart(2, '0')}
              </span>

              <span className="mt-2 text-[10px] sm:text-xs font-serif tracking-[0.2em] text-amber-200/70 uppercase">
                {unit.label}
              </span>
            </div>
          ))}
        </div>

        {/* Add to Calendar Action Row */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={handleAddToGoogleCalendar}
            className="px-5 py-2.5 rounded-full bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/40 text-amber-200 text-xs font-serif uppercase tracking-wider flex items-center space-x-2 transition-all active:scale-95"
          >
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>Add to Google Calendar</span>
          </button>

          <button
            onClick={handleDownloadICS}
            className="px-5 py-2.5 rounded-full bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/40 text-amber-200 text-xs font-serif uppercase tracking-wider flex items-center space-x-2 transition-all active:scale-95"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span>Download Apple iCal (.ics)</span>
          </button>
        </div>
      </div>
    </section>
  );
};
