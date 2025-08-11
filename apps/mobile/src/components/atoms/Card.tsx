import React from 'react';
import { View, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'gradient' | 'glass';
  style?: ViewStyle;
  onPress?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  style,
  onPress
}) => {
  const getCardStyles = (): ViewStyle => {
    const baseStyles: ViewStyle = {
      borderRadius: 16,
      padding: 24,
    };

    switch (variant) {
      case 'gradient':
        return {
          ...baseStyles,
          overflow: 'hidden',
        };
      case 'glass':
        return {
          ...baseStyles,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderWidth: 1,
          borderColor: 'rgba(255, 255, 255, 0.2)',
        };
      default:
        return {
          ...baseStyles,
          backgroundColor: 'white',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 3,
        };
    }
  };

  if (variant === 'gradient') {
    return (
      <View style={[getCardStyles(), style]}>
        <LinearGradient
          colors={['rgba(59, 130, 246, 0.1)', 'rgba(29, 78, 216, 0.1)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ padding: 24 }}
        >
          {children}
        </LinearGradient>
      </View>
    );
  }

  return (
    <View style={[getCardStyles(), style]}>
      {children}
    </View>
  );
};
