import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/src/app/providers/ThemeProvider';
import { ToastConfig } from 'react-native-toast-message';

export const toastConfig: ToastConfig = {
  success: (props) => <CustomToast {...props} type="success" />,
  error: (props) => <CustomToast {...props} type="error" />,
  info: (props) => <CustomToast {...props} type="info" />,
};

interface CustomToastProps {
  text1?: string;
  text2?: string;
  type: 'success' | 'error' | 'info';
}

function CustomToast({ text1, text2, type }: CustomToastProps) {
  const { theme } = useTheme();

  const colorMap = {
    success: theme.colors.success,
    error: theme.colors.error,
    info: theme.colors.primary,
  };

  return (
    <View style={[styles.base, { backgroundColor: theme.colors.card }]}>
      <View style={[styles.colorAccent, { backgroundColor: colorMap[type] }]} />
      <View style={styles.textContainer}>
        {text1 && <Text style={[styles.text1, { color: theme.colors.text }]}>{text1}</Text>}
        {text2 && <Text style={[styles.text2, { color: theme.colors.textSecondary }]}>{text2}</Text>}
      </View>
      <View style={[styles.colorAccent, { backgroundColor: colorMap[type] }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    overflow: 'hidden',
    marginHorizontal: 10,
    maxWidth: '95%',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  colorAccent: {
    width: 10,
    height: '100%',
  },
  textContainer: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  text1: {
    fontSize: 16,
    fontWeight: '600',
    flexWrap: 'wrap',
  },
  text2: {
    fontSize: 14,
    marginTop: 2,
    flexWrap: 'wrap',
  },
});

export default CustomToast;
