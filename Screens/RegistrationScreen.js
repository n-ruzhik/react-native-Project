import {
  View,
  Image,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { styles } from "../styles/RegistrationScreen.styles";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

export const RegistrationScreen = () => {
  const [state, setState] = useState(initialState);
  const [isShowPassword, setIsShowPassword] = useState(true);
  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
    RobotoRegular: require("../assets/fonts/Roboto-Regular.ttf"),
    RobotoMedium: require("../assets/fonts/Roboto-Medium.ttf"),
    RobotoBold: require("../assets/fonts/Roboto-Bold.ttf"),
  });

  const onRegister = () => {
    if (!state.email || !state.password || !state.userName) {
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
            <View style={styles.registrationFormThumb}>
              <View style={styles.photoThumb}>
                <Image
                  source={require("../assets/images/add.png")}
                  style={styles.addPhotoImg}
                ></Image>
              </View>
              <Text style={styles.registerTitle}>Registration</Text>
              <View style={styles.inputsContainer}>
                <TextInput
                  style={styles.input}
                  value={state.userName}
                  onChangeText={(text) =>
                    setState({ ...state, userName: text.trim() })
                  }
                  placeholder="Login"
                ></TextInput>
                <TextInput
                  style={styles.input}
                  value={state.email}
                  keyboardType="email-address"
                  onChangeText={(text) =>
                    setState({ ...state, email: text.trim() })
                  }
                  placeholder="Email"
                ></TextInput>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.inputPassword}
                    secureTextEntry={!isShowPassword}
                    minLength={8}
                    maxLength={16}
                    onChangeText={(text) =>
                      setState({ ...state, password: text.trim() })
                    }
                    value={state.password}
                    placeholder="Password"
                  ></TextInput>
                  <TouchableOpacity
                    style={styles.showPasswordContainer}
                    onPress={handlePasswordVisibility}
                  >
                    <Text styles={styles.showPasswordText}>
                      {!isShowPassword ? "Show" : "Hide"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity onPress={onRegister} style={styles.signUpBtn}>
                <Text style={styles.btnLabel}>Sign Up</Text>
              </TouchableOpacity>
              <View>
                <TouchableOpacity
                  style={styles.textLogInContainer}
                  onPress={() =>
                    navigation.navigate("Login", {
                      name: state.userName,
                      email: state.email,
                    })
                  }
                >
                  <Text style={styles.textLogIn}>
                    Already have an account? Log in
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
