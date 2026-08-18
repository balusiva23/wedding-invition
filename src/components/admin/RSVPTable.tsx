import React, { useState, useEffect } from 'react';
import { RSVPRecord } from '../../types/wedding';
import { weddingDataService } from '../../services/weddingDataService';
import { CheckSquare, Download, Search, Trash2, Users, Utensils, Car } from 'lucide-react';

export const RSVPTable: React.FC = () => {
  const [records, setRecords] = useState<RSVPRecord[]>([]);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    setRecords(weddingDataService.getRSVPs());
    const unsub = weddingDataService.subscribe(() => {
      setRecords(weddingDataService.getRSVPs());
    });
    return () => unsub();
  }, []);

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this RSVP entry?')) {
      weddingDataService.deleteRSVP(id);
    }
  };

  const filtered = records.filter((r) => {
    const matchesSearch =
      r.fullName.toLowerCase().includes(search.toLowerCase()) ||
      r.phone.includes(search) ||
      (r.email && r.email.toLowerCase().includes(search.toLowerCase()));

    if (filterStatus === 'all') return matchesSearch;
    return matchesSearch && r.attending === filterStatus;
  });

  const totalGuests = records.reduce(
    (acc, r) => (r.attending === 'yes' ? acc + (r.guestCount || 1) : acc),
    0
  );
  const attendingResponses = records.filter((r) => r.attending === 'yes').length;
  const transportNeeded = records.filter((r) => r.needsTransport && r.attending === 'yes').length;

  const exportCSV = () => {
    const headers = ['Full Name', 'Phone', 'Email', 'Guests Count', 'Attending', 'Meal', 'Transport Needed', 'Message', 'Submitted At'];
    const rows = records.map((r) => [
      `"${r.fullName}"`,
      `"${r.phone}"`,
      `"${r.email || ''}"`,
      r.guestCount,
      r.attending,
      r.mealPreference,
      r.needsTransport ? 'Yes' : 'No',
      `"${(r.message || '').replace(/"/g, '""')}"`,
      r.submittedAt,
    ]);

    const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Ananya_Arjun_RSVP_List_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-serif font-bold text-amber-200 flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-amber-400" />
            <span>Guest RSVP Dashboard</span>
          </h2>
          <p className="text-xs text-amber-100/60 font-light mt-1">
            Track guest confirmations, headcount, feast preferences, and export records.
          </p>
        </div>

        <button
          onClick={exportCSV}
          className="px-4 py-2 rounded-full bg-amber-500 hover:bg-amber-400 text-maroon-950 font-serif font-bold text-xs uppercase tracking-wider flex items-center space-x-1.5 shadow self-start"
        >
          <Download className="w-4 h-4" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-[#1c050a] border border-amber-500/25 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-serif text-amber-300/70">Total Attending Guests</div>
            <div className="text-xl font-display font-bold text-amber-100">{totalGuests}</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#1c050a] border border-amber-500/25 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <CheckSquare className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-serif text-amber-300/70">Attending Responses</div>
            <div className="text-xl font-display font-bold text-emerald-300">{attendingResponses}</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#1c050a] border border-amber-500/25 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
            <Car className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-serif text-amber-300/70">Airport / Station Pickup</div>
            <div className="text-xl font-display font-bold text-amber-200">{transportNeeded}</div>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, phone, or email..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/50 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400"
          />
        </div>

        <div className="flex gap-2">
          {['all', 'yes', 'maybe', 'no'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-2 rounded-xl text-xs font-serif uppercase tracking-wider transition-all ${
                filterStatus === st
                  ? 'bg-amber-500 text-maroon-950 font-bold'
                  : 'bg-black/40 border border-amber-500/20 text-amber-200/70'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-amber-500/25 bg-[#1c050a]">
        <table className="w-full text-left text-xs text-amber-100">
          <thead className="bg-[#24060C] text-[10px] uppercase font-serif tracking-wider text-amber-300 border-b border-amber-500/20">
            <tr>
              <th className="py-3 px-4">Guest Name</th>
              <th className="py-3 px-4">Phone</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Count</th>
              <th className="py-3 px-4">Feast Diet</th>
              <th className="py-3 px-4">Transport</th>
              <th className="py-3 px-4">Note</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-amber-500/10">
            {filtered.map((r) => (
              <tr key={r.id} className="hover:bg-amber-950/20 transition-colors">
                <td className="py-3 px-4 font-serif font-bold text-amber-200">{r.fullName}</td>
                <td className="py-3 px-4 font-mono text-amber-300/80">{r.phone}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-serif uppercase tracking-wider font-semibold ${
                      r.attending === 'yes'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                        : r.attending === 'maybe'
                        ? 'bg-amber-950 text-amber-300 border border-amber-500/30'
                        : 'bg-rose-950 text-rose-300 border border-rose-500/30'
                    }`}
                  >
                    {r.attending}
                  </span>
                </td>
                <td className="py-3 px-4 font-mono">{r.guestCount}</td>
                <td className="py-3 px-4 text-amber-200/80">{r.mealPreference}</td>
                <td className="py-3 px-4">
                  {r.needsTransport ? (
                    <span className="text-emerald-400 font-bold">Yes</span>
                  ) : (
                    <span className="text-amber-100/40">No</span>
                  )}
                </td>
                <td className="py-3 px-4 max-w-xs truncate text-amber-100/70" title={r.message}>
                  {r.message || '—'}
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => handleDelete(r.id)}
                    className="p-1 text-rose-400 hover:text-rose-200"
                    title="Delete Record"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="py-8 text-center text-amber-100/50 font-serif">
                  No RSVP records found matching your filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
