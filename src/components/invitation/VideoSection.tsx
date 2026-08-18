import React, { useState } from 'react';
import { WeddingConfig } from '../../types/wedding';
import { KolamDivider } from '../common/KolamDivider';
import { Play, Film, X } from 'lucide-react';

export const VideoSection: React.FC<{ video: WeddingConfig['video'] }> = ({ video }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  if (!video.enabled) return null;

  return (
    <section id="video" className="relative py-24 px-4 bg-[#120508] overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center space-x-2 text-amber-400 mb-2">
          <Film className="w-4 h-4" />
          <span className="font-serif text-xs uppercase tracking-[0.25em] font-semibold">
            Cinematic Highlights
          </span>
          <Film className="w-4 h-4" />
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-amber-100 mb-3">
          {video.title}
        </h2>

        <p className="text-xs sm:text-sm text-amber-100/70 max-w-lg mx-auto font-light leading-relaxed mb-10">
          {video.description}
        </p>

        {/* Video Card with Play Button */}
        <div
          onClick={() => setIsPlaying(true)}
          className="group relative h-64 sm:h-96 rounded-3xl overflow-hidden cursor-pointer border-2 border-amber-500/30 shadow-2xl shadow-black/80 hover:border-amber-400 transition-all"
        >
          <img
            src={video.previewImage}
            alt={video.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />

          <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors flex items-center justify-center" />

          {/* Glowing Play Circle */}
          <div className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 p-1 shadow-[0_0_30px_rgba(212,175,55,0.6)] group-hover:scale-110 transition-transform">
            <div className="w-full h-full rounded-full bg-maroon-950 flex items-center justify-center text-amber-300">
              <Play className="w-8 h-8 ml-1 fill-amber-300" />
            </div>
          </div>

          <span className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-amber-200 text-xs font-serif border border-amber-500/30">
            Duration: {video.duration}
          </span>
        </div>

        <KolamDivider className="mt-12" />
      </div>

      {/* Video Modal */}
      {isPlaying && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl rounded-2xl overflow-hidden border border-amber-400/50 bg-black aspect-video shadow-2xl">
            <button
              onClick={() => setIsPlaying(false)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-amber-300 hover:bg-white/20"
            >
              <X className="w-6 h-6" />
            </button>
            <iframe
              src={video.embedUrl}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      )}
    </section>
  );
};
