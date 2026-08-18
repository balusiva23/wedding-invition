import React, { useState, useEffect } from 'react';
import { GalleryPhoto } from '../../types/wedding';
import { KolamDivider } from '../common/KolamDivider';
import { Camera, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { languageService } from '../../services/languageService';

export const GallerySection: React.FC<{ gallery: GalleryPhoto[] }> = ({ gallery }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const [, setLangState] = useState(languageService.getLanguage());

  useEffect(() => {
    const unsub = languageService.subscribe((l) => setLangState(l));
    return () => unsub();
  }, []);

  const t = languageService.t();

  const categories = ['All', 'Pre-Wedding', 'Engagement', 'Ceremonies', 'Family', 'Our Story'];

  const filteredPhotos = gallery.filter((item) => {
    if (!item.enabled) return false;
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  const openLightbox = (index: number) => {
    setActivePhotoIndex(index);
  };

  const closeLightbox = () => {
    setActivePhotoIndex(null);
  };

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex + 1) % filteredPhotos.length);
    }
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIndex !== null) {
      setActivePhotoIndex(
        (activePhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length
      );
    }
  };

  return (
    <section id="gallery" className="relative py-24 px-4 bg-[#180509] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 text-amber-400 mb-2">
            <Camera className="w-4 h-4" />
            <span className="font-serif text-xs uppercase tracking-[0.25em] font-semibold">
              {t.gallery.title}
            </span>
            <Camera className="w-4 h-4" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-amber-100 mb-3">
            {t.gallery.title}
          </h2>

          <p className="text-xs sm:text-sm text-amber-100/70 max-w-md mx-auto font-light leading-relaxed">
            {t.gallery.subtitle}
          </p>

          <KolamDivider className="my-6" />

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-serif uppercase tracking-wider transition-all ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-maroon-950 font-bold shadow-lg shadow-amber-500/20'
                    : 'bg-maroon-950/60 border border-amber-500/20 text-amber-200/80 hover:border-amber-400/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo, idx) => (
            <div
              key={photo.id}
              onClick={() => openLightbox(idx)}
              className="group relative h-72 sm:h-80 rounded-3xl overflow-hidden cursor-pointer border border-amber-500/20 shadow-xl bg-black/40"
            >
              <img
                src={photo.src}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                loading="lazy"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-75 group-hover:opacity-90 transition-opacity" />

              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 backdrop-blur-md border border-amber-400/40 flex items-center justify-center text-amber-300 opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>

              <div className="absolute bottom-0 inset-x-0 p-5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                <span className="text-[10px] font-serif uppercase tracking-widest text-amber-400 block mb-1">
                  {photo.category}
                </span>
                <h3 className="font-serif text-lg font-bold text-amber-100 mb-1">
                  {photo.title}
                </h3>
                <p className="text-xs text-amber-200/70 font-light line-clamp-2">
                  {photo.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhotoIndex !== null && filteredPhotos[activePhotoIndex] && (
        <div
          onClick={closeLightbox}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex items-center justify-center p-4 select-none animate-fadeIn"
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-3 rounded-full text-amber-200 hover:bg-white/10 z-10 transition-colors"
          >
            <X className="w-7 h-7" />
          </button>

          {/* Previous Button */}
          <button
            onClick={prevPhoto}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 border border-amber-400/40 text-amber-300 hover:bg-amber-500 hover:text-maroon-950 transition-all z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Lightbox Content */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl max-h-[85vh] flex flex-col items-center text-center"
          >
            <img
              src={filteredPhotos[activePhotoIndex].src}
              alt={filteredPhotos[activePhotoIndex].title}
              className="max-h-[70vh] w-auto max-w-full object-contain rounded-2xl border border-amber-500/30 shadow-2xl shadow-amber-500/10 mb-4"
            />

            <h3 className="font-serif text-xl font-bold text-amber-100">
              {filteredPhotos[activePhotoIndex].title}
            </h3>
            <p className="text-xs sm:text-sm text-amber-200/80 max-w-md font-light mt-1">
              {filteredPhotos[activePhotoIndex].caption}
            </p>
          </div>

          {/* Next Button */}
          <button
            onClick={nextPhoto}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 border border-amber-400/40 text-amber-300 hover:bg-amber-500 hover:text-maroon-950 transition-all z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </section>
  );
};
