import {Text, View, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import {useEffect, useRef, useState} from 'react';
import {Camera} from 'expo-camera';
import {shareAsync} from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import styles from './CameraScreen.style';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import {setProfilePhoto} from '../../Management/Features/User/userSlice';
import {useDispatch} from 'react-redux';


const CameraScreen = ({route}) => {
  
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();
  console.log(route.params)
  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>
  } else if (!hasCameraPermission) {
    return <Text>Permission for camera not granted. Please change this in settings.</Text>
  }

  let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  };
  

  if (photo) {
    let sharePic = () => {
      shareAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };

    let savePhoto = () => {
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };
    const dispatch = useDispatch();
    const taskFunction = () => {
      if (route.params.route === "SettingsScreen") {
        dispatch(setProfilePhoto(photo.uri));
      }
      }

    

    return (
      <SafeAreaView style={styles.container}>
        <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
        <View style={styles.previewOptions}>
         {hasMediaLibraryPermission ? <Icon 
         onPress={savePhoto}
         name="tray-arrow-down" 
         color="black"
         size={40} /> : undefined}
         <Icon 
         onPress={() => setPhoto(undefined)}
         name="trash-can-outline" 
         color="black"
         size={40} />
         <Icon 
         onPress={taskFunction}
         name="send" 
         color="black"
         size={40} />
        </View>
      </SafeAreaView>
    );
  }
 
  return (
    <Camera style={styles.container} ref={cameraRef}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
         onPress={takePic} 
         style={styles.takePicButton} 
         />
      </View>
    </Camera>
  );
}

export default CameraScreen;

