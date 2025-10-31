import { View, Text, Button } from "react-native";
import { router } from "expo-router";

export default function ConfirmEmail() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>
        Confirmation link sent to your email!
      </Text>
      <Button
        title="Continue"
        onPress={() => router.replace("/(app)/(tabs)/(tasks)")}
      />
    </View>
  );
}
