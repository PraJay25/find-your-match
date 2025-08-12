export interface UserPreferences {
  // Enhanced Age preferences
  ageRange: {
    min: number;
    max: number;
  };
  
  // Enhanced Location preferences
  location: {
    country: string;
    city?: string;
    maxDistance: number; // in kilometers
    preferredCountries?: string[]; // Multiple country preferences
  };
  
  // Enhanced Profile preferences
  interests: string[];
  relationshipType: 'casual' | 'serious' | 'friendship' | 'all';
  genderPreference: 'male' | 'female' | 'non-binary' | 'transgender' | 'all';
  
  // Enhanced Language preferences
  languages: {
    primary: string;
    secondary: string[];
    proficiency: 'basic' | 'conversational' | 'fluent' | 'native';
  };
  
  // Communication preferences
  communicationStyle: 'text' | 'voice' | 'video' | 'all';
  responseTime: 'immediate' | 'within_hour' | 'within_day' | 'flexible';
  
  // Lifestyle preferences
  lifestyle: {
    smoking: 'yes' | 'no' | 'occasionally' | 'dont_care';
    drinking: 'yes' | 'no' | 'occasionally' | 'dont_care';
    exercise: 'daily' | 'weekly' | 'monthly' | 'rarely' | 'dont_care';
    diet: 'vegetarian' | 'vegan' | 'omnivore' | 'dont_care';
  };
  
  // Education and career
  education: 'high_school' | 'bachelors' | 'masters' | 'phd' | 'dont_care';
  career: 'student' | 'employed' | 'self_employed' | 'dont_care';
  
  // Additional preferences
  religion: string | 'dont_care';
  politicalViews: 'liberal' | 'conservative' | 'moderate' | 'dont_care';
  
  // Enhanced Search Configuration
  searchPreferences: {
    // Age-specific search
    ageImportance: 'very_important' | 'important' | 'somewhat_important' | 'not_important';
    
    // Location-specific search
    locationImportance: 'very_important' | 'important' | 'somewhat_important' | 'not_important';
    allowLongDistance: boolean;
    maxLongDistance: number; // for long distance relationships
    
    // Gender-specific search
    genderImportance: 'very_important' | 'important' | 'somewhat_important' | 'not_important';
    
    // Language-specific search
    languageImportance: 'very_important' | 'important' | 'somewhat_important' | 'not_important';
    requireLanguageMatch: boolean;
    
    // Advanced search options
    searchRadius: 'local' | 'regional' | 'national' | 'international';
    matchQuality: 'high' | 'medium' | 'low';
    showVerifiedProfiles: boolean;
    showOnlineUsers: boolean;
  };
  
  // Privacy settings
  privacy: {
    showOnlineStatus: boolean;
    showLastSeen: boolean;
    allowMessagesFrom: 'matches_only' | 'all_users' | 'friends_only';
    showAge: boolean;
    showLocation: boolean;
    showInterests: boolean;
  };
}

export interface PreferenceOption {
  value: string;
  label: string;
  icon?: string;
  description?: string;
}

export interface PreferenceSection {
  id: string;
  title: string;
  description: string;
  icon: string;
  fields: PreferenceField[];
}

export interface PreferenceField {
  id: keyof UserPreferences;
  type: 'range' | 'select' | 'multiselect' | 'toggle' | 'text' | 'slider' | 'importance';
  label: string;
  placeholder?: string;
  options?: PreferenceOption[];
  min?: number;
  max?: number;
  step?: number;
  required?: boolean;
  description?: string;
  subFields?: PreferenceField[]; // For nested fields like languages
}
