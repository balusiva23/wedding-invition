const STORAGE_PREFIX = 'south_indian_wedding_';

export const storageService = {
  get<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(`${STORAGE_PREFIX}${key}`);
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      console.warn(`Error reading localStorage key ${key}:`, e);
      return defaultValue;
    }
  },

  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(value));
      // Dispatch custom event for cross-component reactive sync
      window.dispatchEvent(new CustomEvent('wedding_data_changed', { detail: { key } }));
    } catch (e) {
      console.error(`Error saving localStorage key ${key}:`, e);
    }
  },

  remove(key: string): void {
    try {
      localStorage.removeItem(`${STORAGE_PREFIX}${key}`);
      window.dispatchEvent(new CustomEvent('wedding_data_changed', { detail: { key } }));
    } catch (e) {
      console.error(`Error removing localStorage key ${key}:`, e);
    }
  },

  clearAll(): void {
    try {
      Object.keys(localStorage)
        .filter((k) => k.startsWith(STORAGE_PREFIX))
        .forEach((k) => localStorage.removeItem(k));
      window.dispatchEvent(new CustomEvent('wedding_data_changed', { detail: { key: 'all' } }));
    } catch (e) {
      console.error('Error clearing wedding localStorage:', e);
    }
  }
};
