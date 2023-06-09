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
import { useNavigation } from "@react-navigation/native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

import { styles } from "../styles/CreatePostScreen.styles";

export const CreatePostsScreen = () => {
  const navigation = useNavigation();

  const [postTitle, setPostTitle] = useState(null);
  const [location, setLocation] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [photo, setPhoto] = useState(null);
  const [showMap, setShowMap] = useState("false");

  const onShowMap = () => {
    setShowMap(true);
  };

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

      let location = await Location.getCurrentPositionAsync({});
      console.log(location);
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      console.log(coords);
      setLocation(coords);
    })();
    setShowMap(false);
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const resetData = () => {
    setPhoto(null);
    setPostTitle(null);
    setLocation(null);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
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
                    onPress={async () => {
                      if (cameraRef) {
                        const { uri } = await cameraRef.takePictureAsync();
                        await MediaLibrary.createAssetAsync(uri);
                        setPhoto(uri);
                      }
                    }}
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
            onChangeText={(text) => setLocation(text)}
            placeholder={"choose a location"}
          ></TextInput>
          <TouchableOpacity style={styles.iconLocation}>
            <Image source={require("../assets/images/map-pin.png")}></Image>
          </TouchableOpacity>
        </View>

        {photo ? (
          <TouchableOpacity
            style={styles.postBtnActive}
            onPress={() => {
              navigation.navigate("Posts", {
                url: photo,
                title: postTitle,
                location: location,
              });
              resetData();
            }}
          >
            <Text style={styles.btnTextActive}>Post</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.postBtn}>
            <Text style={styles.btnText}>Post</Text>
          </TouchableOpacity>
        )}
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
