import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="(tasks)"
        options={{ title: "Tasks" }}
      />
    </Tabs>
  );
}
