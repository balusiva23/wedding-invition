import React, { useState } from 'react';
import { WeddingConfig } from '../../types/wedding';
import { MapPin, Link2 } from 'lucide-react';
import { ImageManagerModal } from './ImageManagerModal';

interface VenueEditorProps {
  config: WeddingConfig;
  onUpdate: (updater: (prev: WeddingConfig) => WeddingConfig) => void;
}

export const VenueEditor: React.FC<VenueEditorProps> = ({ config, onUpdate }) => {
  const { venue } = config;
  const [showImageModal, setShowImageModal] = useState(false);

  const handleChange = (field: keyof typeof venue, value: string) => {
    onUpdate((prev) => ({
      ...prev,
      venue: {
        ...prev.venue,
        [field]: value,
      },
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-serif font-bold text-amber-200 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-amber-400" />
          <span>Venue & Map Information</span>
        </h2>
        <p className="text-xs text-amber-100/60 font-light mt-1">
          Edit wedding destination details, address, parking, Google Maps links, and venue photos.
        </p>
      </div>

      <div className="p-6 rounded-2xl bg-[#1c050a] border border-amber-500/25 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-serif text-amber-200 mb-1">Venue Main Name (English)</label>
            <input
              type="text"
              value={venue.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-serif text-amber-200 mb-1">Venue Name (தமிழ் / Tamil)</label>
            <input
              type="text"
              value={venue.tamilName || ''}
              placeholder="தி லீலா பேலஸ், சென்னை"
              onChange={(e) => handleChange('tamilName', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400 font-tamil"
            />
          </div>

          <div>
            <label className="block text-xs font-serif text-amber-200 mb-1">Hall / Mandapam Name (English)</label>
            <input
              type="text"
              value={venue.hall}
              onChange={(e) => handleChange('hall', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-serif text-amber-200 mb-1">Hall Name (தமிழ் / Tamil)</label>
            <input
              type="text"
              value={venue.tamilHall || ''}
              placeholder="ராயல் சீ வியூ மண்டபம்"
              onChange={(e) => handleChange('tamilHall', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400 font-tamil"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-serif text-amber-200 mb-1">Street Address</label>
          <input
            type="text"
            value={venue.address}
            onChange={(e) => handleChange('address', e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-serif text-amber-200 mb-1">City</label>
            <input
              type="text"
              value={venue.city}
              onChange={(e) => handleChange('city', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-serif text-amber-200 mb-1">State</label>
            <input
              type="text"
              value={venue.state}
              onChange={(e) => handleChange('state', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-serif text-amber-200 mb-1">Postal Code</label>
            <input
              type="text"
              value={venue.postalCode}
              onChange={(e) => handleChange('postalCode', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-serif text-amber-200 mb-1">Google Maps URL</label>
            <input
              type="text"
              value={venue.googleMapsUrl}
              onChange={(e) => handleChange('googleMapsUrl', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-serif text-amber-200">Venue Image (Google Drive / Upload)</label>
              <button
                onClick={() => setShowImageModal(true)}
                className="px-2.5 py-1 rounded bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-[11px] text-amber-300 font-serif flex items-center space-x-1 transition-colors"
              >
                <Link2 className="w-3 h-3 text-amber-400" />
                <span>Google Drive / Upload</span>
              </button>
            </div>
            <input
              type="text"
              value={venue.image}
              onChange={(e) => handleChange('image', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400 font-mono"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-serif text-amber-200 mb-1">Valet Parking Note</label>
            <input
              type="text"
              value={venue.parkingInfo}
              onChange={(e) => handleChange('parkingInfo', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-serif text-amber-200 mb-1">Venue Helpdesk Phone</label>
            <input
              type="text"
              value={venue.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>
      </div>

      {showImageModal && (
        <ImageManagerModal
          isOpen={true}
          onClose={() => setShowImageModal(false)}
          onSelectImage={(url) => {
            handleChange('image', url);
            setShowImageModal(false);
          }}
          currentImageUrl={venue.image}
          title="Select Venue & Mandapam Photo"
        />
      )}
    </div>
  );
};

