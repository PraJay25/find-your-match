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
  },
  interests: [],
  relationshipType: 'all',
  genderPreference: 'all',
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
  languages: [],
  religion: 'dont_care',
  politicalViews: 'dont_care',
  privacy: {
    showOnlineStatus: true,
    showLastSeen: true,
    allowMessagesFrom: 'matches_only',
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
