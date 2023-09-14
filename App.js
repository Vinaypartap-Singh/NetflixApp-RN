import { StatusBar } from "expo-status-bar";
import { NativeModules, Platform, SafeAreaView } from "react-native";
import StackNavigation from "./StackNavigation";

export default function App() {
  const { StatusBarManager } = NativeModules;
  return (
    <SafeAreaView
      style={{
        marginTop: Platform.OS === "android" ? StatusBarManager.HEIGHT : 0,
        flex: 1,
        backgroundColor: "black",
      }}
    >
      <StackNavigation />
      <StatusBar style="light" />
    </SafeAreaView>
  );
}
