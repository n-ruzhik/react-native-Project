import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    height: "100%",
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 24,
    backgroundColor: "#FFFFFF",
  },

  photoThumb: {
    gap: 8,
    marginBottom: 32,
  },

  photoImg: {
    width: "100%",
    height: 300,

    backgroundColor: "#f6f6f6",
  },

  camera: { flex: 1 },

  photoBox: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",

    flex: 1,
    backgroundColor: "transparent",
  },

  photoBtn: { alignSelf: "center" },

  takePhoto: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    height: 60,
    width: 60,
    color: "#bdbdbd",

    borderRadius: 50,
    borderColor: "white",

    backgroundColor: "white",
  },

  flipContainer: {
    position: "absolute",
    right: 5,
    bottom: 5,
    flex: 0.2,
  },

  photoAction: {
    fontFamily: "RobotoRegular",
    fontSize: 16,
    lineHeight: 19,

    color: "#bdbdbd",
  },

  inputsContainer: {
    flexDirection: "column",
    gap: 16,
    marginBottom: 32,
  },

  inputTitle: {
    width: "100%",
    height: 50,

    fontFamily: "RobotoMedium",
    fontSize: 16,
    lineHeight: 19,

    color: "#212121",
    borderBottomWidth: 1,
    borderBottomColor: "#bdbdbd",
  },

  inputLocation: {
    position: "relative",
    paddingLeft: 28,

    width: "100%",
    height: 50,

    fontFamily: "RobotoMedium",
    fontSize: 16,
    lineHeight: 19,

    color: "#212121",
    borderBottomWidth: 1,
    borderBottomColor: "#bdbdbd",
  },

  iconLocation: {
    position: "absolute",
    top: 80,
    left: 0,

    height: 24,
    width: 24,
  },

  postBtn: {
    alignSelf: "center",

    width: 343,
    height: 51,
    padding: 16,
    marginBottom: 16,

    borderRadius: 100,
    backgroundColor: "#F6F6F6",
  },

  postBtnActive: {
    alignSelf: "center",
    marginBottom: 16,
    padding: 16,

    width: 343,
    height: 51,

    borderRadius: 100,
    backgroundColor: "#ff6c00",
  },

  btnText: {
    alignSelf: "center",

    fontFamily: "RobotoRegular",
    fontSize: 16,
    lineHeight: 19,

    color: "#bdbdbd",
  },

  btnTextActive: {
    alignSelf: "center",

    fontFamily: "RobotoRegular",
    fontSize: 16,
    lineHeight: 19,

    color: "#fff",
  },

  deleteBtn: {
    position: "absolute",
    bottom: 22,

    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",

    marginTop: 5,
    marginBottom: 5,

    width: 70,
    height: 40,

    borderRadius: 20,
    backgroundColor: "#f6f6f6",
  },

  // ---------------------
});
