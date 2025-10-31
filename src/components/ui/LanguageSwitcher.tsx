import { useTheme } from "@/src/app/providers/ThemeProvider";
import { changeLanguage } from "@/src/lib/i18n";
import i18n from "@/src/lib/i18n";
import React, { useState, useRef, useEffect } from "react";
import { View, Pressable, Animated, StyleSheet, Text } from "react-native";

export const LanguageSwitcher = () => {
  const { theme } = useTheme();
  const [lang, setLang] = useState<'ru' | 'en'>(i18n.language as 'ru' | 'en');
  const anim = useRef(new Animated.Value(lang === "ru" ? 0 : 1)).current;

  useEffect(() => {
    Animated.spring(anim, {
      toValue: lang === "ru" ? 0 : 1,
      useNativeDriver: false,
    }).start();
  }, [lang]);

  const toggleLang = async () => {
    const newLang: 'ru' | 'en' = lang === 'ru' ? 'en' : 'ru';
    setLang(newLang);
    await changeLanguage(newLang);
  };

  const translateX = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 46],
  });

  return (
    <Pressable
      onPress={toggleLang}
      style={[
        styles.switcher,
        { backgroundColor: theme.colors.primary, shadowColor: theme.colors.secondary },
      ]}
    >
      <Animated.View
        style={[
          styles.thumb,
          {
            transform: [{ translateX }],
            backgroundColor: theme.colors.background,
          },
        ]}
      />
      <View style={styles.side}>
        <Text style={[styles.flag, { color: theme.colors.text }]}>🇷🇺</Text>
      </View>
      <View style={styles.side}>
        <Text style={[styles.flag, { color: theme.colors.text }]}>🇬🇧</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  switcher: {
    width: 96,
    height: 40,
    borderRadius: 20,
    flexDirection: "row",
    overflow: "hidden",
    marginVertical: 10,
    elevation: 3,
    paddingHorizontal: 4,
  },
  side: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    alignContent: 'center'
  },
  flag: {
    fontSize: 20,
  },
  thumb: {
    position: "absolute",
    width: 48,
    height: 36,
    borderRadius: 20,
    alignSelf: 'center'
  },
});
