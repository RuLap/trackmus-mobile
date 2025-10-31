import { useTheme } from "@/src/app/providers/ThemeProvider";
import React, { useEffect, useRef } from "react";
import { View, Pressable, Animated, StyleSheet } from "react-native";
import { Sun, Moon } from 'lucide-react-native';

export const ThemeSwitcher = () => {
  const { theme, themeType, toggleTheme } = useTheme();
  const anim = useRef(new Animated.Value(themeType === "light" ? 0 : 1)).current;

  useEffect(() => {
    Animated.spring(anim, {
      toValue: themeType === "light" ? 0 : 1,
      useNativeDriver: false,
    }).start();
  }, [themeType]);

  const translateX = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 46],
  });

  return (
    <Pressable
      onPress={toggleTheme}
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
        <Sun color={ themeType == 'light' ? theme.colors.text : theme.colors.text } />
      </View>
      <View style={styles.side}>
        <Moon color={ themeType == 'dark' ? theme.colors.text : theme.colors.background } />
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
  icon: {
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
