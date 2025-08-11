import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  style,
  textStyle
}) => {
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { paddingHorizontal: 16, paddingVertical: 8 };
      case 'large':
        return { paddingHorizontal: 32, paddingVertical: 16 };
      default:
        return { paddingHorizontal: 24, paddingVertical: 12 };
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return { backgroundColor: '#475569' };
      case 'outline':
        return { backgroundColor: 'transparent', borderWidth: 1, borderColor: '#3b82f6' };
      default:
        return {};
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'outline':
        return '#3b82f6';
      default:
        return 'white';
    }
  };

  const isDisabled = disabled || loading;

  if (variant === 'primary') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={isDisabled}
        style={[
          { borderRadius: 12, overflow: 'hidden', opacity: isDisabled ? 0.5 : 1 },
          style
        ]}
      >
        <LinearGradient
          colors={['#3b82f6', '#1d4ed8']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            getSizeStyles(),
            { alignItems: 'center', justifyContent: 'center' }
          ]}
        >
          {loading ? (
            <ActivityIndicator color="white" size="small" />
          ) : (
            <Text style={[
              { fontWeight: '600', fontSize: 16, color: getTextColor() },
              textStyle
            ]}>
              {title}
            </Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      style={[
        getSizeStyles(),
        getVariantStyles(),
        { borderRadius: 12, alignItems: 'center', justifyContent: 'center', opacity: isDisabled ? 0.5 : 1 },
        style
      ]}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? '#3b82f6' : 'white'} size="small" />
      ) : (
        <Text style={[
          { fontWeight: '600', fontSize: 16, color: getTextColor() },
          textStyle
        ]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};
