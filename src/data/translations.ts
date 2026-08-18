export type Language = 'en' | 'ta';

export interface TranslationDictionary {
  nav: {
    story: string;
    ceremonies: string;
    events: string;
    family: string;
    gallery: string;
    venue: string;
    wishes: string;
    rsvp: string;
    editor: string;
    exitEditor: string;
    share: string;
  };
  hero: {
    invocation: string;
    defaultTagline: string;
    defaultSubtitle: string;
    enterStory: string;
    viewPatrikai: string;
    weddingDateLabel: string;
  };
  countdown: {
    title: string;
    subtitle: string;
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
    muhurthamBadge: string;
    addToCalendar: string;
    calendarSuccess: string;
  };
  couple: {
    title: string;
    subtitle: string;
    theBride: string;
    theGroom: string;
    parentsOfBride: string;
    parentsOfGroom: string;
    origin: string;
    auspiciousQuote: string;
  };
  story: {
    title: string;
    subtitle: string;
  };
  ceremonies: {
    title: string;
    subtitle: string;
    spiritualSignificance: string;
    sacredTiming: string;
  };
  events: {
    title: string;
    subtitle: string;
    getDirections: string;
    addToCalendar: string;
  };
  family: {
    title: string;
    subtitle: string;
    brideSide: string;
    groomSide: string;
  };
  gallery: {
    title: string;
    subtitle: string;
    all: string;
    preWedding: string;
    engagement: string;
    ceremonies: string;
    ourStory: string;
    family: string;
  };
  venue: {
    title: string;
    subtitle: string;
    mandapamDetails: string;
    parkingInfo: string;
    openGoogleMaps: string;
    callVenue: string;
  };
  travel: {
    title: string;
    subtitle: string;
    bookStay: string;
    viewMap: string;
  };
  dressCode: {
    title: string;
    subtitle: string;
    ladies: string;
    gentlemen: string;
    auspiciousHues: string;
  };
  gift: {
    title: string;
    subtitle: string;
    scanToBless: string;
    copyUPI: string;
    copied: string;
    bankDetails: string;
    accountNumber: string;
    ifsc: string;
    bank: string;
  };
  rsvp: {
    title: string;
    subtitle: string;
    fullName: string;
    phone: string;
    email: string;
    guestsCount: string;
    attendingStatus: string;
    attendingYes: string;
    attendingNo: string;
    attendingMaybe: string;
    mealPreference: string;
    vegetarian: string;
    nonVegetarian: string;
    jain: string;
    transportNeeded: string;
    transportYes: string;
    transportNo: string;
    message: string;
    submit: string;
    submitting: string;
    submittedSuccess: string;
    submittedMessage: string;
    alreadySubmitted: string;
  };
  wishes: {
    title: string;
    subtitle: string;
    leaveWish: string;
    yourName: string;
    relationship: string;
    yourBlessing: string;
    sendBlessing: string;
    sentSuccess: string;
    recentBlessings: string;
    like: string;
  };
  closing: {
    gratitude: string;
    footerBlessing: string;
    shareBtn: string;
    adminLogin: string;
  };
  music: {
    title: string;
    playing: string;
    paused: string;
    selectTrack: string;
  };
  admin: {
    pinModalTitle: string;
    pinModalDesc: string;
    enterPin: string;
    unlock: string;
    cancel: string;
    incorrectPin: string;
  };
}

export const translations: Record<Language, TranslationDictionary> = {
  en: {
    nav: {
      story: 'Our Story',
      ceremonies: 'Ceremonies',
      events: 'Events',
      family: 'Family',
      gallery: 'Gallery',
      venue: 'Venue',
      wishes: 'Wishes',
      rsvp: 'RSVP',
      editor: 'Admin Editor',
      exitEditor: 'Exit Editor',
      share: 'Share',
    },
    hero: {
      invocation: '॥ ஸ்ரீ கணேசாய நமஹ ॥ சுப விவாஹம் ॥',
      defaultTagline: 'Two Souls, One Divine Journey',
      defaultSubtitle: 'Together with our families, we joyfully invite you to celebrate the sacred union of our hearts',
      enterStory: 'Enter Our Story',
      viewPatrikai: 'View Traditional Patrikai 📜',
      weddingDateLabel: 'Saturday, December 12, 2026',
    },
    countdown: {
      title: 'The Auspicious Countdown',
      subtitle: 'Counting every heartbeat until the sacred Thaali is tied under the divine morning sun.',
      days: 'Days',
      hours: 'Hours',
      minutes: 'Minutes',
      seconds: 'Seconds',
      muhurthamBadge: 'Sacred Muhurtham',
      addToCalendar: 'Add to Calendar',
      calendarSuccess: 'Calendar Event Downloaded!',
    },
    couple: {
      title: 'The Bride & Groom',
      subtitle: 'Two hearts joined by destiny, blessed by elders, stepping into a lifetime of togetherness.',
      theBride: 'The Bride',
      theGroom: 'The Groom',
      parentsOfBride: 'Beloved Parents of the Bride',
      parentsOfGroom: 'Beloved Parents of the Groom',
      origin: 'Native',
      auspiciousQuote: 'Auspicious Wedding Vow',
    },
    story: {
      title: 'Our Journey of Love',
      subtitle: 'From a shared cup of filter coffee to the sacred fire of marriage, here is how our stars aligned.',
    },
    ceremonies: {
      title: 'Traditional Cultural Ceremonies',
      subtitle: 'Discover the profound spiritual meaning behind each ancient Vedic and South Tamil ritual.',
      spiritualSignificance: 'Spiritual Significance',
      sacredTiming: 'Auspicious Muhurtham Slot',
    },
    events: {
      title: 'Wedding Events & Timeline',
      subtitle: 'Join us across all the joyous celebrations, rituals, and feast gatherings.',
      getDirections: 'Get Directions',
      addToCalendar: 'Add to Calendar',
    },
    family: {
      title: 'Elders & Family Blessings',
      subtitle: 'With humble hearts, our families invite you to grace this sacred occasion.',
      brideSide: 'Bride Side',
      groomSide: 'Groom Side',
    },
    gallery: {
      title: 'Moments & Memories',
      subtitle: 'Snapshots of our journey, joyful laughter, and timeless celebrations.',
      all: 'All Moments',
      preWedding: 'Pre-Wedding',
      engagement: 'Engagement',
      ceremonies: 'Ceremonies',
      ourStory: 'Our Story',
      family: 'Family',
    },
    venue: {
      title: 'Wedding Venue & Location',
      subtitle: 'A regal seaside sanctuary where our families gather to celebrate.',
      mandapamDetails: 'Mandapam & Hall Details',
      parkingInfo: 'Valet & Parking',
      openGoogleMaps: 'Open in Google Maps',
      callVenue: 'Call Venue Desk',
    },
    travel: {
      title: 'Travel & Accommodations',
      subtitle: 'Pre-arranged accommodations and transport support for our beloved traveling guests.',
      bookStay: 'Reservation Details',
      viewMap: 'View Map Location',
    },
    dressCode: {
      title: 'Attire & Traditional Dress Code',
      subtitle: 'We invite you to adorn yourself in radiant South Indian silk and traditional finery.',
      ladies: 'For Ladies',
      gentlemen: 'For Gentlemen',
      auspiciousHues: 'Auspicious Colors to Embrace',
    },
    gift: {
      title: 'Blessings & Tokens of Love',
      subtitle: 'Your warm presence and prayers are our greatest blessings. If you wish to gift, you may use the options below.',
      scanToBless: 'Scan & Bless via UPI',
      copyUPI: 'Copy UPI ID',
      copied: 'Copied!',
      bankDetails: 'Direct Bank Transfer Details',
      accountNumber: 'Account No',
      ifsc: 'IFSC Code',
      bank: 'Bank Name',
    },
    rsvp: {
      title: 'RSVP / Confirm Your Attendance',
      subtitle: 'Please let us know if you will be joining us so we can prepare a hearty Kalyana Virundhu feast for you!',
      fullName: 'Your Full Name',
      phone: 'Phone / WhatsApp Number',
      email: 'Email Address (Optional)',
      guestsCount: 'Total Number of Guests Attending',
      attendingStatus: 'Will you be attending?',
      attendingYes: 'Joyfully Attending',
      attendingNo: 'Regretfully Cannot Attend',
      attendingMaybe: 'Tentative / Will Confirm Later',
      mealPreference: 'Traditional Meal Preference',
      vegetarian: 'Traditional South Indian Veg Feast (Banana Leaf)',
      nonVegetarian: 'Non-Vegetarian Banquet',
      jain: 'Jain Vegetarian',
      transportNeeded: 'Do you need airport/station pickup assistance?',
      transportYes: 'Yes, need pickup',
      transportNo: 'No, self-arranged',
      message: 'Warm message or wishes for the couple',
      submit: 'Submit RSVP Confirmation',
      submitting: 'Registering Your RSVP...',
      submittedSuccess: 'RSVP Received with Joy! ❤️',
      submittedMessage: 'We eagerly look forward to welcoming you and your family to our wedding.',
      alreadySubmitted: 'You have already confirmed your RSVP.',
    },
    wishes: {
      title: 'Guest Wishes & Blessings Wall',
      subtitle: 'Shower the newlyweds with your heartfelt words, prayers, and loving blessings.',
      leaveWish: 'Write a Blessing for the Couple',
      yourName: 'Your Name',
      relationship: 'Relationship (e.g. Bride Uncle, College Friend)',
      yourBlessing: 'Your warm wishes & blessings...',
      sendBlessing: 'Post Blessing to Wall',
      sentSuccess: 'Blessing Posted with Love! 🪔',
      recentBlessings: 'Community Blessings',
      like: 'Bless',
    },
    closing: {
      gratitude: 'With Gratitude & Boundless Love',
      footerBlessing: 'May Lord Venkateswara & Goddess Meenakshi bless everyone with joy, prosperity, and everlasting peace.',
      shareBtn: 'Share Invitation',
      adminLogin: 'Admin Mode',
    },
    music: {
      title: 'Classical South Indian Music',
      playing: 'Now Playing',
      paused: 'Music Paused',
      selectTrack: 'Choose Song Track',
    },
    admin: {
      pinModalTitle: 'Organizer Admin Verification',
      pinModalDesc: 'Enter the 4-digit Security PIN to access the Wedding Content Editor & Management Suite.',
      enterPin: 'Enter 4-digit PIN',
      unlock: 'Unlock Editor',
      cancel: 'Cancel',
      incorrectPin: 'Incorrect PIN. Please enter the valid admin passcode.',
    },
  },

  ta: {
    nav: {
      story: 'எங்கள் கதை',
      ceremonies: 'திருமண சடங்குகள்',
      events: 'நிகழ்வுகள்',
      family: 'குடும்பத்தினர்',
      gallery: 'புகைப்படங்கள்',
      venue: 'இருப்பிடம்',
      wishes: 'வாழ்த்துக்கள்',
      rsvp: 'வருகைப் பதிவு',
      editor: 'நிர்வாக பகுதி',
      exitEditor: 'வெளியேறு',
      share: 'பகிர்க',
    },
    hero: {
      invocation: '॥ விநாயகர் துணை ॥ சுபமுகூர்த்த அழைப்பிதழ் ॥',
      defaultTagline: 'இரு மனங்கள் இணையும் மங்களத் திருநாள்',
      defaultSubtitle: 'எங்கள் குடும்பத்தாருடன் இணைந்து, எங்கள் இல்லத் திருமண நன்னாளுக்கு தங்களை அன்புடன் அழைக்கிறோம்',
      enterStory: 'எங்கள் கதை காண்க',
      viewPatrikai: 'மங்களப் பத்திரிகை காண்க 📜',
      weddingDateLabel: 'சனிக்கிழமை, டிசம்பர் 12, 2026',
    },
    countdown: {
      title: 'சுபமுகூர்த்த நல்வேளை',
      subtitle: 'மாங்கல்ய தாரணம் நிகழும் மங்கள நேரத்தை நோக்கிய இனிய நொடிகள்.',
      days: 'நாட்கள்',
      hours: 'மணிநேரம்',
      minutes: 'நிமிடங்கள்',
      seconds: 'நொடிகள்',
      muhurthamBadge: 'சுப முகூர்த்த நேரம்',
      addToCalendar: 'நாட்காட்டியில் சேர்க்க',
      calendarSuccess: 'நாட்காட்டியில் சேர்க்கப்பட்டது!',
    },
    couple: {
      title: 'மணமக்கள்',
      subtitle: 'இறையருளாலும் பெரியோர்களின் ஆசிகளாலும் இல்லற வாழ்வை தொடங்கும் மணமக்கள்.',
      theBride: 'மணமகள்',
      theGroom: 'மணமகன்',
      parentsOfBride: 'மணமகளின் அன்பான பெற்றோர்',
      parentsOfGroom: 'மணமகனின் அன்பான பெற்றோர்',
      origin: 'பூர்வீகம்',
      auspiciousQuote: 'வேத மங்கள உறுதிமொழி',
    },
    story: {
      title: 'எங்கள் இனிய காதல் பயணம்',
      subtitle: 'முதல் சந்திப்பில் தொடங்கி, இல்லறத் திருநாள் வரை தொடரும் எங்கள் வாழ்வின் அழகிய தருணங்கள்.',
    },
    ceremonies: {
      title: 'பாரம்பரிய திருமணச் சடங்குகள்',
      subtitle: 'தென் தமிழகத்தின் தொன்மையான வேத முறைப்படியான மங்களச் சடங்குகளின் தாத்பரியங்கள்.',
      spiritualSignificance: 'ஆன்மீக முக்கியத்துவம்',
      sacredTiming: 'சுபமுகூர்த்த நேரம்',
    },
    events: {
      title: 'திருமண நிகழ்வுகளின் கால அட்டவணை',
      subtitle: 'சுப நிகழ்வுகள் மற்றும் விருந்து உபசரிப்பில் தவறாது கலந்துகொண்டு சிறப்பிக்குமாறு வேண்டுகிறோம்.',
      getDirections: 'வழித்தடம் காண்க',
      addToCalendar: 'நினைவூட்டல் சேர்க்க',
    },
    family: {
      title: 'பெரியோர்கள் மற்றும் குடும்பத்தினர்',
      subtitle: 'தங்கள் வருகையையும் நல்லாசிகளையும் நாடி நிற்கும் இருவீட்டு குடும்பத்தினர்.',
      brideSide: 'மணமகள் வீட்டார்',
      groomSide: 'மணமகன் வீட்டார்',
    },
    gallery: {
      title: 'அழகிய நினைவலைகள்',
      subtitle: 'மகிழ்ச்சியும் நெகிழ்ச்சியும் நிறைந்த எங்கள் புகைப்படங்களின் தொகுப்பு.',
      all: 'அனைத்தும்',
      preWedding: 'திருமணத்திற்கு முன்',
      engagement: 'நிச்சயதார்த்தம்',
      ceremonies: 'சடங்குகள்',
      ourStory: 'எங்கள் கதை',
      family: 'குடும்பம்',
    },
    venue: {
      title: 'திருமண மண்டபம் & முகவரி',
      subtitle: 'கடற்கரை சூழலில் கம்பீரமாக அமையப்பெற்ற திருமண மண்டபத்தின் வழிகாட்டி விவரங்கள்.',
      mandapamDetails: 'மண்டப விவரங்கள்',
      parkingInfo: 'வாகனம் நிறுத்துமிடம்',
      openGoogleMaps: 'கூகுள் மேப்பில் பார்க்க',
      callVenue: 'மண்டப தொடர்பு',
    },
    travel: {
      title: 'பயணம் மற்றும் தங்குமிடம்',
      subtitle: 'தொலைவிலிருந்து வருகை தரும் அன்பான விருந்தினர்களுக்கான தங்கும் விடுதி ஏற்பாடுகள்.',
      bookStay: 'முன்பதிவு விவரங்கள்',
      viewMap: 'மேப்பில் காண்க',
    },
    dressCode: {
      title: 'பாரம்பரிய ஆடை அணிவகுப்பு',
      subtitle: 'பட்டுச் சேலையும் பட்டு வேஷ்டியும் அணிந்து மங்களகரமாக வருகை தந்து சிறப்பிக்குமாறு வேண்டுகிறோம்.',
      ladies: 'பெண்களுக்கு',
      gentlemen: 'ஆண்களுக்கு',
      auspiciousHues: 'மங்களகரமான வண்ணங்கள்',
    },
    gift: {
      title: 'வாழ்த்துக்களும் அன்பளிப்புகளும்',
      subtitle: 'தங்களின் வருகையும் மனமார்ந்த ஆசியுமே எங்களுக்கு ஆகச்சிறந்த பரிசாகும்.',
      scanToBless: 'UPI மூலமாக வாழ்த்த',
      copyUPI: 'UPI முகவரி நகலெடு',
      copied: 'நகலெடுக்கப்பட்டது!',
      bankDetails: 'வங்கி பரிவர்த்தனை விவரங்கள்',
      accountNumber: 'கணக்கு எண்',
      ifsc: 'IFSC குறியீடு',
      bank: 'வங்கி பெயர்',
    },
    rsvp: {
      title: 'வருகைப் பதிவு (RSVP)',
      subtitle: 'தங்கள் வருகையை உறுதிசெய்து பாரம்பரிய தலைவாழை இலை கல்யாண விருந்தை ருசித்து மகிழுங்கள்!',
      fullName: 'தங்கள் முழுப் பெயர்',
      phone: 'தொலைபேசி / வாட்ஸ்அப் எண்',
      email: 'மின்னஞ்சல் (விருப்பப்பட்டால்)',
      guestsCount: 'வருகை தரும் மொத்த விருந்தினர் எண்ணிக்கை',
      attendingStatus: 'தாங்கள் வருகை தருவதை உறுதி செய்யவும்',
      attendingYes: 'மகிழ்ச்சியுடன் கலந்து கொள்கிறோம்',
      attendingNo: 'வருந்துகிறோம், வர இயலவில்லை',
      attendingMaybe: 'விரைவில் உறுதி செய்கிறோம்',
      mealPreference: 'உணவு விருப்பம்',
      vegetarian: 'தென்னிந்திய பாரம்பரிய சைவ தலைவாழை விருந்து',
      nonVegetarian: 'அசைவ விருந்து',
      jain: 'ஜெயின் சைவ உணவு',
      transportNeeded: 'விமான நிலையம் / ரயில் நிலைய போக்குவரத்து உதவி தேவையா?',
      transportYes: 'ஆம், போக்குவரத்து உதவி தேவை',
      transportNo: 'இல்லை, நாங்களே வருகிறோம்',
      message: 'மணமக்களுக்கான தங்களின் அன்பான வாழ்த்துச் செய்தி',
      submit: 'வருகை பதிவை உறுதி செய்க',
      submitting: 'பதிவு செய்யப்படுகிறது...',
      submittedSuccess: 'தங்கள் வருகை பதிவு மகிழ்ச்சியுடன் பெறப்பட்டது! ❤️',
      submittedMessage: 'தங்களையும் தங்கள் குடும்பத்தாரையும் வரவேற்க ஆவலுடன் காத்திருக்கிறோம்.',
      alreadySubmitted: 'தங்கள் வருகைப் பதிவு ஏற்கனவே உறுதி செய்யப்பட்டுள்ளது.',
    },
    wishes: {
      title: 'விருந்தினர் வாழ்த்து மடல்',
      subtitle: 'மணமக்களுக்கு தங்களின் மனமார்ந்த நல்லாசிகளையும் அன்பான வாழ்த்துக்களையும் பகிர்ந்திடுங்கள்.',
      leaveWish: 'மணமக்களுக்கு வாழ்த்து எழுதவும்',
      yourName: 'தங்கள் பெயர்',
      relationship: 'உறவுமுறை (எ.கா. மாமா, தோழன், உறவினர்)',
      yourBlessing: 'தங்களின் அன்பான ஆசிகள்...',
      sendBlessing: 'வாழ்த்தை சமர்ப்பிக்க',
      sentSuccess: 'வாழ்த்து சமர்ப்பிக்கப்பட்டது! 🪔',
      recentBlessings: 'அனைவரின் வாழ்த்துக்கள்',
      like: 'வாழ்த்துகிறேன்',
    },
    closing: {
      gratitude: 'நன்றியுடனும் பேரன்புடனும்',
      footerBlessing: 'திருவேங்கடமுடையானும் அன்னை மீனாட்சியும் அனைவருக்கும் சகல சௌபாக்கியங்களையும் அருள வேண்டுகிறோம்.',
      shareBtn: 'அழைப்பிதழை பகிர்க',
      adminLogin: 'நிர்வாக உள்நுழைவு',
    },
    music: {
      title: 'தென்னிந்திய மங்கள வாத்தியங்கள்',
      playing: 'இசை ஒலிக்கிறது',
      paused: 'இசை நிறுத்தப்பட்டது',
      selectTrack: 'பாடலைத் தேர்ந்தெடுக்கவும்',
    },
    admin: {
      pinModalTitle: 'நிர்வாகி கடவுச்சொல் சரிபார்ப்பு',
      pinModalDesc: 'திருமணத் தரவுகளை மாற்றி அமைக்கும் பகுதிக்குள் செல்ல 4 இலக்க PIN எண்ணை உள்ளிடவும்.',
      enterPin: '4 இலக்க PIN உள்ளிடுக',
      unlock: 'திறக்குக',
      cancel: 'ரத்து செய்',
      incorrectPin: 'தவறான PIN எண். சரியான கடவுச்சொல்லை உள்ளிடவும்.',
    },
  },
};
