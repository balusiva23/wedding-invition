import { Language, translations, TranslationDictionary } from '../data/translations';

const LANGUAGE_KEY = 'wedding_language_preference';

class LanguageService {
  private currentLanguage: Language = 'ta'; // Default to Tamil for authentic South Tamil Nadu experience, or English based on user selection
  private listeners: Set<(lang: Language) => void> = new Set();

  constructor() {
    try {
      const saved = localStorage.getItem(LANGUAGE_KEY);
      if (saved === 'en' || saved === 'ta') {
        this.currentLanguage = saved;
      }
    } catch (e) {
      // ignore
    }
  }

  public getLanguage(): Language {
    return this.currentLanguage;
  }

  public setLanguage(lang: Language) {
    if (this.currentLanguage === lang) return;
    this.currentLanguage = lang;
    try {
      localStorage.setItem(LANGUAGE_KEY, lang);
    } catch (e) {
      // ignore
    }

    // Update HTML lang attribute and body class for font switching
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
      if (lang === 'ta') {
        document.body.classList.add('lang-ta');
      } else {
        document.body.classList.remove('lang-ta');
      }
    }

    this.notify();
  }

  public toggleLanguage(): Language {
    const nextLang: Language = this.currentLanguage === 'en' ? 'ta' : 'en';
    this.setLanguage(nextLang);
    return nextLang;
  }

  public t(): TranslationDictionary {
    return translations[this.currentLanguage] || translations.en;
  }

  public subscribe(cb: (lang: Language) => void) {
    this.listeners.add(cb);
    return () => {
      this.listeners.delete(cb);
    };
  }

  private notify() {
    this.listeners.forEach((cb) => cb(this.currentLanguage));
  }
}

export const languageService = new LanguageService();
