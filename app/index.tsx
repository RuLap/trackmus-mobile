import { View, Text, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import { Redirect } from 'expo-router';
import { useAuth } from '@/src/features/auth/useAuth';
import { Button } from "@/src/components/ui";
import { LanguageSwitcher } from "@/src/components/ui/LanguageSwitcher";
import { ThemeSwitcher } from "@/src/components/ui/ThemeSwitcher";
import { useTheme } from "@/src/app/providers/ThemeProvider";
import { useTranslation } from "react-i18next";
import { GoogleIcon } from "@/src/components/ui/GoogleIcon";
import { ChartColumnIncreasing, ClipboardClock, FileMusic, ListMusic } from "lucide-react-native";

export default function Index() {
  const { isAuthenticated, initializing } = useAuth();
  const { theme } = useTheme();
  const { t } = useTranslation();

  if (initializing) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}
      >
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (isAuthenticated) {
    return <Redirect href="(app)/(tabs)/(tasks)" />;
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
      <View style={{position: 'absolute', top: 40, left: 40, flexDirection: 'row' }}>
        <LanguageSwitcher />
      </View>
      <View style={{position: 'absolute', top: 40, right: 40, flexDirection: 'row' }}>
        <ThemeSwitcher />
      </View>
      <FileMusic color={theme.colors.secondary} size={128} />    
      <Text style={{
          fontSize: theme.typography.title.fontSize,
          fontWeight: theme.typography.title.fontWeight,
          lineHeight: theme.typography.title.lineHeight,
          color: theme.colors.secondary,
          marginLeft: theme.spacing.m,
          marginVertical: theme.spacing.xxl,
        }}>
        Welcome to Trackmus!
      </Text>

      <View style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        marginBottom: theme.spacing.xl,
      }}>
        <ListMusic color={theme.colors.text} size={32} />
        <Text style={{
          fontSize: theme.typography.title.fontSize,
          fontWeight: theme.typography.title.fontWeight,
          lineHeight: theme.typography.title.lineHeight,
          color: theme.colors.text,
          marginLeft: theme.spacing.m
        }}>
          Create Tasks
        </Text>
      </View>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        marginBottom: theme.spacing.xl,
      }}>
        <ClipboardClock color={theme.colors.text} size={32} />
        <Text style={{
          fontSize: theme.typography.title.fontSize,
          fontWeight: theme.typography.title.fontWeight,
          lineHeight: theme.typography.title.lineHeight,
          color: theme.colors.text,
          marginLeft: theme.spacing.m
        }}>        
          Record Sessions
        </Text>
      </View>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        marginBottom: theme.spacing.xxl,
      }}>
        <ChartColumnIncreasing color={theme.colors.text} size={32} />
        <Text style={{
          fontSize: theme.typography.title.fontSize,
          fontWeight: theme.typography.title.fontWeight,
          lineHeight: theme.typography.title.lineHeight,
          color: theme.colors.text,
          marginLeft: theme.spacing.m
        }}>        
          Look Results
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
      <Button
        variant='outline'
        title={t('auth.withGoogle')}
        onPress={() => {
          router.replace("/(app)/(tabs)/(tasks)");
        }}
        leftIcon={<GoogleIcon width={20} height={20} />}
        style={{borderColor: theme.colors.text, borderRadius: 4, backgroundColor: theme.colors.googleBtn }} 
        textStyle={{color:theme.colors.background}}
      />
    </View>
  );
}
