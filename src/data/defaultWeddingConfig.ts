import { WeddingConfig, GuestWish, RSVPRecord } from '../types/wedding';

export const defaultWeddingConfig: WeddingConfig = {
  couple: {
    brideFullName: "Ananya Sundaram",
    groomFullName: "Arjun Natarajan",
    brideShortName: "Ananya",
    groomShortName: "Arjun",
    tamilBrideName: "அனன்யா",
    tamilGroomName: "அர்ஜுன்",
    brideParents: "Smt. Jayanthi & Sri. Sundaram Ramachandran",
    groomParents: "Smt. Meenakshi & Sri. Natarajan Krishnaswamy",
    brideOrigin: "Chennai, Tamil Nadu",
    groomOrigin: "Bengaluru, Karnataka",
    heroTagline: "Two Souls, One Divine Journey",
    heroSubtitle: "Together with our families, we joyfully invite you to celebrate the sacred union of our hearts",
    tamilTagline: "இரு மனங்கள் இணையும் மங்களத் திருநாள்",
    tamilSubtitle: "எங்கள் குடும்பத்தாருடன் இணைந்து, எங்கள் இல்லத் திருமண நன்னாளுக்கு தங்களை அன்புடன் அழைக்கிறோம்",
    invitationQuote: "In the presence of Agni, elders, and loved ones, we bind our lives in timeless love, laughter, and lifelong friendship.",
    tamilInvitationQuote: "புனித அக்னி சாட்சியாக, பெரியோர்களின் நல்லாசிகளுடன் அன்பும் பாசமும் நிறைந்த எங்களது புதிய வாழ்வை தொடங்குகிறோம்.",
    monogram: "A ✦ A",
    weddingDate: "2026-12-12T07:30:00+05:30",
    muhurthamTime: "07:30 AM – 09:00 AM (Dhanur Lagnam)",
    tamilMuhurthamTime: "காலை 07:30 – 09:00 மணி (தனுர் லக்னம்)",
    timezone: "Asia/Kolkata",
    heroImage: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1600&auto=format&fit=crop",
    couplePhoto: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1200&auto=format&fit=crop"
  },

  venue: {
    name: "The Leela Palace Chennai",
    tamilName: "தி லீலா பேலஸ், சென்னை",
    hall: "Grand Ballroom & Royal Sea View Mandapam",
    tamilHall: "கிராண்ட் பால்ரூம் & ராயல் சீ வியூ மண்டபம்",
    address: "Adyar Seaface, MRC Nagar, Raja Annamalai Puram",
    city: "Chennai",
    state: "Tamil Nadu",
    postalCode: "600028",
    googleMapsUrl: "https://maps.google.com/?q=The+Leela+Palace+Chennai",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=The+Leela+Palace+Chennai",
    phone: "+91 44 3366 1234",
    parkingInfo: "Complimentary Valet Parking available at Main Porch Entrance.",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200&auto=format&fit=crop"
  },

  video: {
    enabled: true,
    title: "Our Pre-Wedding Cinema",
    subtitle: "From First Coffee in Besant Nagar to Forever",
    description: "A glimpse into our quiet evenings by Marina Beach, shared filter coffee chats, and the moments that turned strangers into soulmates.",
    embedUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=0",
    previewImage: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200&auto=format&fit=crop",
    duration: "3:45 mins"
  },

  music: {
    enabled: true,
    title: "Mangala Vathiyam (Nadaswaram & Thavil)",
    artist: "Auspicious Tamil Wedding Melody",
    audioUrl: "/audio/track-1-nadaswaram.mp3",
    defaultVolume: 0.6,
    playlist: [
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
    ]
  },

  adminPin: '2000',

  dressCode: {
    enabled: true,
    title: "Traditional South Indian Elegance",
    description: "We encourage our beloved guests to dress in vibrant traditional attire to celebrate our rich South Indian heritage.",
    ladies: "Kanchipuram Silk Sarees, Madisar, Pattu Pavadai, or Traditional Lehengas in festive jewel tones.",
    gentlemen: "Pattu Veshti & Shirt / Angavastram, Silk Kurta Pajama, or Traditional Bandhgala.",
    colorsToEmbrace: ["#C59A27", "#8B1E2D", "#1A382B", "#C85A32", "#E8B342"]
  },

  gift: {
    enabled: true,
    title: "Your Presence is Our Greatest Gift",
    description: "Your blessings and warm presence at our wedding are all we ask for. However, if you wish to bless us with a token of love, you may use the options below.",
    upiId: "ananya.arjun@okhdfcbank",
    upiName: "Ananya & Arjun Wedding Fund",
    bankName: "HDFC Bank Ltd",
    accountName: "Arjun Natarajan",
    accountNumber: "50100492819283",
    ifsc: "HDFC0001234",
    note: "All contributions will help fund our dream tree plantation & orphanage school drive in rural Tamil Nadu."
  },

  invitationCard: {
    enabled: true,
    title: "Formal Traditional Patrikai",
    description: "View and save the auspicious printed digital wedding invitation card (Lagna Patrikai)",
    pdfDownloadUrl: "#",
    coverImageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop"
  },

  social: {
    whatsappMessageTemplate: "Vanakkam! You are warmly invited to celebrate the wedding of Ananya & Arjun on December 12, 2026 at The Leela Palace Chennai. Please view our interactive invitation: ",
    shareTitle: "Wedding of Ananya & Arjun ❤️ December 12, 2026",
    shareDescription: "We invite you to be a part of our auspicious wedding ceremonies and celebrations in Chennai.",
    instagramHashtag: "#AnuWedsArjun #A2Forever"
  },

  theme: {
    preset: 'royal-maroon',
    divinePair: 'meenakshi-sundareswarar',
    centerpieceType: 'god-portrait',
    primaryColor: '#7E2230',
    secondaryColor: '#C59A27',
    accentGold: '#D4AF37',
    bgDark: '#120508',
    bgLight: '#FCFBF7',
    fontHeading: 'Cinzel Decorative',
    fontBody: 'Plus Jakarta Sans',
    particlesIntensity: 'medium',
    soundEffectsEnabled: true,
    showThoranam: true,
    showKolamBorders: true,
    showDivinePrabhavali: true
  },

  sections: {
    hero: true,
    countdown: true,
    couple: true,
    story: true,
    events: true,
    ceremonies: true,
    family: true,
    gallery: true,
    video: true,
    venue: true,
    travel: true,
    dressCode: true,
    gift: true,
    rsvp: true,
    wishes: true,
    closing: true
  },

  sectionOrder: [
    'hero',
    'countdown',
    'couple',
    'story',
    'ceremonies',
    'events',
    'family',
    'gallery',
    'video',
    'venue',
    'travel',
    'dressCode',
    'gift',
    'rsvp',
    'wishes',
    'closing'
  ],

  storyMilestones: [
    {
      id: 'm1',
      year: '2020',
      title: 'First Filter Coffee at Marina',
      description: 'A mutual friend introduced us over hot degree coffee and bajji by the breezy Chennai shoreline. What was planned as a 20-minute chat turned into three hours of nonstop laughter.',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop',
      order: 1,
      enabled: true
    },
    {
      id: 'm2',
      year: '2022',
      title: 'Monsoon Road Trips & Temple Trails',
      description: 'From exploring Thanjavur Big Temple at sunset to getting drenched in Kodaikanal rain, we realized that anywhere felt like home as long as we were together.',
      image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=800&auto=format&fit=crop',
      order: 2,
      enabled: true
    },
    {
      id: 'm3',
      year: '2024',
      title: 'The Promise by the Hills',
      description: 'Under a canopy of starlight in Coorg, Arjun pulled out an heirloom ring and asked the easiest question in the world. Ananya said yes before he could even finish.',
      image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=800&auto=format&fit=crop',
      order: 3,
      enabled: true
    },
    {
      id: 'm4',
      year: '2026',
      title: 'Our Forever Muhurtham',
      description: 'With the blessings of our parents, grandparents, and the divine Almighty, we step into the sacred bond of marriage, eager for a lifetime of love.',
      image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800&auto=format&fit=crop',
      order: 4,
      enabled: true
    }
  ],

  events: [
    {
      id: 'ev1',
      name: 'Sumangali Prarthanai & Nalangu',
      type: 'Traditional Rituals',
      date: '2026-12-11',
      startTime: '04:00 PM',
      endTime: '06:30 PM',
      venue: 'The Leela Palace Chennai — Lotus Lawn',
      address: 'Adyar Seaface, MRC Nagar, Chennai',
      description: 'A lively, playful pre-wedding ceremony filled with turmeric blessings, traditional songs, playful games between bride & groom, and familial merriment.',
      image: 'https://images.unsplash.com/photo-1617059063772-34532796cdb5?q=80&w=800&auto=format&fit=crop',
      icon: 'sparkles',
      mapUrl: 'https://maps.google.com/?q=The+Leela+Palace+Chennai',
      calendarEnabled: true,
      order: 1,
      enabled: true
    },
    {
      id: 'ev2',
      name: 'Sangeet & Carnatic Fusion Night',
      type: 'Music & Dance Celebration',
      date: '2026-12-11',
      startTime: '07:00 PM',
      endTime: '11:00 PM',
      venue: 'Grand Ballroom, The Leela Palace Chennai',
      address: 'Adyar Seaface, MRC Nagar, Chennai',
      description: 'An enchanting evening of live Carnatic instrumental fusion, high-energy family dance performances, cocktails, and a grand South Indian royal dinner.',
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop',
      icon: 'music',
      mapUrl: 'https://maps.google.com/?q=The+Leela+Palace+Chennai',
      calendarEnabled: true,
      order: 2,
      enabled: true
    },
    {
      id: 'ev3',
      name: 'Vedic Muhurtham & Mangalyadharanam',
      type: 'Sacred Wedding Ceremony',
      date: '2026-12-12',
      startTime: '07:30 AM',
      endTime: '10:00 AM',
      venue: 'Royal Sea View Mandapam, The Leela Palace Chennai',
      address: 'Adyar Seaface, MRC Nagar, Chennai',
      description: 'The sacred South Indian wedding rituals including Kashi Yatra, Oonjal, Maalai Maatral, tying of the sacred Thaali (Mangalsutra) amidst roaring Nadaswaram, and Sapthapadi.',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop',
      icon: 'heart-handshake',
      mapUrl: 'https://maps.google.com/?q=The+Leela+Palace+Chennai',
      calendarEnabled: true,
      order: 3,
      enabled: true
    },
    {
      id: 'ev4',
      name: 'Traditional Banana Leaf Kalyana Virundhu',
      type: 'Grand Wedding Feast',
      date: '2026-12-12',
      startTime: '11:30 AM',
      endTime: '02:30 PM',
      venue: 'Coromandel Banquet Hall, The Leela Palace',
      address: 'Adyar Seaface, MRC Nagar, Chennai',
      description: 'An authentic 28-dish traditional South Indian feast served on fresh organic banana leaves with fragrant ghee sambar, rasam, payasam, and jalebi.',
      image: 'https://images.unsplash.com/photo-1613292443284-8d10ef9383fe?q=80&w=800&auto=format&fit=crop',
      icon: 'utensils',
      mapUrl: 'https://maps.google.com/?q=The+Leela+Palace+Chennai',
      calendarEnabled: true,
      order: 4,
      enabled: true
    },
    {
      id: 'ev5',
      name: 'Grand Wedding Reception',
      type: 'Evening Gala',
      date: '2026-12-12',
      startTime: '06:30 PM',
      endTime: '11:00 PM',
      venue: 'Royal Sea Palace Lawn, The Leela Palace Chennai',
      address: 'Adyar Seaface, MRC Nagar, Chennai',
      description: 'A magical seaside evening with acoustic violin symphonies, stage blessings, photo opportunities with the newlyweds, and an international gourmet dinner.',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop',
      icon: 'award',
      mapUrl: 'https://maps.google.com/?q=The+Leela+Palace+Chennai',
      calendarEnabled: true,
      order: 5,
      enabled: true
    }
  ],

  ceremonies: [
    {
      id: 'c1',
      name: 'Kashi Yatra',
      tamilName: 'காசி யாத்திரை',
      meaning: 'Journey to Wisdom & Embracing Grihastha',
      description: 'The groom pretends to embark on a pilgrimage to Kashi (spiritual journey). The bride’s father persuades him to return, assuring that a life with his daughter will lead to greater joy and spiritual fulfillment.',
      auspiciousSignificance: 'Symbolizes the conscious choice to enter family life and uphold dharma hand-in-hand.',
      timeSlot: '07:45 AM',
      icon: 'compass',
      image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?q=80&w=800&auto=format&fit=crop',
      order: 1,
      enabled: true
    },
    {
      id: 'c2',
      name: 'Maalai Maatral',
      tamilName: 'மாலை மாற்றல்',
      meaning: 'Exchange of Sacred Floral Garlands',
      description: 'The bride and groom exchange fragrant jasmine, rose, and lotus garlands three times while being lifted onto their maternal uncles’ shoulders in joyful celebration.',
      auspiciousSignificance: 'Signifies the mutual acceptance and uniting of two souls as equal partners.',
      timeSlot: '08:05 AM',
      icon: 'flower',
      image: 'https://images.unsplash.com/photo-1617059063772-34532796cdb5?q=80&w=800&auto=format&fit=crop',
      order: 2,
      enabled: true
    },
    {
      id: 'c3',
      name: 'Oonjal',
      tamilName: 'ஊஞ்சல் வைபவம்',
      meaning: 'The Sacred Swing of Balance',
      description: 'The couple sits on a decorated wooden swing (Oonjal). Married women sing traditional melodies, feeding milk and bananas, while gently rocking them.',
      auspiciousSignificance: 'The swinging motion represents the highs and lows of life, which the couple will face together with steady balance.',
      timeSlot: '08:20 AM',
      icon: 'wind',
      image: 'https://images.unsplash.com/photo-1544078741-7fe023cb4458?q=80&w=800&auto=format&fit=crop',
      order: 3,
      enabled: true
    },
    {
      id: 'c4',
      name: 'Mangalyadharanam (Thaali)',
      tamilName: 'மாங்கல்ய தாரணம்',
      meaning: 'Tying of the Sacred Thaali Knot',
      description: 'The most sacred and emotional moment: the groom ties the golden Thaali (Mangalsutra) around the bride’s neck with three knots to the reverberating beats of the Thavil and sweet melody of Nadaswaram, as guests shower Akshadai (holy turmeric rice).',
      auspiciousSignificance: 'The three knots represent devotion to mind, speech, and action across a lifetime.',
      timeSlot: '08:45 AM (Auspicious Muhurtham)',
      icon: 'sparkles',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop',
      order: 4,
      enabled: true
    },
    {
      id: 'c5',
      name: 'Sapthapadi',
      tamilName: 'சப்தபதி',
      meaning: 'Seven Sacred Steps Around the Holy Fire',
      description: 'Guided by the eternal Agni (fire), the couple takes seven deliberate steps together, each representing a sacred vow of nourishment, strength, prosperity, joy, lineage, harmony, and eternal friendship.',
      auspiciousSignificance: 'Vedic belief states that two people who walk seven steps together become lifelong friends and partners in dharma.',
      timeSlot: '09:15 AM',
      icon: 'flame',
      image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800&auto=format&fit=crop',
      order: 5,
      enabled: true
    }
  ],

  familyMembers: [
    {
      id: 'fam1',
      role: 'Parents of the Bride',
      names: ['Smt. Jayanthi Sundaram', 'Sri. Sundaram Ramachandran'],
      description: 'With humble hearts and overflowing love, welcoming you to bless our beloved daughter.',
      side: 'bride'
    },
    {
      id: 'fam2',
      role: 'Parents of the Groom',
      names: ['Smt. Meenakshi Natarajan', 'Sri. Natarajan Krishnaswamy'],
      description: 'Rejoicing with folded hands as we welcome Ananya into our home as our beloved daughter.',
      side: 'groom'
    },
    {
      id: 'fam3',
      role: 'Beloved Grandparents',
      names: ['Sri. Ramachandran & Smt. Saraswathi', 'Sri. Krishnaswamy & Smt. Kamala'],
      description: 'Whose timeless values, deep traditions, and enduring prayers illuminate our path forward.',
      side: 'bride'
    },
    {
      id: 'fam4',
      role: 'Siblings & Extended Family',
      names: ['Aditya Sundaram (Brother)', 'Divya Natarajan (Sister)', 'Karthik Raman (Brother-in-law)'],
      description: 'Excited partners-in-crime orchestrating the laughter, dance, and joyous festivities.',
      side: 'groom'
    }
  ],

  gallery: [
    {
      id: 'g1',
      src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1200&auto=format&fit=crop',
      title: 'Soulful Gazes',
      caption: 'In the golden hour glow of Mahabalipuram shore temples.',
      category: 'Pre-Wedding',
      featured: true,
      order: 1,
      enabled: true
    },
    {
      id: 'g2',
      src: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1200&auto=format&fit=crop',
      title: 'Silk & Gold Splendor',
      caption: 'Pure Kanchipuram silk woven with heirloom zari borders.',
      category: 'Engagement',
      featured: true,
      order: 2,
      enabled: true
    },
    {
      id: 'g3',
      src: 'https://images.unsplash.com/photo-1617059063772-34532796cdb5?q=80&w=1200&auto=format&fit=crop',
      title: 'Jasmine & Turmeric Hues',
      caption: 'The fragrant scents of Madurai Mallipoo and temple flowers.',
      category: 'Ceremonies',
      featured: false,
      order: 3,
      enabled: true
    },
    {
      id: 'g4',
      src: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
      title: 'Laughter Under Fairy Lights',
      caption: 'Surrounded by music, warmth, and lifelong childhood friends.',
      category: 'Our Story',
      featured: false,
      order: 4,
      enabled: true
    },
    {
      id: 'g5',
      src: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=1200&auto=format&fit=crop',
      title: 'Promise on the Hills',
      caption: 'A quiet sunset overlooking the misty plantations of Coorg.',
      category: 'Pre-Wedding',
      featured: true,
      order: 5,
      enabled: true
    },
    {
      id: 'g6',
      src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200&auto=format&fit=crop',
      title: 'Family Blessings',
      caption: 'Generations coming together in prayer and heartfelt joy.',
      category: 'Family',
      featured: false,
      order: 6,
      enabled: true
    }
  ],

  accommodations: [
    {
      id: 'acc1',
      name: 'The Leela Palace Chennai (Venue Hotel)',
      category: 'Hotel',
      description: 'Exclusive discounted room blocks available for our wedding guests. Please quote "ANANYA-ARJUN WEDDING" during reservations.',
      address: 'Adyar Seaface, MRC Nagar, Chennai',
      distance: '0 km (On-site)',
      phone: '+91 44 3366 1234',
      bookingUrl: 'https://www.theleela.com/the-leela-palace-chennai',
      mapUrl: 'https://maps.google.com/?q=The+Leela+Palace+Chennai',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop',
      enabled: true
    },
    {
      id: 'acc2',
      name: 'Crowne Plaza Chennai Adyar Park',
      category: 'Hotel',
      description: 'Luxury 5-star partner hotel just 5 minutes drive from the mandapam.',
      address: '132 TTK Road, Alwarpet, Chennai',
      distance: '3.5 km from Venue',
      phone: '+91 44 2499 4101',
      bookingUrl: 'https://ihg.com',
      mapUrl: 'https://maps.google.com/?q=Crowne+Plaza+Chennai',
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=800&auto=format&fit=crop',
      enabled: true
    },
    {
      id: 'acc3',
      name: 'Chennai International Airport (MAA)',
      category: 'Airport',
      description: 'Pre-arranged wedding shuttle desk available at Terminal 2 & 4 arrival hall.',
      address: 'GST Road, Meenambakkam, Chennai',
      distance: '14.2 km (approx. 35 mins via Anna Salai)',
      phone: '+91 44 2256 0551',
      mapUrl: 'https://maps.google.com/?q=Chennai+International+Airport',
      enabled: true
    },
    {
      id: 'acc4',
      name: 'Chennai Central Railway Station (MAS)',
      category: 'Railway',
      description: 'Direct metro / pre-booked cab transit directly to MRC Nagar.',
      address: 'Kannappar Thidal, Periyamet, Chennai',
      distance: '9.8 km (approx. 20 mins)',
      phone: '139',
      mapUrl: 'https://maps.google.com/?q=Chennai+Central+Railway+Station',
      enabled: true
    }
  ],

  contacts: [
    {
      id: 'c1',
      name: 'Sri. Sundaram Ramachandran',
      role: 'Bride Father & Hospitality',
      phone: '+91 98401 23456',
      whatsapp: '919840123456',
      side: 'Bride Side',
      enabled: true
    },
    {
      id: 'c2',
      name: 'Sri. Natarajan Krishnaswamy',
      role: 'Groom Father & Ceremonies',
      phone: '+91 98450 67890',
      whatsapp: '919845067890',
      side: 'Groom Side',
      enabled: true
    },
    {
      id: 'c3',
      name: 'Aditya Sundaram & Divya Natarajan',
      role: 'Logistics & Guest Assistance',
      phone: '+91 98840 99887',
      whatsapp: '919884099887',
      side: 'Coordinator',
      enabled: true
    }
  ]
};

export const initialGuestWishes: GuestWish[] = [
    {
      id: 'w1',
      name: 'Uncle Raghu & Aunt Geetha',
      relationship: 'Bride Uncle & Aunt',
      message: 'May Lord Venkateswara shower you both with boundless health, laughter, and everlasting affection. Looking forward to the grand feast!',
      date: '2026-11-20',
      likes: 24,
      status: 'approved',
      featured: true
    },
    {
      id: 'w2',
      name: 'Priya & Vikram Sharma',
      relationship: 'College Friends',
      message: 'From college canteen filter coffee debates to seeing you both tie the sacred knot! We couldn’t be happier for you guys. Get ready for the Sangeet dance floor!',
      date: '2026-11-28',
      likes: 18,
      status: 'approved',
      featured: true
    },
    {
      id: 'w3',
      name: 'Dr. Subramanian & Family',
      relationship: 'Family Friends',
      message: 'Warmest congratulations to Sundaram and Natarajan families. Ananya and Arjun are made for each other. Subhamasthu!',
      date: '2026-12-01',
      likes: 15,
      status: 'approved',
      featured: false
    }
];

export const initialRSVPRecords: RSVPRecord[] = [
  {
    id: 'rsvp-1',
    fullName: 'Venkatraman & Family',
    phone: '+91 98400 11223',
    email: 'venkat.ram@example.com',
    guestCount: 3,
    attending: 'yes',
    mealPreference: 'Vegetarian',
    needsTransport: false,
    message: 'Delighted to attend both the Sangeet and Muhurtham!',
    submittedAt: '2026-11-15T10:30:00Z'
  },
  {
    id: 'rsvp-2',
    fullName: 'Siddharth Rao',
    phone: '+91 99887 66554',
    email: 'sid.rao@example.com',
    guestCount: 2,
    attending: 'yes',
    mealPreference: 'Vegetarian',
    needsTransport: true,
    message: 'Flying in from Singapore on Dec 10. Can’t wait!',
    submittedAt: '2026-11-18T14:15:00Z'
  }
];
