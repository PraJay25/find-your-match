# User Configuration Feature

## Overview

The User Configuration feature allows users to set comprehensive matching preferences for finding their perfect match. This system provides a beautiful, interactive interface for configuring all aspects of user preferences with persistent storage and real-time updates.

## Features

### 🎯 **Comprehensive Preference Categories**
- **Basic Preferences**: Age range, gender preference, relationship type
- **Location Preferences**: Country, city, maximum distance
- **Interests & Hobbies**: 40+ interest options with icons
- **Communication Preferences**: Style and response time expectations
- **Lifestyle Preferences**: Smoking, drinking, exercise, diet
- **Education & Career**: Education level and career status
- **Additional Preferences**: Languages, political views, religion
- **Privacy Settings**: Online status, last seen, messaging permissions

### 🎨 **Beautiful UI/UX**
- Modern dark theme with pink accents
- Smooth animations and transitions
- Progress tracking with visual indicators
- Section-based navigation with tabs
- Interactive form elements with real-time feedback

### 💾 **Data Persistence**
- Zustand store with persistence middleware
- Automatic save/load of preferences
- Reset to default functionality
- Configuration status tracking

### 🔧 **Technical Features**
- TypeScript interfaces for type safety
- Modular architecture with clear separation of concerns
- Reusable components and data structures
- Comprehensive error handling

## File Structure

```
src/features/user-configuration/
├── types.ts                    # TypeScript interfaces and types
├── user-config.store.ts        # Zustand store with persistence
├── preference-data.ts          # All preference options and data
├── preference-sections.ts      # Organized preference sections
├── index.ts                    # Feature exports
└── README.md                   # This documentation
```

## Usage

### Basic Usage

```typescript
import { useUserConfigStore } from '../features/user-configuration';

function MyComponent() {
  const { preferences, updatePreferences, isConfigured } = useUserConfigStore();
  
  // Access preferences
  console.log(preferences.ageRange);
  
  // Update preferences
  updatePreferences({ ageRange: { min: 25, max: 35 } });
  
  // Check if user has configured preferences
  if (isConfigured) {
    // User has set up preferences
  }
}
```

### Navigation to Configuration Screen

```typescript
import { router } from 'expo-router';

// Navigate to user configuration screen
router.push('/(user-config)/user-configuration');
```

## Preference Types

### 1. **Range Preferences**
- Age range (18-80 years)
- Maximum distance (1-500 km)
- Uses custom range sliders with visual feedback

### 2. **Select Preferences**
- Single choice from predefined options
- Gender preference, relationship type, communication style
- Beautiful option cards with icons

### 3. **Multi-Select Preferences**
- Multiple selections allowed
- Interests, languages
- Toggle-based selection with visual feedback

### 4. **Toggle Preferences**
- Boolean on/off settings
- Privacy settings (show online status, last seen)
- Animated toggle switches

## Data Structure

### UserPreferences Interface

```typescript
interface UserPreferences {
  // Age preferences
  ageRange: { min: number; max: number };
  
  // Location preferences
  location: {
    country: string;
    city?: string;
    maxDistance: number;
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
```

## Store Actions

### Available Actions

```typescript
const {
  preferences,           // Current preferences
  isConfigured,         // Whether user has configured preferences
  lastUpdated,          // Last update timestamp
  updatePreferences,    // Update specific preferences
  resetPreferences,     // Reset to default values
  setConfigured,        // Set configuration status
  updateLastUpdated,    // Update timestamp
} = useUserConfigStore();
```

### Example Usage

```typescript
// Update multiple preferences
updatePreferences({
  ageRange: { min: 25, max: 35 },
  interests: ['travel', 'music', 'photography'],
  location: { country: 'US', maxDistance: 50 }
});

// Reset all preferences
resetPreferences();

// Mark as configured
setConfigured(true);
```

## Preference Data

### Available Options

- **Countries**: 20+ countries with flags
- **Interests**: 40+ interests with emoji icons
- **Languages**: 20+ languages with country flags
- **Relationship Types**: Casual, serious, friendship, all
- **Gender Preferences**: Male, female, non-binary, all
- **Communication Styles**: Text, voice, video, all
- **Response Times**: Immediate, within hour, within day, flexible
- **Lifestyle Options**: Yes, no, occasionally, don't care
- **Education Levels**: High school, bachelor's, master's, PhD, don't care
- **Career Status**: Student, employed, self-employed, don't care
- **Political Views**: Liberal, conservative, moderate, don't care

## UI Components

### Configuration Screen Features

1. **Header Section**
   - Title and description
   - Progress indicator

2. **Section Tabs**
   - Horizontal scrollable tabs
   - Visual indicators for current section
   - Smooth transitions

3. **Content Area**
   - Section-specific content
   - Animated transitions
   - Form validation

4. **Footer**
   - Navigation buttons (Previous/Next)
   - Save button on final section
   - Reset to default option

### Styling

- **Color Scheme**: Dark theme (#0f172a) with pink accents (#ec4899)
- **Typography**: Clean, readable fonts with proper hierarchy
- **Spacing**: Consistent padding and margins
- **Animations**: Smooth transitions and micro-interactions
- **Responsive**: Adapts to different screen sizes

## Integration

### With Home Screen

The user configuration is accessible from the home screen's profile section:

```typescript
// In home screen settings
{ label: 'Matching Preferences', value: '', icon: '⚙️' }
```

### With Matching Algorithm

Preferences can be used for matching:

```typescript
const { preferences } = useUserConfigStore();

// Use preferences for matching logic
const findMatches = (users: User[]) => {
  return users.filter(user => {
    // Check age range
    if (user.age < preferences.ageRange.min || user.age > preferences.ageRange.max) {
      return false;
    }
    
    // Check gender preference
    if (preferences.genderPreference !== 'all' && user.gender !== preferences.genderPreference) {
      return false;
    }
    
    // Check interests overlap
    const commonInterests = user.interests.filter(interest => 
      preferences.interests.includes(interest)
    );
    
    return commonInterests.length > 0;
  });
};
```

## Future Enhancements

### Planned Features

1. **Advanced Matching Algorithm**
   - Weighted preference scoring
   - Machine learning-based recommendations
   - Compatibility percentage calculation

2. **Preference Analytics**
   - Usage statistics
   - Popular preference combinations
   - Success rate tracking

3. **Social Features**
   - Share preferences with friends
   - Preference-based group matching
   - Community preference trends

4. **Customization**
   - Custom preference categories
   - Personalized preference suggestions
   - Preference templates

## Testing

### Unit Tests

```typescript
// Test preference updates
test('should update age range preferences', () => {
  const { updatePreferences, preferences } = useUserConfigStore();
  
  updatePreferences({ ageRange: { min: 25, max: 35 } });
  
  expect(preferences.ageRange).toEqual({ min: 25, max: 35 });
});

// Test persistence
test('should persist preferences', () => {
  const { updatePreferences, preferences } = useUserConfigStore();
  
  updatePreferences({ interests: ['travel', 'music'] });
  
  // Reload store
  const { preferences: reloadedPreferences } = useUserConfigStore();
  
  expect(reloadedPreferences.interests).toEqual(['travel', 'music']);
});
```

## Performance Considerations

1. **Lazy Loading**: Preference data is loaded on demand
2. **Efficient Updates**: Only changed preferences are updated
3. **Memory Management**: Proper cleanup of event listeners
4. **Storage Optimization**: Compressed preference storage

## Accessibility

1. **Screen Reader Support**: Proper labels and descriptions
2. **Keyboard Navigation**: Full keyboard accessibility
3. **High Contrast**: Support for high contrast mode
4. **Font Scaling**: Responsive to system font size changes

## Troubleshooting

### Common Issues

1. **Preferences Not Saving**
   - Check storage permissions
   - Verify Zustand persistence configuration
   - Clear app storage and retry

2. **UI Not Updating**
   - Ensure proper state management
   - Check for component re-renders
   - Verify animation configurations

3. **Type Errors**
   - Check TypeScript interfaces
   - Verify preference data structure
   - Ensure proper type imports

## Contributing

When adding new preferences:

1. **Update Types**: Add new fields to `UserPreferences` interface
2. **Add Data**: Include options in `preference-data.ts`
3. **Update Sections**: Add to `preference-sections.ts`
4. **Test**: Verify functionality and UI
5. **Document**: Update this README

## License

This feature is part of the Find Your Match application and follows the same licensing terms.
