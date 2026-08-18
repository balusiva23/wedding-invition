import React, { useState } from 'react';
import { WeddingConfig, GalleryPhoto } from '../../types/wedding';
import { Camera, Plus, Trash2, Eye, EyeOff, Image as ImageIcon, Link2 } from 'lucide-react';
import { ImageManagerModal } from './ImageManagerModal';

interface GalleryEditorProps {
  config: WeddingConfig;
  onUpdate: (updater: (prev: WeddingConfig) => WeddingConfig) => void;
}

export const GalleryEditor: React.FC<GalleryEditorProps> = ({ config, onUpdate }) => {
  const { gallery } = config;
  const [activeImageModalTargetId, setActiveImageModalTargetId] = useState<string | null>(null);

  const handleAdd = () => {
    const newP: GalleryPhoto = {
      id: 'g-' + Date.now(),
      src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1200&auto=format&fit=crop',
      title: 'New Memory',
      caption: 'A cherished moment...',
      category: 'Pre-Wedding',
      featured: false,
      order: gallery.length + 1,
      enabled: true,
    };
    onUpdate((prev) => ({
      ...prev,
      gallery: [...prev.gallery, newP],
    }));
  };

  const handleUpdate = (id: string, field: keyof GalleryPhoto, value: any) => {
    onUpdate((prev) => ({
      ...prev,
      gallery: prev.gallery.map((g) => (g.id === id ? { ...g, [field]: value } : g)),
    }));
  };

  const handleDelete = (id: string) => {
    onUpdate((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((g) => g.id !== id),
    }));
  };

  const handleApplyImage = (url: string) => {
    if (activeImageModalTargetId) {
      handleUpdate(activeImageModalTargetId, 'src', url);
      setActiveImageModalTargetId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-serif font-bold text-amber-200 flex items-center gap-2">
            <Camera className="w-5 h-5 text-amber-400" />
            <span>Photo Gallery Management</span>
          </h2>
          <p className="text-xs text-amber-100/60 font-light mt-1">
            Upload, categorize, or replace photos shown in the interactive gallery.
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="px-4 py-2 rounded-full bg-amber-500 hover:bg-amber-400 text-maroon-950 font-serif font-bold text-xs uppercase tracking-wider flex items-center space-x-1.5 shadow"
        >
          <Plus className="w-4 h-4" />
          <span>Add Photo</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {gallery.map((photo) => (
          <div
            key={photo.id}
            className="p-4 rounded-2xl bg-[#1c050a] border border-amber-500/25 space-y-3"
          >
            <div className="relative h-40 rounded-xl overflow-hidden border border-amber-500/20">
              <img
                src={photo.src}
                alt={photo.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 flex items-center space-x-1 bg-black/70 rounded-lg p-1">
                <button
                  onClick={() => handleUpdate(photo.id, 'enabled', !photo.enabled)}
                  className="p-1 text-amber-300 hover:text-white"
                >
                  {photo.enabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5 text-rose-400" />}
                </button>
                <button
                  onClick={() => handleDelete(photo.id)}
                  className="p-1 text-rose-400 hover:text-rose-200"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[11px] font-serif text-amber-200">Image URL / Storage</label>
                <button
                  onClick={() => setActiveImageModalTargetId(photo.id)}
                  className="px-2.5 py-1 rounded bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-[11px] text-amber-300 font-serif flex items-center space-x-1 transition-colors"
                >
                  <Link2 className="w-3 h-3 text-amber-400" />
                  <span>Google Drive / Upload</span>
                </button>
              </div>
              <input
                type="text"
                value={photo.src}
                onChange={(e) => handleUpdate(photo.id, 'src', e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-black/50 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400 font-mono"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-serif text-amber-200 mb-0.5">Title</label>
                <input
                  type="text"
                  value={photo.title}
                  onChange={(e) => handleUpdate(photo.id, 'title', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-black/50 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-serif text-amber-200 mb-0.5">Category</label>
                <select
                  value={photo.category}
                  onChange={(e) => handleUpdate(photo.id, 'category', e.target.value as any)}
                  className="w-full px-3 py-1.5 rounded-lg bg-black/50 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400"
                >
                  <option value="Pre-Wedding" className="bg-maroon-950">Pre-Wedding</option>
                  <option value="Engagement" className="bg-maroon-950">Engagement</option>
                  <option value="Ceremonies" className="bg-maroon-950">Ceremonies</option>
                  <option value="Our Story" className="bg-maroon-950">Our Story</option>
                  <option value="Family" className="bg-maroon-950">Family</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-serif text-amber-200 mb-0.5">Caption</label>
              <input
                type="text"
                value={photo.caption}
                onChange={(e) => handleUpdate(photo.id, 'caption', e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-black/50 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Image Manager Modal */}
      {activeImageModalTargetId && (
        <ImageManagerModal
          isOpen={true}
          onClose={() => setActiveImageModalTargetId(null)}
          onSelectImage={handleApplyImage}
          currentImageUrl={gallery.find((p) => p.id === activeImageModalTargetId)?.src}
          title="Select Photo (Google Drive / Upload / Stock)"
        />
      )}
    </div>
  );
};
