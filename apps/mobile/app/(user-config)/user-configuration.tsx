import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  Animated,
  Dimensions,
} from 'react-native';
import { useUserConfigStore } from '../../src/features/user-configuration/user-config.store';
import { preferenceSections } from '../../src/features/user-configuration/preference-sections';
import { UserPreferences } from '../../src/features/user-configuration/types';

const { width } = Dimensions.get('window');

export default function UserConfiguration() {
  const { preferences, updatePreferences, setConfigured, isConfigured } = useUserConfigStore();
  const [currentSection, setCurrentSection] = useState(0);
  const [localPreferences, setLocalPreferences] = useState<UserPreferences>(preferences);
  const [slideAnim] = useState(new Animated.Value(0));
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, [currentSection]);

  const handleSave = () => {
    updatePreferences(localPreferences);
    setConfigured(true);
    Alert.alert(
      'Preferences Saved!',
      'Your matching preferences have been updated successfully.',
      [{ text: 'OK' }]
    );
  };

  const handleReset = () => {
    Alert.alert(
      'Reset Preferences',
      'Are you sure you want to reset all your preferences to default?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            setLocalPreferences(preferences);
            setConfigured(false);
          },
        },
      ]
    );
  };

  const updateLocalPreference = (key: keyof UserPreferences, value: any) => {
    setLocalPreferences(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const renderSectionHeader = (section: any) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionIcon}>{section.icon}</Text>
      <View style={styles.sectionTitleContainer}>
        <Text style={styles.sectionTitle}>{section.title}</Text>
        <Text style={styles.sectionDescription}>{section.description}</Text>
      </View>
    </View>
  );

  const renderField = (field: any) => {
    const value = localPreferences[field.id as keyof UserPreferences];

    switch (field.type) {
      case 'range':
        return (
          <View key={field.id} style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>{field.label}</Text>
            <View style={styles.rangeContainer}>
              <Text style={styles.rangeValue}>
                {field.id === 'ageRange' 
                  ? `${value?.min || field.min} - ${value?.max || field.max} years`
                  : `${value || field.min} km`
                }
              </Text>
              <View style={styles.rangeSlider}>
                {/* Range slider implementation would go here */}
                <View style={styles.rangeTrack}>
                  <View style={styles.rangeFill} />
                </View>
              </View>
            </View>
          </View>
        );

      case 'select':
        return (
          <View key={field.id} style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>{field.label}</Text>
            <View style={styles.optionsContainer}>
              {field.options?.map((option: any) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.optionButton,
                    value === option.value && styles.optionButtonSelected,
                  ]}
                  onPress={() => updateLocalPreference(field.id, option.value)}
                >
                  <Text style={styles.optionIcon}>{option.icon}</Text>
                  <Text style={[
                    styles.optionText,
                    value === option.value && styles.optionTextSelected,
                  ]}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      case 'multiselect':
        return (
          <View key={field.id} style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>{field.label}</Text>
            <View style={styles.optionsContainer}>
              {field.options?.map((option: any) => {
                const isSelected = Array.isArray(value) && value.includes(option.value);
                return (
                  <TouchableOpacity
                    key={option.value}
                    style={[
                      styles.optionButton,
                      isSelected && styles.optionButtonSelected,
                    ]}
                    onPress={() => {
                      const currentValues = Array.isArray(value) ? value : [];
                      const newValues = isSelected
                        ? currentValues.filter(v => v !== option.value)
                        : [...currentValues, option.value];
                      updateLocalPreference(field.id, newValues);
                    }}
                  >
                    <Text style={styles.optionIcon}>{option.icon}</Text>
                    <Text style={[
                      styles.optionText,
                      isSelected && styles.optionTextSelected,
                    ]}>
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        );

      case 'toggle':
        return (
          <View key={field.id} style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>{field.label}</Text>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                value && styles.toggleButtonActive,
              ]}
              onPress={() => updateLocalPreference(field.id, !value)}
            >
              <View style={[
                styles.toggleThumb,
                value && styles.toggleThumbActive,
              ]} />
            </TouchableOpacity>
          </View>
        );

      default:
        return null;
    }
  };

  const currentSectionData = preferenceSections[currentSection];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Configure Preferences</Text>
        <Text style={styles.headerSubtitle}>
          Set your matching criteria to find your perfect match
        </Text>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${((currentSection + 1) / preferenceSections.length) * 100}%` }
            ]} 
          />
        </View>
        <Text style={styles.progressText}>
          {currentSection + 1} of {preferenceSections.length}
        </Text>
      </View>

      <View style={styles.sectionTabs}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {preferenceSections.map((section, index) => (
            <TouchableOpacity
              key={section.id}
              style={[
                styles.sectionTab,
                currentSection === index && styles.sectionTabActive,
              ]}
              onPress={() => setCurrentSection(index)}
            >
              <Text style={styles.sectionTabIcon}>{section.icon}</Text>
              <Text style={[
                styles.sectionTabText,
                currentSection === index && styles.sectionTabTextActive,
              ]}>
                {section.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateX: slideAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [50, 0],
            }) }],
          },
        ]}
      >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {renderSectionHeader(currentSectionData)}
          
          <View style={styles.fieldsContainer}>
            {currentSectionData.fields.map(renderField)}
          </View>
        </ScrollView>
      </Animated.View>

      <View style={styles.footer}>
        <View style={styles.buttonContainer}>
          {currentSection > 0 && (
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => setCurrentSection(currentSection - 1)}
            >
              <Text style={styles.secondaryButtonText}>Previous</Text>
            </TouchableOpacity>
          )}
          
          {currentSection < preferenceSections.length - 1 ? (
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => setCurrentSection(currentSection + 1)}
            >
              <Text style={styles.primaryButtonText}>Next</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleSave}
            >
              <Text style={styles.primaryButtonText}>Save Preferences</Text>
            </TouchableOpacity>
          )}
        </View>
        
        <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
          <Text style={styles.resetButtonText}>Reset to Default</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 20,
  },
  headerTitle: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headerSubtitle: {
    color: '#94a3b8',
    fontSize: 16,
    lineHeight: 24,
  },
  progressContainer: {
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#ec4899',
    borderRadius: 2,
  },
  progressText: {
    color: '#94a3b8',
    fontSize: 14,
    textAlign: 'center',
  },
  sectionTabs: {
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  sectionTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  sectionTabActive: {
    backgroundColor: '#ec4899',
  },
  sectionTabIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  sectionTabText: {
    color: '#94a3b8',
    fontSize: 14,
    fontWeight: '500',
  },
  sectionTabTextActive: {
    color: 'white',
  },
  content: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
    marginBottom: 16,
  },
  sectionIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  sectionTitleContainer: {
    flex: 1,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  sectionDescription: {
    color: '#94a3b8',
    fontSize: 16,
    lineHeight: 24,
  },
  fieldsContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  fieldContainer: {
    marginBottom: 24,
  },
  fieldLabel: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  rangeContainer: {
    marginTop: 8,
  },
  rangeValue: {
    color: '#ec4899',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
  },
  rangeSlider: {
    alignItems: 'center',
  },
  rangeTrack: {
    width: '100%',
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 3,
  },
  rangeFill: {
    width: '60%',
    height: '100%',
    backgroundColor: '#ec4899',
    borderRadius: 3,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  optionButtonSelected: {
    backgroundColor: '#ec4899',
    borderColor: '#ec4899',
  },
  optionIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  optionText: {
    color: '#94a3b8',
    fontSize: 14,
    fontWeight: '500',
  },
  optionTextSelected: {
    color: 'white',
  },
  toggleButton: {
    width: 60,
    height: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 4,
    justifyContent: 'center',
  },
  toggleButtonActive: {
    backgroundColor: '#ec4899',
  },
  toggleThumb: {
    width: 24,
    height: 24,
    backgroundColor: 'white',
    borderRadius: 12,
  },
  toggleThumbActive: {
    transform: [{ translateX: 28 }],
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#ec4899',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  secondaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  resetButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  resetButtonText: {
    color: '#94a3b8',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
