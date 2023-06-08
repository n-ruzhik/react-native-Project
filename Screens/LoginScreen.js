import {
  View,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { styles } from "../styles/LoginScreen.styles";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

export const LoginScreen = () => {
  const navigation = useNavigation();
  const [state, setState] = useState(initialState);
  const [isShowPassword, setIsShowPassword] = useState(true);

  const [fontsLoaded] = useFonts({
    RobotoRegular: require("../assets/fonts/Roboto-Regular.ttf"),
    RobotoMedium: require("../assets/fonts/Roboto-Medium.ttf"),
    RobotoBold: require("../assets/fonts/Roboto-Bold.ttf"),
  });

  const onLogin = () => {
    if (!state.email || !state.password) {
      console.log("Please, enter your credentials");
      return;
    }
    console.log(state);
    setState(initialState);
    navigation.navigate("Home", {
      userName: state.userName,
      email: state.email,
    });
  };

  const handlePasswordVisibility = () => {
    setIsShowPassword(!isShowPassword);
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <TouchableWithoutFeedback>
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/images/bg-photo.jpg")}
          imageStyle={styles.image}
        ></ImageBackground>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <View style={styles.containerForm}>
            <View style={styles.loginFormThumb}>
              <Text style={styles.LoginTitle}>Log In</Text>
              <View style={styles.inputsContainer}>
                <TextInput
                  style={styles.input}
                  onChangeText={(text) =>
                    setState({ ...state, email: text.trim() })
                  }
                  value={state.email}
                  placeholder="Email"
                  keyboardType="email-address"
                ></TextInput>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.inputLast}
                    value={state.password}
                    onChangeText={(text) =>
                      setState({ ...state, password: text.trim() })
                    }
                    placeholder="Password"
                    textContentType="password"
                    secureTextEntry={!isShowPassword}
                  ></TextInput>
                  <TouchableOpacity
                    style={styles.showPasswordContainer}
                    onPress={handlePasswordVisibility}
                  >
                    <Text style={styles.showPasswordText}>
                      {!isShowPassword ? "Show" : "Hide"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity onPress={onLogin} style={styles.logInBtn}>
                <Text style={styles.btnLabel}>Log In</Text>
              </TouchableOpacity>
              <View>
                <TouchableOpacity
                  style={styles.textLogInContainer}
                  onPress={() => navigation.navigate("Registration")}
                >
                  <Text style={styles.textRegisterQuestion}>
                    Don't have an account?{" "}
                    <Text style={styles.textRegister}>Register</Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};
