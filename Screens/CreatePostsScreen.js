import {
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  TextInput,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "../config";

import { selectName, selectUserId } from "../redux/auth/selectors";
import { styles } from "../styles/CreatePostScreen.styles";

export const CreatePostsScreen = () => {
  const navigation = useNavigation();

  const [postTitle, setPostTitle] = useState(null);
  const [location, setLocation] = useState(null);
  const [locationTitle, setLocationTitle] = useState("");
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [photo, setPhoto] = useState(null);

  const userId = useSelector(selectUserId);
  const userName = useSelector(selectName);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
      }
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePicture = async () => {
    const picture = await cameraRef.takePictureAsync();
    const location = await Location.getCurrentPositionAsync({});
    const coords = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    setImgurl(picture.uri);
    setLocation(coords);
    await MediaLibrary.createAssetAsync(picture.uri);
  };

  const uploadPostToServer = async () => {
    try {
      const photoUrl = await uploadPhotoToServer();
      const uploadedInfo = {
        displayName: userName,
        photo: photoUrl,
        name: postTitle,
        location: locationTitle,
        coordinate: location,
        userId,
        likes: [],
        comments: 0,
      };
      await addDoc(collection(db, "posts"), uploadedInfo);
      resetData();
      navigation.navigate("Posts");
    } catch (error) {
      console.log(error);
    }
  };

  const uploadPhotoToServer = async () => {
    try {
      const response = await fetch(imgurl);
      const file = await response.blob();
      const uniquePostId = Date.now().toString();
      const linkToFile = ref(storage, `imgPost/${uniquePostId}`);
      await uploadBytes(linkToFile, file);
      const photoUrl = await getDownloadURL(
        ref(storage, `imgPost/${uniquePostId}`)
      );
      return photoUrl;
    } catch (error) {
      console.log(error);
    }
  };

  const resetData = () => {
    setPhoto("");
    setPostTitle("");
    setLocationTitle("");
    setLocation(null);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
        {/* Camera-------------------------------------- */}
        <View style={styles.photoThumb}>
          <View style={styles.photoImg}>
            {photo ? (
              <Image
                source={{ uri: `${photo}` }}
                style={{ width: "100%", height: "100%" }}
              ></Image>
            ) : (
              <Camera style={styles.camera} type={type} ref={setCameraRef}>
                <View style={styles.photoBox}>
                  <TouchableOpacity
                    style={styles.photoBtn}
                    onPress={takePicture}
                  >
                    <View style={styles.takePhoto}>
                      <Image
                        source={require("../assets/images/camera.png")}
                      ></Image>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.flipContainer}
                    onPress={() => {
                      setType(
                        type === Camera.Constants.Type.back
                          ? Camera.Constants.Type.front
                          : Camera.Constants.Type.back
                      );
                    }}
                  >
                    <Text
                      style={{ fontSize: 18, marginBottom: 10, color: "white" }}
                    >
                      {" "}
                      Flip{" "}
                    </Text>
                  </TouchableOpacity>
                </View>
              </Camera>
            )}
          </View>
          {photo ? (
            <Text style={styles.photoAction}>Edit photo</Text>
          ) : (
            <Text style={styles.photoAction}>Upload photo</Text>
          )}
        </View>

        {/* Inputs -------------------------------------- */}
        <View style={styles.inputsContainer}>
          <TextInput
            style={styles.inputTitle}
            name="title"
            onChangeText={(text) => setPostTitle(text)}
            placeholder="write a title"
          ></TextInput>
          <TextInput
            style={styles.inputLocation}
            name="location"
            onChangeText={(text) => setLocationTitle(text)}
            value={locationTitle}
            placeholder={"choose a location"}
          ></TextInput>
          <TouchableOpacity style={styles.iconLocation}>
            <Image source={require("../assets/images/map-pin.png")}></Image>
          </TouchableOpacity>
        </View>

        {/* PostBtn -------------------------------------- */}
        {photo !== "" ? (
          <TouchableOpacity
            style={styles.postBtnActive}
            // onPress={() => {
            //   navigation.navigate("Posts", {
            //     url: photo,
            //     title: postTitle,
            //     locationTitle: locationTitle,
            //     location,
            //   });
            //   resetData();
            // }}
            onPress={uploadPostToServer}
          >
            <Text style={styles.btnTextActive}>Post</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.postBtn}>
            <Text style={styles.btnText}>Post</Text>
          </TouchableOpacity>
        )}

        {/* TrashBtn -------------------------------------- */}
        <TouchableOpacity style={styles.deleteBtn} onPress={resetData}>
          <Image
            source={require("../assets/images/trash.png")}
            style={{ width: 24, height: 24 }}
          ></Image>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};
