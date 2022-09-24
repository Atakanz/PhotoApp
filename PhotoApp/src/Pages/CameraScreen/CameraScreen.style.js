import {StyleSheet} from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      buttonContainer: {
        alignItems: "center",
        backgroundColor: "lightgray",
        opacity: 0.3,
        borderTopLeftRadius: 30,
        borderTopRightRadius:30,
        bottom: 0,
        flexDirection: "row",
        justifyContent: "space-evenly",
        left: 0,
        position: "absolute",
        right: 0,
      },
      preview: {
        alignSelf: 'stretch',
        flex: 1,
      },
      takePicButton: {
        backgroundColor: "#fff",
        borderRadius: 35,
        height: 70,
        marginVertical: 10,
        width: 70,
        borderColor: '#FFFC00',
        borderWidth: 2
      },
      previewOptions: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-evenly',
        backgroundColor: '#FFFC00'
      },
})