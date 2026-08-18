import React, { useState } from 'react';
import { WeddingConfig, MusicTrack } from '../../types/wedding';
import { Volume2, Music, Play, Pause, Bell, Sparkles, Check } from 'lucide-react';
import { audioService } from '../../services/audioService';

interface MusicEditorProps {
  config: WeddingConfig;
  onUpdate: (updater: (prev: WeddingConfig) => WeddingConfig) => void;
}

export const MusicEditor: React.FC<MusicEditorProps> = ({ config, onUpdate }) => {
  const { music } = config;
  const [playingPreviewUrl, setPlayingPreviewUrl] = useState<string | null>(null);

  const playlist = music.playlist || [
    {
      id: 'track-1',
      title: 'Mangala Vathiyam (Nadaswaram & Thavil)',
      tamilTitle: 'மங்கள வாத்தியம் (நாதஸ்வரம் & தவில்)',
      artist: 'Traditional Temple Wedding Melodies',
      category: 'Nadaswaram',
      audioUrl: '/audio/track-1-nadaswaram.mp3',
    },
    {
      id: 'track-2',
      title: 'Kalyana Samayal Saadham (Veena Classical)',
      tamilTitle: 'கல்யாண சமையல் சாதம் (வீணை இசை)',
      artist: 'Carnatic Strings Symphony',
      category: 'Carnatic',
      audioUrl: '/audio/track-2-veena.mp3',
    },
    {
      id: 'track-3',
      title: 'Thirukkalyanam & Thaali Muhurtham',
      tamilTitle: 'திருக்கல்யாணம் & மாங்கல்ய தாரணம்',
      artist: 'South Indian Wedding Masters',
      category: 'Devotional',
      audioUrl: '/audio/track-3-thirukkalyanam.mp3',
    },
    {
      id: 'track-4',
      title: 'Sita Kalyana Vaibhogame (Flute & Tambura)',
      tamilTitle: 'சீதா கல்யாண வைபோகமே (புல்லாங்குழல்)',
      artist: 'Carnatic Devotional Harmony',
      category: 'Instrumental',
      audioUrl: '/audio/track-4-flute.mp3',
    },
    {
      id: 'track-5',
      title: 'Carnatic Fusion & Mridangam Delight',
      tamilTitle: 'கர்நாடக இசை சங்கமம் & மிருதங்கம்',
      artist: 'Royal Sangeet Ensemble',
      category: 'Fusion',
      audioUrl: '/audio/track-5-fusion.mp3',
    }
  ];

  const handleChange = (field: keyof typeof music, value: any) => {
    onUpdate((prev) => ({
      ...prev,
      music: {
        ...prev.music,
        [field]: value,
      },
    }));
  };

  const handleSelectTrack = (track: MusicTrack) => {
    onUpdate((prev) => ({
      ...prev,
      music: {
        ...prev.music,
        title: track.title,
        artist: track.artist,
        audioUrl: track.audioUrl,
      },
    }));
    audioService.playTrack(track.audioUrl);
  };

  const handleTogglePreview = (url: string) => {
    if (playingPreviewUrl === url) {
      audioService.toggleMusic();
      setPlayingPreviewUrl(null);
    } else {
      audioService.playTrack(url);
      setPlayingPreviewUrl(url);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-serif font-bold text-amber-200 flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-amber-400" />
            <span>Music & Background Audio Settings</span>
          </h2>
          <p className="text-xs text-amber-100/60 font-light mt-1">
            Configure the authentic South Tamil Nadu Nadaswaram, Veena, or Flute wedding background music.
          </p>
        </div>

        <label className="flex items-center space-x-2 text-xs font-serif text-amber-300 cursor-pointer">
          <input
            type="checkbox"
            checked={music.enabled}
            onChange={(e) => handleChange('enabled', e.target.checked)}
            className="w-4 h-4 accent-amber-500 rounded"
          />
          <span>Enable Background Music</span>
        </label>
      </div>

      {/* Curated Tamil Nadu Wedding Songs Playlist */}
      <div className="p-6 rounded-2xl bg-[#1c050a] border border-amber-500/25 space-y-4">
        <h3 className="text-sm font-serif font-bold text-amber-300 flex items-center gap-2">
          <Music className="w-4 h-4 text-amber-400" />
          <span>Curated Tamil Nadu Wedding Songs & Melodies</span>
        </h3>
        <p className="text-xs text-amber-100/70 font-light">
          Click on any track to preview or set as default wedding background music:
        </p>

        <div className="space-y-2.5">
          {playlist.map((track) => {
            const isCurrent = music.audioUrl === track.audioUrl;
            const isPlayingThis = playingPreviewUrl === track.audioUrl;

            return (
              <div
                key={track.id}
                className={`p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                  isCurrent
                    ? 'border-amber-400 bg-amber-500/15 shadow-lg shadow-amber-500/10 ring-1 ring-amber-400/40'
                    : 'border-amber-500/20 bg-black/40 hover:border-amber-400/50 hover:bg-black/60'
                }`}
              >
                <div className="flex items-center space-x-3 min-w-0">
                  <button
                    onClick={() => handleTogglePreview(track.audioUrl)}
                    className="w-9 h-9 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 hover:scale-105 transition-transform flex-shrink-0"
                    title={isPlayingThis ? 'Pause Preview' : 'Play Preview'}
                  >
                    {isPlayingThis ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                  </button>

                  <div className="min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className="font-serif text-xs font-bold text-amber-100 truncate">
                        {track.title}
                      </span>
                      <span className="text-[9px] px-2 py-0.5 rounded-full bg-black/60 border border-amber-500/30 text-amber-300 uppercase tracking-wider font-mono">
                        {track.category}
                      </span>
                    </div>
                    {track.tamilTitle && (
                      <span className="text-[11px] text-amber-300 font-tamil block truncate">
                        {track.tamilTitle}
                      </span>
                    )}
                    <span className="text-[10px] text-amber-100/60 block truncate">
                      {track.artist}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 flex-shrink-0">
                  {isCurrent ? (
                    <span className="px-3 py-1 rounded-full bg-amber-400 text-maroon-950 text-xs font-serif font-bold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      <span>Active Track</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => handleSelectTrack(track)}
                      className="px-3 py-1.5 rounded-lg border border-amber-500/30 text-amber-200 text-xs font-serif hover:bg-amber-500/20 transition-colors"
                    >
                      Set As Default
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Manual Configuration & Volume */}
      <div className="p-6 rounded-2xl bg-[#1c050a] border border-amber-500/25 space-y-4">
        <h3 className="text-sm font-serif font-bold text-amber-300">Custom Audio URL & Volume Settings</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-serif text-amber-200 mb-1">Track Title</label>
            <input
              type="text"
              value={music.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-serif text-amber-200 mb-1">Artist / Composer</label>
            <input
              type="text"
              value={music.artist}
              onChange={(e) => handleChange('artist', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-serif text-amber-200 mb-1">Audio Stream / MP3 URL</label>
          <input
            type="text"
            value={music.audioUrl}
            onChange={(e) => handleChange('audioUrl', e.target.value)}
            placeholder="https://example.com/wedding-song.mp3"
            className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400 font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-serif text-amber-200 mb-1">
            Default Volume ({Math.round(music.defaultVolume * 100)}%)
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={music.defaultVolume}
            onChange={(e) => handleChange('defaultVolume', parseFloat(e.target.value))}
            className="w-full h-1 bg-amber-900/60 rounded-lg appearance-none cursor-pointer accent-amber-400"
          />
        </div>

        {/* Sound Effects Test */}
        <div className="pt-2 flex items-center gap-3">
          <button
            onClick={() => audioService.playTempleBellSound()}
            className="px-3 py-2 rounded-xl bg-black/40 border border-amber-500/20 text-amber-300 text-xs font-serif flex items-center space-x-1.5 hover:bg-amber-500/10"
          >
            <Bell className="w-3.5 h-3.5 text-amber-400" />
            <span>Test Temple Bell Chime</span>
          </button>

          <button
            onClick={() => audioService.playCelebrationChime()}
            className="px-3 py-2 rounded-xl bg-black/40 border border-amber-500/20 text-amber-300 text-xs font-serif flex items-center space-x-1.5 hover:bg-amber-500/10"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Test Celebration Chime</span>
          </button>
        </div>
      </div>
    </div>
  );
};

