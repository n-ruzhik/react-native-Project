import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";

import { styles } from "../styles/PostsScreen.styles";

export const PostsScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.postsThumb}>
      <View style={styles.userThumb}>
        <View style={styles.photoThumb}>
          <Image
            source={require("../assets/images/user-profile.png")}
            style={styles.userProfilePhoto}
          ></Image>
        </View>
        <View style={styles.userdataThumb}>
          <Text tyle={styles.userNameRow}>user</Text>
          <Text>email</Text>
        </View>
      </View>
    </View>
  );
};
