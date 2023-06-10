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

  postsBox: {
    flexDirection: "column",
    gap: 32,
  },

  postCard: {
    gap: 8,
    width: "100%",
    height: 299,
  },

  postImg: {
    height: 240,
    width: "100%",
    borderRadius: 16,

    backgroundColor: "#F6F6F6",
  },

  postTitle: {
    fontFamily: "RobotoMedium",
    fontWeight: 500,
    fontSize: 16,
    lineHeight: 19,

    color: "#212121",
  },

  infoThumb: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  comment: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
  },

  iconComment: {
    height: 24,
    width: 24,
  },

  commentInfo: {
    fontFamily: "RobotoRegular",
    fontSize: 16,
    lineHeight: 19,
    color: "#bdbdbd",
  },

  location: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },

  locationInfo: {
    fontFamily: "RobotoRegular",
    fontSize: 16,
    lineHeight: 19,
    textDecorationLine: "underline",
    color: "#212121",
  },
});
