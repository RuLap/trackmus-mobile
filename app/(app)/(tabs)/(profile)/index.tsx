import { View, Text, Button, Alert } from "react-native";
import { router } from "expo-router";
import { useAuthStore } from "@/src/features/auth";

export default function ProfilePage() {
  const { logout } = useAuthStore();

  const clearStorage = async () => {
  try {
    await logout();
    
    router.dismissAll();
    router.replace('/');
    
  } catch (error) {
    Alert.alert('Ошибка', 'Не удалось выйти');
  }
};

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 20, color: '#fff', marginBottom: 10 }}>Your profile will be here</Text>
      <Button 
        title="ОЧИСТИТЬ STORAGE" 
        onPress={clearStorage}
        color="red"
      />
    </View>
  );
}