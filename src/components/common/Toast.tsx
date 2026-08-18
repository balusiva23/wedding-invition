import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message?: string;
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-20 sm:bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col space-y-2 w-full max-w-sm px-4 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="pointer-events-auto flex items-center justify-between p-3.5 rounded-xl bg-[#2D060C] border border-amber-500/40 text-amber-100 shadow-2xl shadow-black/80 backdrop-blur-md animate-bounce-short"
        >
          <div className="flex items-center space-x-3">
            {t.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
            {t.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />}
            {t.type === 'info' && <Info className="w-5 h-5 text-amber-400 shrink-0" />}

            <div className="flex flex-col text-left">
              <span className="text-xs font-serif font-bold text-amber-200">{t.title}</span>
              {t.message && <span className="text-[11px] text-amber-100/80">{t.message}</span>}
            </div>
          </div>

          <button
            onClick={() => onDismiss(t.id)}
            className="text-amber-400/60 hover:text-amber-200 p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
