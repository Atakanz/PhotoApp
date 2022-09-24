import {StyleSheet} from "react-native";

export default StyleSheet.create({
    profilePhoto: {
        width: '100%',
        height: '80%',
        resizeMode: 'cover',
      },
      container: {
        flex: 1,
      },
      textInfo: {
        fontSize: 14,
        textAlign: 'justify',
        fontWeight: 'bold',
      },
      editIcon: {
        flex: 1,
        position: 'absolute',
        top: 10,
        right: 10,
      },
      textName: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 22,
        paddingLeft: 10,
        marginBottom: 5,
      },
      textEmail: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 12,
        paddingLeft: 10,
      },
      logoTextView: {
        backgroundColor: '#253f4b',
        flexDirection: 'row',
        marginHorizontal: 1,
        borderRadius: 10,
        position: 'relative',
        bottom: 50,
        padding: 10,
      },
      textView: {
        justifyContent: 'center',
        marginLeft: 10,
      },
      logo: {
        width: 70,
        height: 70,
        borderRadius: 50,
      },
})