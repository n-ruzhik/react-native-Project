import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { styles } from "../styles/Home.styles";
import { PostsScreen } from "./PostsScreen";
import { CreatePostsScreen } from "./CreatePostsScreen";
import { ProfileScreen } from "./ProfileScreen";

const Tabs = createBottomTabNavigator();

export const Home = () => {
  const navigation = useNavigation();

  return (
    <Tabs.Navigator
      screenOptions={{ tabBarShowLabel: false, headerTitleAlign: "center" }}
    >
      <Tabs.Screen
        name="Posts"
        component={PostsScreen}
        options={{
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
        }}
      />
      <Tabs.Screen
        name="Create"
        component={CreatePostsScreen}
        options={{
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
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
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
        }}
      />
    </Tabs.Navigator>
  );
};
