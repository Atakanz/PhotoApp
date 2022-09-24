import {StyleSheet} from "react-native";

export default StyleSheet.create({
    map: {
    width: '100%',
    height: '100%',
    }, 
    container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    },
    markerView: {
    width: 20,
    height: 20,
    borderRadius: 50,
    backgroundColor: 'red',
    },
    bigImage: {
    width: 300,
    height: 300,
    },
    centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      },
      button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
      },
      buttonOpen: {
      backgroundColor: '#F194FF',
      },
      buttonClose: {
      backgroundColor: '#2196F3',
      },
      textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
      },
      modalText: {
      marginBottom: 15,
      textAlign: 'center',
      },
});