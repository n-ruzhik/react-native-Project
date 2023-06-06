import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { RegistrationScreen } from "./Screens/RegistrationScreen.js";
// import { LoginScreen } from "./Screens/LoginScreen";

export default function App() {
  return (
    <View style={styles.container}>
      <RegistrationScreen />
      {/* <LoginScreen /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
