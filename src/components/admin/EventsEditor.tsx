import React from 'react';
import { WeddingConfig, WeddingEvent } from '../../types/wedding';
import { Calendar, Plus, Trash2, ArrowUp, ArrowDown, Eye, EyeOff } from 'lucide-react';

interface EventsEditorProps {
  config: WeddingConfig;
  onUpdate: (updater: (prev: WeddingConfig) => WeddingConfig) => void;
}

export const EventsEditor: React.FC<EventsEditorProps> = ({ config, onUpdate }) => {
  const { events } = config;

  const handleAddEvent = () => {
    const newEvent: WeddingEvent = {
      id: 'ev-' + Date.now(),
      name: 'New Festive Ceremony',
      type: 'Ritual / Celebration',
      date: '2026-12-12',
      startTime: '05:00 PM',
      endTime: '08:00 PM',
      venue: 'The Leela Palace Chennai',
      address: 'Adyar Seaface, MRC Nagar, Chennai',
      description: 'Describe this joyous celebration for your guests...',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop',
      icon: 'sparkles',
      mapUrl: 'https://maps.google.com/?q=The+Leela+Palace+Chennai',
      calendarEnabled: true,
      order: events.length + 1,
      enabled: true,
    };
    onUpdate((prev) => ({
      ...prev,
      events: [...prev.events, newEvent],
    }));
  };

  const handleUpdateEvent = (id: string, field: keyof WeddingEvent, value: any) => {
    onUpdate((prev) => ({
      ...prev,
      events: prev.events.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
    }));
  };

  const handleDeleteEvent = (id: string) => {
    onUpdate((prev) => ({
      ...prev,
      events: prev.events.filter((e) => e.id !== id),
    }));
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= events.length) return;

    const list = [...events];
    const temp = list[index];
    list[index] = list[targetIdx];
    list[targetIdx] = temp;
    list.forEach((item, idx) => {
      item.order = idx + 1;
    });

    onUpdate((prev) => ({
      ...prev,
      events: list,
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-serif font-bold text-amber-200 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-amber-400" />
            <span>Wedding Events & Functions</span>
          </h2>
          <p className="text-xs text-amber-100/60 font-light mt-1">
            Configure ceremonies, sangeet, feasts, receptions, and dates.
          </p>
        </div>

        <button
          onClick={handleAddEvent}
          className="px-4 py-2 rounded-full bg-amber-500 hover:bg-amber-400 text-maroon-950 font-serif font-bold text-xs uppercase tracking-wider flex items-center space-x-1.5 shadow"
        >
          <Plus className="w-4 h-4" />
          <span>Add Event</span>
        </button>
      </div>

      <div className="space-y-4">
        {events.map((ev, idx) => (
          <div
            key={ev.id}
            className="p-5 rounded-2xl bg-[#1c050a] border border-amber-500/25 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-amber-500/15 pb-3">
              <span className="text-xs font-serif font-bold text-amber-300">
                Event #{idx + 1}: {ev.name}
              </span>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleUpdateEvent(ev.id, 'enabled', !ev.enabled)}
                  className={`p-1.5 rounded-lg border text-xs ${
                    ev.enabled
                      ? 'border-emerald-500/40 text-emerald-300'
                      : 'border-rose-500/40 text-rose-400'
                  }`}
                >
                  {ev.enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>

                <button
                  disabled={idx === 0}
                  onClick={() => handleMove(idx, 'up')}
                  className="p-1.5 rounded-lg border border-amber-500/20 text-amber-300 hover:bg-amber-500/10 disabled:opacity-30"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>

                <button
                  disabled={idx === events.length - 1}
                  onClick={() => handleMove(idx, 'down')}
                  className="p-1.5 rounded-lg border border-amber-500/20 text-amber-300 hover:bg-amber-500/10 disabled:opacity-30"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleDeleteEvent(ev.id)}
                  className="p-1.5 rounded-lg border border-rose-500/30 text-rose-400 hover:bg-rose-500/10"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-serif text-amber-200 mb-1">Event Name</label>
                <input
                  type="text"
                  value={ev.name}
                  onChange={(e) => handleUpdateEvent(ev.id, 'name', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-serif text-amber-200 mb-1">Event Type Tag</label>
                <input
                  type="text"
                  value={ev.type}
                  onChange={(e) => handleUpdateEvent(ev.id, 'type', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-serif text-amber-200 mb-1">Date (YYYY-MM-DD)</label>
                <input
                  type="date"
                  value={ev.date}
                  onChange={(e) => handleUpdateEvent(ev.id, 'date', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-serif text-amber-200 mb-1">Start Time</label>
                <input
                  type="text"
                  value={ev.startTime}
                  onChange={(e) => handleUpdateEvent(ev.id, 'startTime', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-serif text-amber-200 mb-1">End Time</label>
                <input
                  type="text"
                  value={ev.endTime}
                  onChange={(e) => handleUpdateEvent(ev.id, 'endTime', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-serif text-amber-200 mb-1">Hall / Venue Name</label>
                <input
                  type="text"
                  value={ev.venue}
                  onChange={(e) => handleUpdateEvent(ev.id, 'venue', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-serif text-amber-200 mb-1">Address</label>
                <input
                  type="text"
                  value={ev.address}
                  onChange={(e) => handleUpdateEvent(ev.id, 'address', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-serif text-amber-200 mb-1">Description</label>
              <textarea
                rows={2}
                value={ev.description}
                onChange={(e) => handleUpdateEvent(ev.id, 'description', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-black/50 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400 resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-serif text-amber-200 mb-1">Image URL</label>
                <input
                  type="text"
                  value={ev.image}
                  onChange={(e) => handleUpdateEvent(ev.id, 'image', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-serif text-amber-200 mb-1">Google Maps Link</label>
                <input
                  type="text"
                  value={ev.mapUrl}
                  onChange={(e) => handleUpdateEvent(ev.id, 'mapUrl', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
