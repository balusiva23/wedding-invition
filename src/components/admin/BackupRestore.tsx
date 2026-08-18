import React, { useState } from 'react';
import { weddingDataService } from '../../services/weddingDataService';
import { FileCode, Download, Upload, Copy, Check, KeyRound, ShieldCheck } from 'lucide-react';
import { shareService } from '../../services/shareService';

interface BackupRestoreProps {
  onImportSuccess: () => void;
  onOpenChangePin?: () => void;
  adminPin?: string;
}

export const BackupRestore: React.FC<BackupRestoreProps> = ({
  onImportSuccess,
  onOpenChangePin,
  adminPin,
}) => {
  const [importJson, setImportJson] = useState('');
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleExport = () => {
    const jsonStr = weddingDataService.exportConfigJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Ananya_Arjun_Wedding_Backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  const handleCopyJSON = async () => {
    const jsonStr = weddingDataService.exportConfigJSON();
    const success = await shareService.copyToClipboard(jsonStr);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleImport = () => {
    if (!importJson.trim()) {
      setErrorMsg('Please paste valid JSON content.');
      return;
    }

    const res = weddingDataService.importConfigJSON(importJson);
    if (res.success) {
      setErrorMsg('');
      setImportJson('');
      onImportSuccess();
    } else {
      setErrorMsg(res.error || 'Failed to import JSON.');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-serif font-bold text-amber-200 flex items-center gap-2">
          <FileCode className="w-5 h-5 text-amber-400" />
          <span>Backup, Security & JSON Configuration</span>
        </h2>
        <p className="text-xs text-amber-100/60 font-light mt-1">
          Manage your admin passcode, save your complete wedding data backup as JSON, or restore from a file.
        </p>
      </div>

      {/* Security PIN Card */}
      {onOpenChangePin && (
        <div className="p-6 rounded-2xl bg-[#1c050a] border border-amber-500/25 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h3 className="text-sm font-serif font-bold text-amber-300">
                  Admin Passcode & PIN Protection
                </h3>
                <p className="text-xs text-amber-100/70 font-light">
                  Protected with secret PIN passcode. Change PIN anytime to restrict organizer access.
                </p>
              </div>
            </div>

            <button
              onClick={onOpenChangePin}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-maroon-950 font-serif font-bold text-xs uppercase tracking-wider flex items-center space-x-1.5 shadow transition-transform active:scale-95"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Change Passcode</span>
            </button>
          </div>
        </div>
      )}

      {/* Export Card */}
      <div className="p-6 rounded-2xl bg-[#1c050a] border border-amber-500/25 space-y-4">
        <h3 className="text-sm font-serif font-bold text-amber-300">Export Current Configuration</h3>
        <p className="text-xs text-amber-100/70 font-light leading-relaxed">
          Download all couple details, milestones, events, ceremonies, RSVPs, and wishes into a single JSON file.
        </p>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleExport}
            className="px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-maroon-950 font-serif font-bold text-xs uppercase tracking-wider flex items-center space-x-2 shadow"
          >
            <Download className="w-4 h-4" />
            <span>Download JSON Backup</span>
          </button>

          <button
            onClick={handleCopyJSON}
            className="px-5 py-2.5 rounded-full border border-amber-400/40 text-amber-200 hover:bg-amber-500/10 text-xs font-serif uppercase tracking-wider flex items-center space-x-2"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied to Clipboard' : 'Copy JSON'}</span>
          </button>
        </div>
      </div>

      {/* Import Card */}
      <div className="p-6 rounded-2xl bg-[#1c050a] border border-amber-500/25 space-y-4">
        <h3 className="text-sm font-serif font-bold text-amber-300">Restore from JSON Backup</h3>
        <p className="text-xs text-amber-100/70 font-light leading-relaxed">
          Paste valid wedding backup JSON below to restore all settings and content.
        </p>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs font-mono">
            {errorMsg}
          </div>
        )}

        <textarea
          rows={6}
          value={importJson}
          onChange={(e) => setImportJson(e.target.value)}
          placeholder="Paste exported JSON here..."
          className="w-full p-4 rounded-xl bg-black/60 border border-amber-500/30 text-amber-100 font-mono text-xs focus:outline-none focus:border-amber-400 resize-none"
        />

        <button
          onClick={handleImport}
          className="px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 text-white font-serif font-bold text-xs uppercase tracking-wider flex items-center space-x-2 shadow"
        >
          <Upload className="w-4 h-4" />
          <span>Restore Wedding Configuration</span>
        </button>
      </div>
    </div>
  );
};
