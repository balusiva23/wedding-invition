import { WeddingConfig, GuestWish, RSVPRecord } from '../types/wedding';
import { defaultWeddingConfig, initialGuestWishes, initialRSVPRecords } from '../data/defaultWeddingConfig';
import { storageService } from './storageService';

const CONFIG_KEY = 'config_v1';
const DRAFT_CONFIG_KEY = 'draft_config_v1';
const WISHES_KEY = 'wishes_v1';
const RSVP_KEY = 'rsvp_v1';
const LAST_SAVED_KEY = 'last_saved_time';

class WeddingDataService {
  private config: WeddingConfig;
  private draftConfig: WeddingConfig;
  private wishes: GuestWish[];
  private rsvps: RSVPRecord[];
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.config = storageService.get<WeddingConfig>(CONFIG_KEY, defaultWeddingConfig);
    this.draftConfig = storageService.get<WeddingConfig>(DRAFT_CONFIG_KEY, this.config);
    this.wishes = storageService.get<GuestWish[]>(WISHES_KEY, initialGuestWishes);
    this.rsvps = storageService.get<RSVPRecord[]>(RSVP_KEY, initialRSVPRecords);

    // Listen for storage events from other tabs/windows or local dispatch
    window.addEventListener('wedding_data_changed', () => {
      this.reloadFromStorage();
      this.notifyListeners();
    });

    // Check for updated shared wedding-config.json from server
    this.fetchServerConfig();
  }

  private async fetchServerConfig() {
    try {
      const res = await fetch('/wedding-config.json?v=' + Date.now());
      if (res.ok) {
        const data = await res.json();
        if (data.config && data.config.couple) {
          // If localStorage doesn't have custom edits or if we have new data, keep adminPin in sync
          if (data.config.adminPin && (!this.config.adminPin || this.config.adminPin === '2026')) {
            this.config.adminPin = data.config.adminPin;
            this.draftConfig.adminPin = data.config.adminPin;
          }
        }
      }
    } catch {
      // Offline or static file not loaded yet, fallback smoothly to localStorage
    }
  }

  private reloadFromStorage() {
    this.config = storageService.get<WeddingConfig>(CONFIG_KEY, defaultWeddingConfig);
    this.draftConfig = storageService.get<WeddingConfig>(DRAFT_CONFIG_KEY, this.config);
    this.wishes = storageService.get<GuestWish[]>(WISHES_KEY, initialGuestWishes);
    this.rsvps = storageService.get<RSVPRecord[]>(RSVP_KEY, initialRSVPRecords);
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notifyListeners() {
    this.listeners.forEach((l) => l());
  }

  // --- CONFIG ACCESSORS ---
  public getConfig(): WeddingConfig {
    return { ...this.config };
  }

  public getDraftConfig(): WeddingConfig {
    return { ...this.draftConfig };
  }

  public async syncToFileSystem(configToSync: WeddingConfig) {
    try {
      await fetch('/api/save-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          version: '1.0',
          exportedAt: new Date().toISOString(),
          config: configToSync,
          wishes: this.wishes,
          rsvps: this.rsvps,
        }),
      });
    } catch {
      // If deployed in pure static hosting without node dev server, fetch fails silently
    }
  }

  public saveDraft(draft: WeddingConfig): void {
    this.draftConfig = draft;
    storageService.set(DRAFT_CONFIG_KEY, draft);
    storageService.set(LAST_SAVED_KEY, new Date().toISOString());
    this.syncToFileSystem(draft);
    this.notifyListeners();
  }

  public publishConfig(newConfig?: WeddingConfig): void {
    const configToSave = newConfig || this.draftConfig;
    this.config = configToSave;
    this.draftConfig = configToSave;
    storageService.set(CONFIG_KEY, configToSave);
    storageService.set(DRAFT_CONFIG_KEY, configToSave);
    storageService.set(LAST_SAVED_KEY, new Date().toISOString());
    this.syncToFileSystem(configToSave);
    this.notifyListeners();
  }

  public resetToDefault(): void {
    this.config = JSON.parse(JSON.stringify(defaultWeddingConfig));
    this.draftConfig = JSON.parse(JSON.stringify(defaultWeddingConfig));
    storageService.set(CONFIG_KEY, this.config);
    storageService.set(DRAFT_CONFIG_KEY, this.draftConfig);
    this.syncToFileSystem(this.config);
    this.notifyListeners();
  }

  public exportConfigJSON(): string {
    return JSON.stringify(
      {
        version: '1.0',
        exportedAt: new Date().toISOString(),
        config: this.config,
        wishes: this.wishes,
        rsvps: this.rsvps
      },
      null,
      2
    );
  }

  public importConfigJSON(jsonString: string): { success: boolean; error?: string } {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.config && parsed.config.couple) {
        this.config = parsed.config;
        this.draftConfig = parsed.config;
        storageService.set(CONFIG_KEY, this.config);
        storageService.set(DRAFT_CONFIG_KEY, this.draftConfig);
        if (Array.isArray(parsed.wishes)) {
          this.wishes = parsed.wishes;
          storageService.set(WISHES_KEY, this.wishes);
        }
        if (Array.isArray(parsed.rsvps)) {
          this.rsvps = parsed.rsvps;
          storageService.set(RSVP_KEY, this.rsvps);
        }
        this.notifyListeners();
        return { success: true };
      }
      return { success: false, error: 'Invalid wedding config JSON format.' };
    } catch (e) {
      return { success: false, error: (e as Error).message };
    }
  }

  // --- WISHES / BLESSINGS ---
  public getWishes(includeHidden = false): GuestWish[] {
    if (includeHidden) return [...this.wishes];
    return this.wishes.filter((w) => w.status === 'approved');
  }

  public addWish(name: string, message: string, relationship?: string): GuestWish {
    const newWish: GuestWish = {
      id: 'wish-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
      name: name.trim(),
      message: message.trim(),
      relationship: relationship?.trim() || undefined,
      date: new Date().toISOString().split('T')[0],
      likes: 1,
      status: 'approved', // Auto-approved in demo
      featured: false
    };
    this.wishes = [newWish, ...this.wishes];
    storageService.set(WISHES_KEY, this.wishes);
    this.notifyListeners();
    return newWish;
  }

  public likeWish(id: string): void {
    this.wishes = this.wishes.map((w) => (w.id === id ? { ...w, likes: w.likes + 1 } : w));
    storageService.set(WISHES_KEY, this.wishes);
    this.notifyListeners();
  }

  public updateWishStatus(id: string, status: 'approved' | 'pending' | 'hidden'): void {
    this.wishes = this.wishes.map((w) => (w.id === id ? { ...w, status } : w));
    storageService.set(WISHES_KEY, this.wishes);
    this.notifyListeners();
  }

  public toggleWishFeatured(id: string): void {
    this.wishes = this.wishes.map((w) => (w.id === id ? { ...w, featured: !w.featured } : w));
    storageService.set(WISHES_KEY, this.wishes);
    this.notifyListeners();
  }

  public deleteWish(id: string): void {
    this.wishes = this.wishes.filter((w) => w.id !== id);
    storageService.set(WISHES_KEY, this.wishes);
    this.notifyListeners();
  }

  // --- RSVP ---
  public getRSVPs(): RSVPRecord[] {
    return [...this.rsvps];
  }

  public submitRSVP(record: Omit<RSVPRecord, 'id' | 'submittedAt'>): RSVPRecord {
    const newRSVP: RSVPRecord = {
      ...record,
      id: 'rsvp-' + Date.now(),
      submittedAt: new Date().toISOString()
    };
    this.rsvps = [newRSVP, ...this.rsvps];
    storageService.set(RSVP_KEY, this.rsvps);
    this.notifyListeners();
    return newRSVP;
  }

  public deleteRSVP(id: string): void {
    this.rsvps = this.rsvps.filter((r) => r.id !== id);
    storageService.set(RSVP_KEY, this.rsvps);
    this.notifyListeners();
  }
}

export const weddingDataService = new WeddingDataService();
