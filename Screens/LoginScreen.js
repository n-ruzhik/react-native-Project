import {
  View,
  Image,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useFonts } from "expo-font";
import { styles } from "../styles/LoginScreen.styles";

export const LoginScreen = () => {
  const [fontsLoaded] = useFonts({
    RobotoRegular: require("../assets/fonts/Roboto-Regular.ttf"),
    RobotoMedium: require("../assets/fonts/Roboto-Medium.ttf"),
    RobotoRegular: require("../assets/fonts/Roboto-Bold.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/bg-photo.jpg")}
        imageStyle={styles.image}
      ></ImageBackground>
      <View style={styles.containerForm}>
        <View style={styles.loginFormBox}>
          <Text style={styles.LoginTitle}>Log In</Text>
          <View style={styles.inputsContainer}>
            <TextInput style={styles.input} placeholder="Email"></TextInput>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.inputLast}
                placeholder="Password"
                textContentType="password"
                secureTextEntry={true}
              ></TextInput>
              <TouchableOpacity style={styles.showPasswordContainer}>
                <Text style={styles.showPasswordText}>Show</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity title="Sign up" style={styles.logInBtn}>
            <Text style={styles.btnLabel}>Log In</Text>
          </TouchableOpacity>
          <View>
            <TouchableOpacity style={styles.textLogInContainer}>
              <Text style={styles.textQuestionRegister}>
                Don't have an account?{" "}
                <Text style={styles.textRegister}>Register</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
