import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { db } from "../config";
import {
  selectUserName,
  selectUserId,
  selectEmail,
} from "../redux/auth/selectors";
import { useSelector } from "react-redux";

import { styles } from "../styles/PostsScreen.styles";

export const PostsScreen = () => {
  const navigation = useNavigation();
  const [postArr, setPostArr] = useState([]);

  const userId = useSelector(selectUserId);
  const userName = useSelector(selectUserName);
  const userEmail = useSelector(selectEmail);

  useEffect(() => {
    const postsCollection = query(
      collection(db, "posts"),
      where("userId", "==", userId)
    );
    onSnapshot(postsCollection, (querySnapshot) => {
      const postArray = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPostArr(postArray);
    });
  }, []);

  return (
    <View style={styles.postsThumb}>
      {/* User-------------------------------------- */}
      <View style={styles.userThumb}>
        <View style={styles.photoThumb}>
          <Image
            source={require("../assets/images/user-profile.png")}
            style={styles.userProfilePhoto}
          ></Image>
        </View>
        <View style={styles.userdataThumb}>
          <Text tyle={styles.userNameRow}>{userName}</Text>
          <Text>{userEmail}</Text>
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
    </View>
  );
};
