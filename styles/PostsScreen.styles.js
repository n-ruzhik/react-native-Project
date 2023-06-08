import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  postsThumb: {
    paddingLeft: 16,
    paddingRight: 16,
    height: "100%",
    backgroundColor: "#ffffff",
  },

  userThumb: {
    flexDirection: "row",
    height: 60,
    gap: 8,
    marginTop: 32,
  },

  photoThumb: {
    width: 60,
    height: 60,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },

  userProfilePhoto: {
    width: 60,
    height: 60,
  },

  userdataThumb: {
    alignSelf: "center",
  },
});
