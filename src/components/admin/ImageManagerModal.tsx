import React, { useState } from 'react';
import { X, Upload, Link2, Image as ImageIcon, Sparkles, Check, Copy, ExternalLink, HelpCircle } from 'lucide-react';

interface ImageManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectImage: (imageUrl: string) => void;
  currentImageUrl?: string;
  title?: string;
}

export const ImageManagerModal: React.FC<ImageManagerModalProps> = ({
  isOpen,
  onClose,
  onSelectImage,
  currentImageUrl = '',
  title = 'Image & Photo Manager',
}) => {
  const [activeTab, setActiveTab] = useState<'drive' | 'local' | 'presets'>('drive');
  const [driveInputUrl, setDriveInputUrl] = useState('');
  const [convertedUrl, setConvertedUrl] = useState('');
  const [conversionError, setConversionError] = useState('');
  const [copied, setCopied] = useState(false);
  const [localPreview, setLocalPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  if (!isOpen) return null;

  // Extract Google Drive File ID and convert to direct image URL
  const convertGoogleDriveUrl = (input: string): string | null => {
    if (!input.trim()) return null;

    let fileId: string | null = null;

    // Pattern 1: https://drive.google.com/file/d/{FILE_ID}/view...
    const match1 = input.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (match1 && match1[1]) {
      fileId = match1[1];
    }

    // Pattern 2: id={FILE_ID} in query string
    if (!fileId) {
      const match2 = input.match(/[?&]id=([a-zA-Z0-9_-]+)/);
      if (match2 && match2[1]) {
        fileId = match2[1];
      }
    }

    // Pattern 3: https://drive.google.com/open?id={FILE_ID}
    if (!fileId) {
      const match3 = input.match(/\/open\?id=([a-zA-Z0-9_-]+)/);
      if (match3 && match3[1]) {
        fileId = match3[1];
      }
    }

    // Pattern 4: Raw file ID entered directly
    if (!fileId && /^[a-zA-Z0-9_-]{25,}$/.test(input.trim())) {
      fileId = input.trim();
    }

    if (fileId) {
      // Return high-speed Google User Content direct embed link
      return `https://lh3.googleusercontent.com/d/${fileId}`;
    }

    // If it's already a direct web image URL (http/https), return as is
    if (input.startsWith('http://') || input.startsWith('https://')) {
      return input.trim();
    }

    return null;
  };

  const handleDriveConvert = () => {
    setConversionError('');
    const converted = convertGoogleDriveUrl(driveInputUrl);
    if (converted) {
      setConvertedUrl(converted);
    } else {
      setConversionError('Could not find a valid Google Drive file ID. Please ensure the link is a public Google Drive sharing link.');
    }
  };

  const handleApplyDriveUrl = () => {
    if (convertedUrl) {
      onSelectImage(convertedUrl);
      onClose();
    }
  };

  // Local File Upload with Auto Resize & Compression to Base64
  const handleLocalFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (JPEG, PNG, WebP).');
      return;
    }

    setUploading(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Resize large images if width > 1600 to preserve local storage memory
        const maxWidth = 1600;
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
          setLocalPreview(compressedDataUrl);
        } else {
          setLocalPreview(event.target?.result as string);
        }
        setUploading(false);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleApplyLocalImage = () => {
    if (localPreview) {
      onSelectImage(localPreview);
      onClose();
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Curated Tamil Nadu Wedding Stock Library
  const presetPhotos = [
    {
      title: 'South Indian Bride (Kanchipuram Silk)',
      category: 'Bride',
      url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1200&auto=format&fit=crop',
    },
    {
      title: 'South Indian Groom & Bride Couple',
      category: 'Couple',
      url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1200&auto=format&fit=crop',
    },
    {
      title: 'Sacred Garlands & Turmeric Nalangu',
      category: 'Ceremonies',
      url: 'https://images.unsplash.com/photo-1617059063772-34532796cdb5?q=80&w=1200&auto=format&fit=crop',
    },
    {
      title: 'Traditional Thaali & Sacred Agni',
      category: 'Muhurtham',
      url: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?q=80&w=1200&auto=format&fit=crop',
    },
    {
      title: 'Madurai Malli Jasmine & Temple Jewelry',
      category: 'Tradition',
      url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop',
    },
    {
      title: 'Royal Mandapam & Grand Palace Venue',
      category: 'Venue',
      url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200&auto=format&fit=crop',
    },
    {
      title: 'Traditional Banana Leaf Kalyana Virundhu',
      category: 'Feast',
      url: 'https://images.unsplash.com/photo-1613292443284-8d10ef9383fe?q=80&w=1200&auto=format&fit=crop',
    },
    {
      title: 'Sunset Beach & Outdoor Romantic Shoot',
      category: 'Pre-Wedding',
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl rounded-3xl bg-[#1C060C] border border-amber-500/40 shadow-2xl shadow-black/80 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-amber-500/20 bg-[#25070F] flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
              <ImageIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-amber-100">{title}</h3>
              <p className="text-[11px] text-amber-300/70 font-light">
                Add photos via Google Drive links, local device upload, or curated South Indian presets.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-amber-300/70 hover:text-white hover:bg-amber-500/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-amber-500/20 bg-black/30 px-6 pt-3 gap-2">
          <button
            onClick={() => setActiveTab('drive')}
            className={`pb-3 px-4 text-xs font-serif font-bold flex items-center space-x-2 border-b-2 transition-colors ${
              activeTab === 'drive'
                ? 'border-amber-400 text-amber-200'
                : 'border-transparent text-amber-200/60 hover:text-amber-200'
            }`}
          >
            <Link2 className="w-4 h-4 text-amber-400" />
            <span>Google Drive Link</span>
          </button>

          <button
            onClick={() => setActiveTab('local')}
            className={`pb-3 px-4 text-xs font-serif font-bold flex items-center space-x-2 border-b-2 transition-colors ${
              activeTab === 'local'
                ? 'border-amber-400 text-amber-200'
                : 'border-transparent text-amber-200/60 hover:text-amber-200'
            }`}
          >
            <Upload className="w-4 h-4 text-amber-400" />
            <span>Upload From PC / Mobile</span>
          </button>

          <button
            onClick={() => setActiveTab('presets')}
            className={`pb-3 px-4 text-xs font-serif font-bold flex items-center space-x-2 border-b-2 transition-colors ${
              activeTab === 'presets'
                ? 'border-amber-400 text-amber-200'
                : 'border-transparent text-amber-200/60 hover:text-amber-200'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Tamil Nadu Presets</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* TAB 1: GOOGLE DRIVE LINK CONVERTER */}
          {activeTab === 'drive' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-black/40 border border-amber-500/20 space-y-2">
                <label className="block text-xs font-serif font-bold text-amber-200">
                  Paste Google Drive Shareable Link:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="https://drive.google.com/file/d/1A2B3C4D5E.../view?usp=sharing"
                    value={driveInputUrl}
                    onChange={(e) => setDriveInputUrl(e.target.value)}
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-black/60 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400 font-mono"
                  />
                  <button
                    onClick={handleDriveConvert}
                    className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-maroon-950 font-serif font-bold text-xs uppercase tracking-wider transition-transform active:scale-95 shadow"
                  >
                    Convert Link
                  </button>
                </div>

                {conversionError && (
                  <p className="text-xs text-rose-300 bg-rose-950/40 p-2 rounded-lg border border-rose-500/30">
                    {conversionError}
                  </p>
                )}
              </div>

              {/* Converted Direct Link & Live Preview */}
              {convertedUrl && (
                <div className="p-4 rounded-2xl bg-black/50 border border-amber-400/40 space-y-3 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-serif font-bold text-amber-300 flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-400" />
                      Direct Embeddable Link Generated!
                    </span>
                    <button
                      onClick={() => copyToClipboard(convertedUrl)}
                      className="text-[11px] text-amber-300 hover:text-white flex items-center gap-1 bg-amber-950/60 px-2 py-1 rounded border border-amber-500/30"
                    >
                      {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copied ? 'Copied' : 'Copy URL'}</span>
                    </button>
                  </div>

                  <p className="text-[11px] font-mono text-amber-100/70 truncate bg-black/70 p-2 rounded-lg border border-amber-500/20">
                    {convertedUrl}
                  </p>

                  <div className="relative h-44 rounded-xl overflow-hidden border border-amber-500/30 bg-black/60">
                    <img
                      src={convertedUrl}
                      alt="Google Drive Preview"
                      className="w-full h-full object-contain"
                      onError={() => {
                        setConversionError('Image failed to load. Please ensure your Google Drive file permission is set to "Anyone with the link can view".');
                      }}
                    />
                  </div>

                  <button
                    onClick={handleApplyDriveUrl}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-maroon-950 font-serif font-bold text-xs uppercase tracking-widest shadow-xl transition-all flex items-center justify-center space-x-2"
                  >
                    <span>Use This Photo in Wedding Invitation</span>
                    <Check className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Instructions Callout */}
              <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/20 text-amber-200/80 text-[11px] space-y-1">
                <p className="font-bold text-amber-300 flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5" />
                  How to make Google Drive photos work:
                </p>
                <ol className="list-decimal list-inside space-y-0.5 text-amber-100/70">
                  <li>In Google Drive, right click the photo &rarr; click <strong>Share</strong>.</li>
                  <li>Under General Access, change to <strong>"Anyone with the link"</strong>.</li>
                  <li>Click <strong>Copy link</strong> and paste it into the box above!</li>
                </ol>
              </div>
            </div>
          )}

          {/* TAB 2: LOCAL DEVICE UPLOAD */}
          {activeTab === 'local' && (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-amber-500/30 hover:border-amber-400/60 rounded-2xl p-6 text-center bg-black/40 transition-colors">
                <input
                  type="file"
                  id="local-file-input"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleLocalFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="local-file-input"
                  className="cursor-pointer flex flex-col items-center justify-center space-y-3"
                >
                  <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="font-serif font-bold text-sm text-amber-200 block">
                      Choose Photo From Your Computer / Phone
                    </span>
                    <span className="text-[11px] text-amber-300/60 font-light mt-0.5 block">
                      Supports JPG, PNG, WebP (Automatically compressed & saved locally)
                    </span>
                  </div>
                </label>
              </div>

              {uploading && (
                <div className="text-center py-4 text-xs font-serif text-amber-300">
                  Processing & optimizing image...
                </div>
              )}

              {localPreview && !uploading && (
                <div className="p-4 rounded-2xl bg-black/50 border border-amber-400/40 space-y-3 animate-fadeIn">
                  <span className="text-xs font-serif font-bold text-amber-300 block">
                    Image Preview:
                  </span>
                  <div className="relative h-44 rounded-xl overflow-hidden border border-amber-500/30 bg-black/60">
                    <img
                      src={localPreview}
                      alt="Local Upload Preview"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <button
                    onClick={handleApplyLocalImage}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-maroon-950 font-serif font-bold text-xs uppercase tracking-widest shadow-xl transition-all flex items-center justify-center space-x-2"
                  >
                    <span>Use This Uploaded Photo</span>
                    <Check className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: CURATED TAMIL NADU PRESETS */}
          {activeTab === 'presets' && (
            <div className="space-y-3">
              <p className="text-xs text-amber-200/80 font-serif">
                Select from authentic South Tamil Nadu high-definition royalty-free photographs:
              </p>

              <div className="grid grid-cols-2 gap-3">
                {presetPhotos.map((preset, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      onSelectImage(preset.url);
                      onClose();
                    }}
                    className="group relative rounded-xl overflow-hidden border border-amber-500/25 hover:border-amber-400 cursor-pointer bg-black/50 transition-all hover:scale-[1.02]"
                  >
                    <div className="h-28 overflow-hidden">
                      <img
                        src={preset.url}
                        alt={preset.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-2.5 bg-[#20050A]">
                      <span className="text-[10px] text-amber-400/70 uppercase tracking-widest font-mono block">
                        {preset.category}
                      </span>
                      <span className="text-xs font-serif font-semibold text-amber-100 line-clamp-1">
                        {preset.title}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-amber-500/20 bg-[#25070F] flex items-center justify-between text-xs">
          <span className="text-amber-300/60 font-light">
            {currentImageUrl ? 'Current image will be updated' : 'Select an image above'}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg border border-amber-500/30 text-amber-200 hover:bg-amber-500/10 font-serif"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
