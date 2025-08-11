import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, TextInputProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightIconPress?: () => void;
  variant?: 'default' | 'filled';
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  onRightIconPress,
  variant = 'default',
  style,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const getInputStyles = () => {
    const baseStyles = 'flex-row items-center rounded-xl px-4 py-3';
    
    if (error) {
      return `${baseStyles} border-2 border-red-500 bg-red-50`;
    }
    
    if (isFocused) {
      return `${baseStyles} border-2 border-blue-500 bg-white`;
    }
    
    if (variant === 'filled') {
      return `${baseStyles} bg-slate-100 border border-slate-200`;
    }
    
    return `${baseStyles} bg-white border border-slate-200`;
  };

  return (
    <View className="mb-4">
      {label && (
        <Text className="mb-2 text-slate-700 font-medium text-sm">
          {label}
        </Text>
      )}
      
      <View className={getInputStyles()}>
        {leftIcon && (
          <Ionicons 
            name={leftIcon} 
            size={20} 
            color={isFocused ? '#3b82f6' : '#64748b'} 
            style={{ marginRight: 12 }}
          />
        )}
        
        <TextInput
          className="flex-1 text-slate-900 text-base"
          placeholderTextColor="#94a3b8"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={style}
          {...props}
        />
        
        {rightIcon && (
          <TouchableOpacity
            onPress={onRightIconPress}
            className="ml-2 p-1"
          >
            <Ionicons 
              name={rightIcon} 
              size={20} 
              color={isFocused ? '#3b82f6' : '#64748b'} 
            />
          </TouchableOpacity>
        )}
      </View>
      
      {error && (
        <Text className="mt-1 text-red-500 text-sm">
          {error}
        </Text>
      )}
    </View>
  );
};
