import { View, Text, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import { Redirect } from 'expo-router';
import { useAuth } from '@/src/features/auth';
import { Button } from "@/src/components/ui";
import { useTheme } from "@/src/app/providers/ThemeProvider";
import { useTranslation } from "react-i18next";
import { ChartColumnIncreasing, ClipboardClock, FileMusic, ListMusic } from "lucide-react-native";

export default function Index() {
  const { isAuthenticated, isFullyAuthenticated, initializing } = useAuth();
  const { theme } = useTheme();
  const { t } = useTranslation();

  if (initializing) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.colors.background,
        }}
      >
        <ActivityIndicator size="large" color={theme.colors.background} />
      </View>
    );
  }

  if (isFullyAuthenticated) {
    return <Redirect href="(app)/(tabs)/(tasks)" />;
  }

  if (isAuthenticated) {
    return <Redirect href="(auth)/confirm-email" />;
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: 'flex-start',
        paddingTop: 120,
        backgroundColor: theme.colors.background,
      }}
    >
      <FileMusic color={theme.colors.secondary} size={128} />    
      <Text style={{
          fontFamily: theme.typography.header.fontFamily,
          fontSize: theme.typography.header.fontSize,
          lineHeight: theme.typography.header.lineHeight,
          color: theme.colors.secondary,
          marginLeft: theme.spacing.m,
          marginVertical: theme.spacing.xxl,
        }}>
        {t('welcome.title')}
      </Text>

      <View style={{
        width: '95%',
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        marginBottom: theme.spacing.xl,        
      }}>
        <ListMusic color={theme.colors.text} size={32} />
        <Text style={{
          fontFamily: theme.typography.title.fontFamily,
          fontSize: theme.typography.title.fontSize,
          lineHeight: theme.typography.title.lineHeight,
          color: theme.colors.text,
          marginLeft: theme.spacing.m
        }}>
          {t('welcome.createTasks')}
        </Text>
      </View>
      <View style={{
        width: '95%',
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        marginBottom: theme.spacing.xl,
      }}>
        <ClipboardClock color={theme.colors.text} size={32} />
        <Text style={{
          fontFamily: theme.typography.title.fontFamily,
          fontSize: theme.typography.title.fontSize,
          lineHeight: theme.typography.title.lineHeight,
          color: theme.colors.text,
          marginLeft: theme.spacing.m
        }}>        
          {t('welcome.recordSessions')}
        </Text>
      </View>
      <View style={{
        width: '95%',
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        marginBottom: theme.spacing.xxl,
      }}>
        <ChartColumnIncreasing color={theme.colors.text} size={32} />
        <Text style={{
          fontFamily: theme.typography.title.fontFamily,
          fontSize: theme.typography.title.fontSize,
          lineHeight: theme.typography.title.lineHeight,
          color: theme.colors.text,
          marginLeft: theme.spacing.m
        }}>        
          {t('welcome.lookResults')}
        </Text>
      </View>
      <Button
        title={t('auth.login')}
        onPress={() => router.push("/(auth)/login")}
        style={{marginBottom: theme.spacing.m, width: '90%'}}
      />
      <Button
        variant='ghost'
        title={t('auth.register')}
        onPress={() => router.push("/(auth)/register")}
        style={{marginBottom: theme.spacing.m, width: '90%'}} 
      />
    </View>
  );
}
