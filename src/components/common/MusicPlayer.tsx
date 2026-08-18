import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, Disc, ListMusic, Check, Play, Pause, ChevronUp, ChevronDown } from 'lucide-react';
import { audioService } from '../../services/audioService';
import { languageService } from '../../services/languageService';
import { MusicTrack } from '../../types/wedding';

interface MusicPlayerProps {
  title: string;
  artist: string;
  audioUrl: string;
  playlist?: MusicTrack[];
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  title: defaultTitle,
  artist: defaultArtist,
  audioUrl: defaultAudioUrl,
  playlist: customPlaylist,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [volume, setVolume] = useState(0.6);
  const [currentTrack, setCurrentTrack] = useState({
    title: defaultTitle,
    artist: defaultArtist,
    url: defaultAudioUrl,
  });

  const playlist: MusicTrack[] = customPlaylist || [
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
    },
  ];

  const t = languageService.t();
  const currentLang = languageService.getLanguage();

  useEffect(() => {
    const unsub = audioService.subscribe((playing, currentUrl) => {
      setIsPlaying(playing);
      if (currentUrl) {
        const found = playlist.find((p) => p.audioUrl === currentUrl);
        if (found) {
          setCurrentTrack({
            title: currentLang === 'ta' && found.tamilTitle ? found.tamilTitle : found.title,
            artist: found.artist,
            url: found.audioUrl,
          });
        }
      }
    });
    return () => unsub();
  }, [playlist, currentLang]);

  const handleToggle = () => {
    audioService.toggleMusic(currentTrack.url || defaultAudioUrl);
  };

  const handleSelectSong = (track: MusicTrack) => {
    setCurrentTrack({
      title: currentLang === 'ta' && track.tamilTitle ? track.tamilTitle : track.title,
      artist: track.artist,
      url: track.audioUrl,
    });
    audioService.playTrack(track.audioUrl);
    setShowPlaylist(false);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    audioService.setVolume(v);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Mini Playlist Dropup Modal */}
      {showPlaylist && (
        <div className="mb-3 w-72 sm:w-80 rounded-2xl bg-[#1C060C]/95 backdrop-blur-xl border border-amber-500/40 p-3.5 shadow-2xl shadow-black/80 animate-fadeIn text-left">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-amber-500/20">
            <span className="font-serif text-xs font-bold text-amber-300 flex items-center gap-1.5">
              <Music className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.music.selectTrack}</span>
            </span>
            <button
              onClick={() => setShowPlaylist(false)}
              className="text-[10px] text-amber-300/70 hover:text-white px-1.5 py-0.5 rounded bg-black/40"
            >
              ✕
            </button>
          </div>

          <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
            {playlist.map((item) => {
              const isSelected = currentTrack.url === item.audioUrl;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectSong(item)}
                  className={`w-full p-2 rounded-xl text-left transition-all flex items-center justify-between group ${
                    isSelected
                      ? 'bg-amber-500/20 border border-amber-400/50 text-amber-200'
                      : 'bg-black/30 hover:bg-black/60 border border-transparent text-amber-100/70 hover:text-amber-100'
                  }`}
                >
                  <div className="min-w-0 pr-2">
                    <span className="text-xs font-serif font-bold block truncate">
                      {currentLang === 'ta' && item.tamilTitle ? item.tamilTitle : item.title}
                    </span>
                    <span className="text-[10px] text-amber-400/60 block truncate font-light">
                      {item.artist}
                    </span>
                  </div>

                  <div className="flex-shrink-0">
                    {isSelected ? (
                      <Check className="w-3.5 h-3.5 text-amber-400" />
                    ) : (
                      <Play className="w-3 h-3 text-amber-400/60 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Control Strip & Main Floating Disk Button */}
      <div className="flex items-center">
        {/* Expanded Control Pill */}
        <div
          className={`flex items-center gap-2.5 bg-[#2D060C]/90 backdrop-blur-md border border-amber-500/30 text-amber-100 rounded-full px-3.5 py-2 shadow-2xl transition-all duration-300 ${
            isExpanded || showPlaylist
              ? 'opacity-100 scale-100 mr-2'
              : 'opacity-0 scale-95 pointer-events-none w-0 p-0 overflow-hidden'
          }`}
        >
          <button
            onClick={() => setShowPlaylist(!showPlaylist)}
            className="p-1 rounded-full text-amber-300 hover:bg-amber-500/20 transition-colors"
            title="Tamil Songs Playlist"
          >
            <ListMusic className="w-4 h-4 text-amber-400" />
          </button>

          <div className="flex flex-col max-w-[130px] truncate text-left cursor-pointer" onClick={() => setShowPlaylist(!showPlaylist)}>
            <span className="text-xs font-serif font-bold text-amber-200 truncate">
              {currentTrack.title || defaultTitle}
            </span>
            <span className="text-[10px] text-amber-300/70 truncate">
              {isPlaying ? t.music.playing : t.music.paused}
            </span>
          </div>

          {/* Volume slider */}
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={handleVolumeChange}
            className="w-14 h-1 bg-amber-900/60 rounded-lg appearance-none cursor-pointer accent-amber-400"
            title="Adjust Volume"
          />
        </div>

        {/* Main Floating Disk Button */}
        <button
          onClick={handleToggle}
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => {
            if (!showPlaylist) setIsExpanded(false);
          }}
          className="group relative w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 via-amber-600 to-amber-800 p-0.5 shadow-xl hover:shadow-amber-500/30 transition-transform active:scale-95 flex items-center justify-center cursor-pointer border border-amber-300/40"
          aria-label={isPlaying ? 'Pause Background Music' : 'Play Background Music'}
          title={isPlaying ? 'Pause Music' : 'Play Classical Wedding Music'}
        >
          <div className="w-full h-full rounded-full bg-[#200408] flex items-center justify-center overflow-hidden relative">
            {/* Rotating vinyl / brass ring effect */}
            {isPlaying ? (
              <Disc className="w-6 h-6 text-amber-300 animate-spin-slow" />
            ) : (
              <Music className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
            )}

            {/* Mini Equalizer Bars when playing */}
            {isPlaying && (
              <div className="absolute bottom-1.5 flex items-end gap-[2px] h-3">
                <span className="w-0.5 bg-amber-400 animate-[bounce_0.8s_infinite_100ms] h-2 rounded-full" />
                <span className="w-0.5 bg-amber-300 animate-[bounce_0.8s_infinite_300ms] h-3 rounded-full" />
                <span className="w-0.5 bg-amber-400 animate-[bounce_0.8s_infinite_200ms] h-1.5 rounded-full" />
              </div>
            )}
          </div>

          {/* Notification dot when muted */}
          {!isPlaying && (
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-500 text-[8px] text-maroon-950 font-bold items-center justify-center">
                ♪
              </span>
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

