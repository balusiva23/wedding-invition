import { WeddingEvent } from '../types/wedding';

function formatToICSDate(isoOrDateStr: string, timeStr?: string): string {
  // If time is like "07:30 AM" and date is "2026-12-12"
  try {
    let date = new Date(isoOrDateStr);
    if (isNaN(date.getTime()) && timeStr) {
      const [time, modifier] = timeStr.split(' ');
      let [hours, minutes] = time.split(':').map(Number);
      if (modifier === 'PM' && hours < 12) hours += 12;
      if (modifier === 'AM' && hours === 12) hours = 0;
      date = new Date(`${isoOrDateStr}T${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00+05:30`);
    }
    return date.toISOString().replace(/-|:|\.\d\d\d/g, '');
  } catch {
    return '20261212T020000Z';
  }
}

export const calendarService = {
  getGoogleCalendarUrl(event: {
    title: string;
    description: string;
    location: string;
    startDate: string;
    endDate?: string;
  }): string {
    const start = formatToICSDate(event.startDate);
    const end = event.endDate ? formatToICSDate(event.endDate) : formatToICSDate(event.startDate);
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: event.title,
      dates: `${start}/${end}`,
      details: event.description,
      location: event.location,
      ctz: 'Asia/Kolkata'
    });
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  },

  downloadICSFile(event: {
    title: string;
    description: string;
    location: string;
    startDate: string;
    endDate?: string;
  }): void {
    const start = formatToICSDate(event.startDate);
    const end = event.endDate ? formatToICSDate(event.endDate) : start;

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//South Indian Wedding Celebration//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `SUMMARY:${event.title}`,
      `DESCRIPTION:${event.description.replace(/\n/g, '\\n')}`,
      `LOCATION:${event.location}`,
      `DTSTART:${start}`,
      `DTEND:${end}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${event.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
