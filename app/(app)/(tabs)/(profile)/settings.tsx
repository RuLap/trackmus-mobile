import { Theme, useTheme } from "@/src/app/providers/ThemeProvider";
import { Button } from "@/src/components/ui";
import { useAuthStore } from "@/src/features/auth";
import { ThemeSwitcher, LanguageSwitcher, SettingsListItem, SettingsContainer } from "@/src/features/profile";
import { useToast } from "@/src/hooks/useToast";
import { router } from "expo-router";
import { LockKeyhole, UserPen } from "lucide-react-native";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { View, StyleSheet } from "react-native";

export default function SettingsPage() {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { logout } = useAuthStore();
  const { handleApiError } = useToast();
  
  const styles = useMemo(() => getStyles(theme), [theme]);

  const clearStorage = async () => {
    try {
      await logout();
    
      router.dismissAll();
      router.replace('/(root)/');
    
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <View style={styles.container}>
      <LanguageSwitcher />
      <ThemeSwitcher />
      <SettingsContainer title={t('settings.account')}>
        <SettingsListItem title={t('settings.editProfile')} icon={UserPen} />
        <View style={styles.divider} />
        <SettingsListItem title={t('settings.changePassword')} icon={LockKeyhole} />
      </SettingsContainer>
      <Button title={t('settings.logout')} style={styles.logoutBtn} onPress={clearStorage} />
    </View>
  );
}

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      width: '90%',
      flexDirection: 'column',
      alignSelf: 'center',
      justifyContent: 'flex-start',
      marginTop: 10,
      gap: 10,
    },
    logoutBtn: {
      width: '100%',
      marginTop: 30,
      backgroundColor: theme.colors.error,
    },
    divider: {
      height: 1,
      backgroundColor: theme.colors.border,
      marginVertical: 8,
    },
  });