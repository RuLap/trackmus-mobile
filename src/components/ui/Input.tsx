import React, { forwardRef, useState } from 'react'
import { TextInput, View, Text, TextInputProps } from 'react-native'
import { useTheme } from '@/src/app/providers/ThemeProvider'

interface InputProps extends TextInputProps {
  label?: string
  error?: string
}

export const Input = forwardRef<TextInput, InputProps>(
  ({ label, error, style, onFocus, onBlur, ...props }, ref) => {
    const { theme } = useTheme()
    const [isFocused, setIsFocused] = useState(false)

    const handleFocus = (e: any) => {
      setIsFocused(true)
      onFocus?.(e)
    }

    const handleBlur = (e: any) => {
      setIsFocused(false)
      onBlur?.(e)
    }

    return (
      <View style={{ marginBottom: theme.spacing.l }}>
        {label && (
          <Text
            style={{
              color: theme.colors.text,
              fontSize: 14,
              fontWeight: '500',
              marginBottom: theme.spacing.s,
            }}
          >
            {label}
          </Text>
        )}

        <TextInput
          ref={ref}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={[
            {
              borderWidth: isFocused || error ? 1 : 0,
              borderColor: error
                ? theme.colors.error
                : theme.colors.primary,
              backgroundColor: theme.colors.inputBackground,
              color: theme.colors.text,
              borderRadius: theme.borderRadius.medium,
              paddingVertical: theme.spacing.m,
              paddingHorizontal: theme.spacing.m,
              fontSize: 14,
            },
            style,
          ]}
          placeholderTextColor={theme.colors.textSecondary}
          {...props}
        />

        {error && (
          <Text
            style={{
              color: theme.colors.error,
              fontSize: 12,
              marginTop: theme.spacing.s,
            }}
          >
            {error}
          </Text>
        )}
      </View>
    )
  }
)
