export interface UserPreferences {
  // Age preferences
  ageRange: {
    min: number;
    max: number;
  };
  
  // Location preferences
  location: {
    country: string;
    city?: string;
    maxDistance: number; // in kilometers
  };
  
  // Profile preferences
  interests: string[];
  relationshipType: 'casual' | 'serious' | 'friendship' | 'all';
  genderPreference: 'male' | 'female' | 'non-binary' | 'all';
  
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
  languages: string[];
  religion: string | 'dont_care';
  politicalViews: 'liberal' | 'conservative' | 'moderate' | 'dont_care';
  
  // Privacy settings
  privacy: {
    showOnlineStatus: boolean;
    showLastSeen: boolean;
    allowMessagesFrom: 'matches_only' | 'all_users' | 'friends_only';
  };
}

export interface PreferenceOption {
  value: string;
  label: string;
  icon?: string;
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
  type: 'range' | 'select' | 'multiselect' | 'toggle' | 'text';
  label: string;
  placeholder?: string;
  options?: PreferenceOption[];
  min?: number;
  max?: number;
  step?: number;
  required?: boolean;
}
