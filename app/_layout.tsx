import { useEffect } from 'react';
import { initI18n } from '@/src/lib/i18n';
import ThemeProvider, { ThemedLayout } from '@/src/app/providers/ThemeProvider';
import Toast from 'react-native-toast-message';
import { toastConfig } from '@/src/components/ui';

export default function RootLayout() {
  useEffect(() => {
    initI18n();
  }, []);

  return (
    <ThemeProvider>
      <ThemedLayout />
      <Toast config={toastConfig} />
    </ThemeProvider>
  );
}