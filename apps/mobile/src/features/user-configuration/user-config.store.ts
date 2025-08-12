import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserPreferences } from './types';

interface UserConfigState {
  preferences: UserPreferences;
  isConfigured: boolean;
  lastUpdated: Date | null;
  
  // Actions
  updatePreferences: (updates: Partial<UserPreferences>) => void;
  resetPreferences: () => void;
  setConfigured: (configured: boolean) => void;
  updateLastUpdated: () => void;
}

const defaultPreferences: UserPreferences = {
  ageRange: {
    min: 18,
    max: 35,
  },
  location: {
    country: '',
    city: '',
    maxDistance: 50,
    preferredCountries: [],
  },
  interests: [],
  relationshipType: 'all',
  genderPreference: 'all',
  languages: {
    primary: 'english',
    secondary: [],
    proficiency: 'conversational',
  },
  communicationStyle: 'all',
  responseTime: 'flexible',
  lifestyle: {
    smoking: 'dont_care',
    drinking: 'dont_care',
    exercise: 'dont_care',
    diet: 'dont_care',
  },
  education: 'dont_care',
  career: 'dont_care',
  religion: 'dont_care',
  politicalViews: 'dont_care',
  searchPreferences: {
    ageImportance: 'important',
    locationImportance: 'important',
    allowLongDistance: false,
    maxLongDistance: 100,
    genderImportance: 'important',
    languageImportance: 'somewhat_important',
    requireLanguageMatch: false,
    searchRadius: 'regional',
    matchQuality: 'medium',
    showVerifiedProfiles: true,
    showOnlineUsers: true,
  },
  privacy: {
    showOnlineStatus: true,
    showLastSeen: true,
    allowMessagesFrom: 'matches_only',
    showAge: true,
    showLocation: true,
    showInterests: true,
  },
};

export const useUserConfigStore = create<UserConfigState>()(
  persist(
    (set, get) => ({
      preferences: defaultPreferences,
      isConfigured: false,
      lastUpdated: null,
      
      updatePreferences: (updates) => {
        set((state) => ({
          preferences: { ...state.preferences, ...updates },
          lastUpdated: new Date(),
        }));
      },
      
      resetPreferences: () => {
        set({
          preferences: defaultPreferences,
          isConfigured: false,
          lastUpdated: null,
        });
      },
      
      setConfigured: (configured) => {
        set({ isConfigured: configured });
      },
      
      updateLastUpdated: () => {
        set({ lastUpdated: new Date() });
      },
    }),
    {
      name: 'user-config-storage',
      partialize: (state) => ({
        preferences: state.preferences,
        isConfigured: state.isConfigured,
        lastUpdated: state.lastUpdated,
      }),
    }
  )
);
