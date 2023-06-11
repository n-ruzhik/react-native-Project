import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector } from "react-redux";
import { selectIsLogIn } from "../redux/auth/selectors";

import { PostsScreen } from "./PostsScreen";
import { CreatePostsScreen } from "./CreatePostsScreen";
import { ProfileScreen } from "./ProfileScreen";
import { CommentsScreen } from "./CommentsScreen";
import { MapScreen } from "./MapScreen";

import { RegistrationScreen } from "./RegistrationScreen";
import { LoginScreen } from "./LoginScreen";

import { styles } from "../styles/Home.styles";

const MainStack = createStackNavigator();
const Tabs = createBottomTabNavigator();

export const Home = () => {
  const isAuthorised = useSelector(selectIsLogIn);

  return (
    <NavigationContainer>
      {isAuthorised ? (
        <Tabs.Navigator
          screenOptions={{ tabBarShowLabel: false, headerTitleAlign: "center" }}
        >
          <Tabs.Screen
            name="Posts"
            component={PostsScreen}
            options={({ navigation }) => ({
              tabBarIcon: ({}) => (
                <View style={styles.gridButton}>
                  <Image
                    source={require("../assets/images/grid.png")}
                    style={styles.gridButtonIcon}
                  ></Image>
                </View>
              ),
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => navigation.navigate("Login")}
                  style={styles.logoutBtnThumb}
                >
                  <Image
                    title="log out"
                    source={require("../assets/images/logout.png")}
                  />
                </TouchableOpacity>
              ),
            })}
          />
          <Tabs.Screen
            name="Create"
            component={CreatePostsScreen}
            options={({ navigation }) => ({
              tabBarIcon: ({}) => (
                <View style={styles.createButton}>
                  <Image source={require("../assets/images/union.png")}></Image>
                </View>
              ),
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => navigation.navigate("Posts")}
                  style={styles.backBtnThumb}
                >
                  <Image
                    title="log out"
                    source={require("../assets/images/arrow-left.png")}
                  />
                </TouchableOpacity>
              ),
            })}
          />
          <Tabs.Screen
            name="Profile"
            component={ProfileScreen}
            options={({ navigation }) => ({
              tabBarIcon: ({}) => (
                <View style={styles.profileButton}>
                  <Image
                    source={require("../assets/images/user.png")}
                    style={styles.profileButtonIcon}
                  ></Image>
                </View>
              ),
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => navigation.navigate("Login")}
                  style={styles.logoutBtnThumb}
                >
                  <Image
                    title="log out"
                    source={require("../assets/images/logout.png")}
                  />
                </TouchableOpacity>
              ),
            })}
          />
          <Tabs.Screen
            name="Comments"
            component={CommentsScreen}
            options={({ navigation }) => ({
              tabBarButton: () => null,
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.navigate("Posts")}>
                  <Image
                    source={require("../assets/images/arrow-left.png")}
                    style={{
                      width: 24,
                      height: 24,
                      marginRight: 16,
                      marginLeft: 16,
                    }}
                  ></Image>
                </TouchableOpacity>
              ),
            })}
          />
          <Tabs.Screen
            name="Map"
            component={MapScreen}
            options={({ navigation }) => ({
              tabBarButton: () => null,
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.navigate("Posts")}>
                  <Image
                    source={require("../assets/images/arrow-left.png")}
                    style={{
                      width: 24,
                      height: 24,
                      marginRight: 16,
                      marginLeft: 16,
                    }}
                  ></Image>
                </TouchableOpacity>
              ),
            })}
          />
        </Tabs.Navigator>
      ) : (
        <MainStack.Navigator
          // initialRouteName="Login"
          screenOptions={{
            headerShown: false,
          }}
        >
          <MainStack.Screen
            name="Registration"
            component={RegistrationScreen}
          />
          <MainStack.Screen name="Login" component={LoginScreen} />
        </MainStack.Navigator>
      )}
    </NavigationContainer>
  );
};
