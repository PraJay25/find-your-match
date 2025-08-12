import { PreferenceSection, PreferenceOption } from './types';

export const countries: PreferenceOption[] = [
  { value: 'US', label: 'United States', icon: '🇺🇸' },
  { value: 'CA', label: 'Canada', icon: '🇨🇦' },
  { value: 'GB', label: 'United Kingdom', icon: '🇬🇧' },
  { value: 'AU', label: 'Australia', icon: '🇦🇺' },
  { value: 'DE', label: 'Germany', icon: '🇩🇪' },
  { value: 'FR', label: 'France', icon: '🇫🇷' },
  { value: 'JP', label: 'Japan', icon: '🇯🇵' },
  { value: 'IN', label: 'India', icon: '🇮🇳' },
  { value: 'BR', label: 'Brazil', icon: '🇧🇷' },
  { value: 'MX', label: 'Mexico', icon: '🇲🇽' },
  { value: 'IT', label: 'Italy', icon: '🇮🇹' },
  { value: 'ES', label: 'Spain', icon: '🇪🇸' },
  { value: 'NL', label: 'Netherlands', icon: '🇳🇱' },
  { value: 'SE', label: 'Sweden', icon: '🇸🇪' },
  { value: 'NO', label: 'Norway', icon: '🇳🇴' },
  { value: 'DK', label: 'Denmark', icon: '🇩🇰' },
  { value: 'FI', label: 'Finland', icon: '🇫🇮' },
  { value: 'CH', label: 'Switzerland', icon: '🇨🇭' },
  { value: 'AT', label: 'Austria', icon: '🇦🇹' },
  { value: 'BE', label: 'Belgium', icon: '🇧🇪' },
];

export const interests: PreferenceOption[] = [
  { value: 'travel', label: 'Travel', icon: '✈️' },
  { value: 'music', label: 'Music', icon: '🎵' },
  { value: 'movies', label: 'Movies', icon: '🎬' },
  { value: 'books', label: 'Reading', icon: '📚' },
  { value: 'cooking', label: 'Cooking', icon: '👨‍🍳' },
  { value: 'photography', label: 'Photography', icon: '📸' },
  { value: 'sports', label: 'Sports', icon: '⚽' },
  { value: 'fitness', label: 'Fitness', icon: '💪' },
  { value: 'yoga', label: 'Yoga', icon: '🧘‍♀️' },
  { value: 'dancing', label: 'Dancing', icon: '💃' },
  { value: 'art', label: 'Art', icon: '🎨' },
  { value: 'gaming', label: 'Gaming', icon: '🎮' },
  { value: 'technology', label: 'Technology', icon: '💻' },
  { value: 'nature', label: 'Nature', icon: '🌲' },
  { value: 'animals', label: 'Animals', icon: '🐕' },
  { value: 'coffee', label: 'Coffee', icon: '☕' },
  { value: 'wine', label: 'Wine', icon: '🍷' },
  { value: 'beer', label: 'Beer', icon: '🍺' },
  { value: 'food', label: 'Food', icon: '🍕' },
  { value: 'fashion', label: 'Fashion', icon: '👗' },
  { value: 'cars', label: 'Cars', icon: '🚗' },
  { value: 'bikes', label: 'Bikes', icon: '🚴' },
  { value: 'hiking', label: 'Hiking', icon: '🏔️' },
  { value: 'swimming', label: 'Swimming', icon: '🏊' },
  { value: 'running', label: 'Running', icon: '🏃' },
  { value: 'meditation', label: 'Meditation', icon: '🧘' },
  { value: 'volunteering', label: 'Volunteering', icon: '🤝' },
  { value: 'politics', label: 'Politics', icon: '🗳️' },
  { value: 'science', label: 'Science', icon: '🔬' },
  { value: 'history', label: 'History', icon: '📜' },
  { value: 'languages', label: 'Languages', icon: '🗣️' },
  { value: 'writing', label: 'Writing', icon: '✍️' },
  { value: 'podcasts', label: 'Podcasts', icon: '🎧' },
  { value: 'comedy', label: 'Comedy', icon: '😂' },
  { value: 'theater', label: 'Theater', icon: '🎭' },
  { value: 'museums', label: 'Museums', icon: '🏛️' },
  { value: 'concerts', label: 'Concerts', icon: '🎤' },
  { value: 'festivals', label: 'Festivals', icon: '🎪' },
  { value: 'camping', label: 'Camping', icon: '⛺' },
  { value: 'fishing', label: 'Fishing', icon: '🎣' },
  { value: 'gardening', label: 'Gardening', icon: '🌱' },
  { value: 'diy', label: 'DIY', icon: '🔧' },
  { value: 'collecting', label: 'Collecting', icon: '📦' },
  { value: 'astronomy', label: 'Astronomy', icon: '⭐' },
  { value: 'archaeology', label: 'Archaeology', icon: '🏺' },
];

export const relationshipTypes: PreferenceOption[] = [
  { value: 'casual', label: 'Casual Dating', icon: '💕' },
  { value: 'serious', label: 'Serious Relationship', icon: '💍' },
  { value: 'friendship', label: 'Friendship', icon: '👥' },
  { value: 'all', label: 'Open to All', icon: '🌈' },
];

export const genderPreferences: PreferenceOption[] = [
  { value: 'male', label: 'Men', icon: '👨' },
  { value: 'female', label: 'Women', icon: '👩' },
  { value: 'non-binary', label: 'Non-binary', icon: '⚧' },
  { value: 'all', label: 'All Genders', icon: '🌈' },
];

export const communicationStyles: PreferenceOption[] = [
  { value: 'text', label: 'Text Messages', icon: '💬' },
  { value: 'voice', label: 'Voice Calls', icon: '📞' },
  { value: 'video', label: 'Video Calls', icon: '📹' },
  { value: 'all', label: 'All Methods', icon: '📱' },
];

export const responseTimes: PreferenceOption[] = [
  { value: 'immediate', label: 'Immediate', icon: '⚡' },
  { value: 'within_hour', label: 'Within an Hour', icon: '⏰' },
  { value: 'within_day', label: 'Within a Day', icon: '📅' },
  { value: 'flexible', label: 'Flexible', icon: '🔄' },
];

export const lifestyleOptions: PreferenceOption[] = [
  { value: 'yes', label: 'Yes', icon: '✅' },
  { value: 'no', label: 'No', icon: '❌' },
  { value: 'occasionally', label: 'Occasionally', icon: '🔄' },
  { value: 'dont_care', label: "Don't Care", icon: '🤷' },
];

export const exerciseOptions: PreferenceOption[] = [
  { value: 'daily', label: 'Daily', icon: '💪' },
  { value: 'weekly', label: 'Weekly', icon: '📅' },
  { value: 'monthly', label: 'Monthly', icon: '📆' },
  { value: 'rarely', label: 'Rarely', icon: '😴' },
  { value: 'dont_care', label: "Don't Care", icon: '🤷' },
];

export const dietOptions: PreferenceOption[] = [
  { value: 'vegetarian', label: 'Vegetarian', icon: '🥬' },
  { value: 'vegan', label: 'Vegan', icon: '🌱' },
  { value: 'omnivore', label: 'Omnivore', icon: '🍖' },
  { value: 'dont_care', label: "Don't Care", icon: '🤷' },
];

export const educationOptions: PreferenceOption[] = [
  { value: 'high_school', label: 'High School', icon: '🎓' },
  { value: 'bachelors', label: "Bachelor's Degree", icon: '🎓' },
  { value: 'masters', label: "Master's Degree", icon: '🎓' },
  { value: 'phd', label: 'PhD', icon: '🎓' },
  { value: 'dont_care', label: "Don't Care", icon: '🤷' },
];

export const careerOptions: PreferenceOption[] = [
  { value: 'student', label: 'Student', icon: '📚' },
  { value: 'employed', label: 'Employed', icon: '💼' },
  { value: 'self_employed', label: 'Self-employed', icon: '💡' },
  { value: 'dont_care', label: "Don't Care", icon: '🤷' },
];

export const politicalViews: PreferenceOption[] = [
  { value: 'liberal', label: 'Liberal', icon: '🌊' },
  { value: 'conservative', label: 'Conservative', icon: '🦅' },
  { value: 'moderate', label: 'Moderate', icon: '⚖️' },
  { value: 'dont_care', label: "Don't Care", icon: '🤷' },
];

export const messagePrivacyOptions: PreferenceOption[] = [
  { value: 'matches_only', label: 'Matches Only', icon: '💕' },
  { value: 'all_users', label: 'All Users', icon: '🌍' },
  { value: 'friends_only', label: 'Friends Only', icon: '👥' },
];

export const languages: PreferenceOption[] = [
  { value: 'english', label: 'English', icon: '🇺🇸' },
  { value: 'spanish', label: 'Spanish', icon: '🇪🇸' },
  { value: 'french', label: 'French', icon: '🇫🇷' },
  { value: 'german', label: 'German', icon: '🇩🇪' },
  { value: 'italian', label: 'Italian', icon: '🇮🇹' },
  { value: 'portuguese', label: 'Portuguese', icon: '🇵🇹' },
  { value: 'russian', label: 'Russian', icon: '🇷🇺' },
  { value: 'japanese', label: 'Japanese', icon: '🇯🇵' },
  { value: 'korean', label: 'Korean', icon: '🇰🇷' },
  { value: 'chinese', label: 'Chinese', icon: '🇨🇳' },
  { value: 'arabic', label: 'Arabic', icon: '🇸🇦' },
  { value: 'hindi', label: 'Hindi', icon: '🇮🇳' },
  { value: 'dutch', label: 'Dutch', icon: '🇳🇱' },
  { value: 'swedish', label: 'Swedish', icon: '🇸🇪' },
  { value: 'norwegian', label: 'Norwegian', icon: '🇳🇴' },
  { value: 'danish', label: 'Danish', icon: '🇩🇰' },
  { value: 'finnish', label: 'Finnish', icon: '🇫🇮' },
  { value: 'polish', label: 'Polish', icon: '🇵🇱' },
  { value: 'czech', label: 'Czech', icon: '🇨🇿' },
  { value: 'hungarian', label: 'Hungarian', icon: '🇭🇺' },
  { value: 'turkish', label: 'Turkish', icon: '🇹🇷' },
];
