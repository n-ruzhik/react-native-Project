import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState, useEffect } from "react";

import { styles } from "../styles/PostsScreen.styles";

export const PostsScreen = () => {
  const navigation = useNavigation();
  const [postArr, setPostArr] = useState([]);
  const [image, setImage] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postLocation, setPostLocation] = useState("");

  const {
    params: { url, title = "", locationTitle = "", location },
  } = useRoute();

  useEffect(() => {
    setPostTitle(title), setImage(url), setPostLocation(locationTitle);
  }, [title, url, locationTitle]);

  useEffect(() => {
    if (postTitle !== "" && image !== "" && postLocation !== "") {
      const newPostCard = { postTitle, image, postLocation };
      setPostArr((prevState) => [newPostCard, ...prevState]);
    }
  }, [postTitle, image, postLocation]);

  return (
    <ScrollView style={styles.postsThumb}>
      {/* User-------------------------------------- */}
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

      {/* PostCard-------------------------------------- */}
      <View style={styles.postsBox}>
        {postArr.length > 0 &&
          postArr.map(({ postTitle, image, postLocation }, index) => (
            <View style={styles.postCard} key={index}>
              <View style={styles.postImg}>
                <Image
                  source={{ uri: `${image}` }}
                  style={{ width: "100%", height: "100%" }}
                ></Image>
              </View>
              <Text style={styles.postTitle}>{postTitle}</Text>
              <View style={styles.infoThumb}>
                <View style={styles.comment}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Comments");
                    }}
                  >
                    <Image
                      source={require("../assets/images/comment.png")}
                      style={styles.iconComment}
                    ></Image>
                  </TouchableOpacity>

                  <Text style={styles.commentInfo}>0</Text>
                </View>
                <View style={styles.location}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Map", { location });
                    }}
                  >
                    <Image
                      source={require("../assets/images/map-pin.png")}
                      style={styles.icon}
                    ></Image>
                  </TouchableOpacity>
                  <Text style={styles.locationInfo}>{postLocation}</Text>
                </View>
              </View>
            </View>
          ))}
      </View>
    </ScrollView>
  );
};
