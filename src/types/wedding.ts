export interface StoryMilestone {
  id: string;
  year: string;
  title: string;
  description: string;
  image?: string;
  order: number;
  enabled: boolean;
}

export interface WeddingEvent {
  id: string;
  name: string;
  type: string;
  date: string; // YYYY-MM-DD
  startTime: string; // e.g. "07:30 AM"
  endTime: string; // e.g. "09:30 AM"
  venue: string;
  address: string;
  description: string;
  image: string;
  icon: string;
  mapUrl: string;
  calendarEnabled: boolean;
  order: number;
  enabled: boolean;
}

export interface CulturalCeremony {
  id: string;
  name: string;
  tamilName?: string;
  meaning: string;
  description: string;
  auspiciousSignificance: string;
  timeSlot?: string;
  icon: string;
  image: string;
  order: number;
  enabled: boolean;
}

export interface FamilyMember {
  id: string;
  role: string;
  names: string[];
  description?: string;
  side: 'bride' | 'groom';
}

export interface GalleryPhoto {
  id: string;
  src: string;
  title: string;
  caption: string;
  category: 'Our Story' | 'Engagement' | 'Pre-Wedding' | 'Ceremonies' | 'Family';
  featured?: boolean;
  order: number;
  enabled: boolean;
}

export interface AccommodationInfo {
  id: string;
  name: string;
  category: 'Hotel' | 'Airport' | 'Railway' | 'Transit';
  description: string;
  address: string;
  distance: string;
  phone?: string;
  bookingUrl?: string;
  mapUrl?: string;
  image?: string;
  enabled: boolean;
}

export interface ContactPerson {
  id: string;
  name: string;
  role: string;
  phone: string;
  whatsapp: string;
  side: 'Bride Side' | 'Groom Side' | 'Coordinator';
  enabled: boolean;
}

export interface RSVPRecord {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  guestCount: number;
  attending: 'yes' | 'no' | 'maybe';
  mealPreference: 'Vegetarian' | 'Non-Vegetarian' | 'Jain';
  needsTransport: boolean;
  message?: string;
  submittedAt: string;
}

export interface GuestWish {
  id: string;
  name: string;
  relationship?: string;
  message: string;
  date: string;
  likes: number;
  status: 'approved' | 'pending' | 'hidden';
  featured?: boolean;
}

export interface MusicTrack {
  id: string;
  title: string;
  tamilTitle?: string;
  artist: string;
  category: 'Nadaswaram' | 'Carnatic' | 'Devotional' | 'Fusion' | 'Instrumental';
  audioUrl: string;
}

export type DivinePairThemeId =
  | 'meenakshi-sundareswarar'
  | 'murugan-valli-deivanai'
  | 'andal-alagar'
  | 'venkateswara-padmavathi'
  | 'sita-rama'
  | 'custom';

export interface DivinePairConfig {
  id: DivinePairThemeId;
  name: string;
  tamilName: string;
  temple: string;
  tamilTemple: string;
  invocation: string;
  tamilInvocation: string;
  shloka: string;
  tamilShloka: string;
  primaryBgGradient: string;
  accentColor: string;
  symbol: string;
  badgeLabel: string;
  tamilBadgeLabel: string;
  description: string;
  tamilDescription: string;
  image: string;
}

export interface WeddingConfig {
  // Couple Info
  couple: {
    brideFullName: string;
    groomFullName: string;
    brideShortName: string;
    groomShortName: string;
    tamilBrideName?: string;
    tamilGroomName?: string;
    brideParents: string;
    groomParents: string;
    brideOrigin: string;
    groomOrigin: string;
    heroTagline: string;
    heroSubtitle: string;
    tamilTagline?: string;
    tamilSubtitle?: string;
    invitationQuote: string;
    tamilInvitationQuote?: string;
    monogram: string;
    weddingDate: string; // ISO date string "2026-12-12T07:30:00+05:30"
    muhurthamTime: string;
    tamilMuhurthamTime?: string;
    timezone: string;
    heroImage?: string;
    couplePhoto?: string;
  };

  // Venue Info
  venue: {
    name: string;
    tamilName?: string;
    hall: string;
    tamilHall?: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    googleMapsUrl: string;
    directionsUrl: string;
    phone: string;
    parkingInfo: string;
    image: string;
  };

  // Video Section
  video: {
    enabled: boolean;
    title: string;
    subtitle: string;
    description: string;
    embedUrl: string;
    previewImage: string;
    duration: string;
  };

  // Music & Audio
  music: {
    enabled: boolean;
    title: string;
    artist: string;
    audioUrl: string;
    defaultVolume: number;
    playlist: MusicTrack[];
  };

  // Admin Security
  adminPin?: string;

  // Attire & Dress Code
  dressCode: {
    enabled: boolean;
    title: string;
    description: string;
    ladies: string;
    gentlemen: string;
    colorsToEmbrace: string[];
  };

  // Gift & Blessings
  gift: {
    enabled: boolean;
    title: string;
    description: string;
    upiId: string;
    upiName: string;
    bankName: string;
    accountName: string;
    accountNumber: string;
    ifsc: string;
    qrCodeImage?: string;
    note: string;
  };

  // Traditional Lagna Patrikai Card
  invitationCard: {
    enabled: boolean;
    title: string;
    description: string;
    pdfDownloadUrl: string;
    coverImageUrl: string;
  };

  // Social & Share
  social: {
    whatsappMessageTemplate: string;
    shareTitle: string;
    shareDescription: string;
    instagramHashtag: string;
    liveStreamUrl?: string;
  };

  // Theme & Design
  theme: {
    preset:
      | 'royal-maroon'
      | 'ivory-gold'
      | 'temple-green'
      | 'sunset-terracotta'
      | 'chettinad-heritage'
      | 'madurai-meenakshi'
      | 'thanjavur-royal'
      | 'kongu-tradition'
      | 'kanyakumari-dawn';
    divinePair?: DivinePairThemeId;
    customDivinePair?: {
      enabled?: boolean;
      name?: string;
      tamilName?: string;
      invocation?: string;
      tamilInvocation?: string;
      shloka?: string;
      tamilShloka?: string;
      temple?: string;
      tamilTemple?: string;
    };
    centerpieceType?: 'god-portrait' | 'lamp-3d' | 'god-and-lamp';
    customGodImageUrl?: string;
    primaryColor: string;
    secondaryColor: string;
    accentGold: string;
    accentColor?: string;
    bgDark: string;
    bgLight: string;
    fontHeading: string;
    fontBody: string;
    particlesIntensity: 'low' | 'medium' | 'high';
    soundEffectsEnabled: boolean;
    showThoranam?: boolean;
    showKolamBorders?: boolean;
    showDivinePrabhavali?: boolean;
  };

  // Section Ordering & Visibility
  sections: {
    hero: boolean;
    countdown: boolean;
    couple: boolean;
    story: boolean;
    events: boolean;
    ceremonies: boolean;
    family: boolean;
    gallery: boolean;
    video: boolean;
    venue: boolean;
    travel: boolean;
    dressCode: boolean;
    gift: boolean;
    rsvp: boolean;
    wishes: boolean;
    closing: boolean;
  };

  sectionOrder: string[];

  // Dynamic Lists
  storyMilestones: StoryMilestone[];
  events: WeddingEvent[];
  ceremonies: CulturalCeremony[];
  familyMembers: FamilyMember[];
  gallery: GalleryPhoto[];
  accommodations: AccommodationInfo[];
  contacts: ContactPerson[];
}
