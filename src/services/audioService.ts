import { MusicTrack } from '../types/wedding';

class AudioService {
  private audio: HTMLAudioElement | null = null;
  private isPlaying: boolean = false;
  private volume: number = 0.6;
  private currentTrackUrl: string = '';
  private audioCtx: AudioContext | null = null;
  private listeners: Set<(playing: boolean, currentUrl?: string) => void> = new Set();

  constructor() {
    // Lazy initialize
  }

  private initAudioContext() {
    if (!this.audioCtx) {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass();
      }
    }
  }

  public initBackgroundMusic(url: string, defaultVolume = 0.6) {
    if (!this.audio) {
      this.audio = new Audio(url);
      this.audio.loop = true;
      this.volume = defaultVolume;
      this.audio.volume = defaultVolume;
      this.currentTrackUrl = url;
    }
  }

  public async playTrack(url: string): Promise<boolean> {
    if (!url) return false;

    if (!this.audio) {
      this.initBackgroundMusic(url, this.volume);
    } else if (this.currentTrackUrl !== url) {
      this.audio.pause();
      this.audio.src = url;
      this.currentTrackUrl = url;
      this.audio.load();
    }

    try {
      if (this.audio) {
        await this.audio.play();
        this.isPlaying = true;
        this.notify();
        return true;
      }
    } catch (err) {
      console.warn('Playback prevented until user interacts:', err);
      this.isPlaying = false;
      this.notify();
    }
    return false;
  }

  public async toggleMusic(url?: string): Promise<boolean> {
    const targetUrl = url || this.currentTrackUrl;
    if (targetUrl && (!this.audio || this.currentTrackUrl !== targetUrl)) {
      return this.playTrack(targetUrl);
    }

    if (!this.audio) return false;

    if (this.isPlaying) {
      this.audio.pause();
      this.isPlaying = false;
    } else {
      try {
        await this.audio.play();
        this.isPlaying = true;
      } catch (err) {
        console.warn('Music play prevented:', err);
        this.isPlaying = false;
      }
    }

    this.notify();
    return this.isPlaying;
  }

  public playTempleBellSound() {
    try {
      this.initAudioContext();
      if (!this.audioCtx) return;
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      const now = this.audioCtx.currentTime;
      // Synthesize realistic harmonic temple bell chime with fundamental and overtone partials
      const frequencies = [587.33, 1174.66, 1760, 2349.32, 3520]; // D5 and bright metallic partials
      const gains = [0.4, 0.25, 0.15, 0.08, 0.04];
      const decays = [3.5, 2.2, 1.8, 1.2, 0.8];

      frequencies.forEach((freq, idx) => {
        if (!this.audioCtx) return;
        const osc = this.audioCtx.createOscillator();
        const gainNode = this.audioCtx.createGain();

        osc.type = idx === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        gainNode.gain.setValueAtTime(gains[idx], now);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + decays[idx]);

        osc.connect(gainNode);
        gainNode.connect(this.audioCtx.destination);

        osc.start(now);
        osc.stop(now + decays[idx]);
      });
    } catch (e) {
      console.warn('Could not synthesize temple bell sound:', e);
    }
  }

  public playCelebrationChime() {
    try {
      this.initAudioContext();
      if (!this.audioCtx) return;
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 arpeggio
      const now = this.audioCtx.currentTime;

      notes.forEach((freq, i) => {
        if (!this.audioCtx) return;
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        const startTime = now + i * 0.08;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.2, startTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 1.2);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(startTime);
        osc.stop(startTime + 1.2);
      });
    } catch (e) {
      console.warn('Could not play celebration chime:', e);
    }
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.audio) {
      this.audio.volume = this.volume;
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getCurrentTrackUrl(): string {
    return this.currentTrackUrl;
  }

  public subscribe(cb: (playing: boolean, currentUrl?: string) => void) {
    this.listeners.add(cb);
    return () => {
      this.listeners.delete(cb);
    };
  }

  private notify() {
    this.listeners.forEach((l) => l(this.isPlaying, this.currentTrackUrl));
  }
}

export const audioService = new AudioService();

