import React, {useEffect, useRef, useState} from 'react';
import {Text, View, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import {Camera} from 'expo-camera';
import {shareAsync} from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import styles from './CameraScreen.style';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import {setProfilePhoto} from '../../Management/Features/User/userSlice';
import {setUserPosts} from '../../Management/Features/User/userSlice';
import {useDispatch, useSelector} from 'react-redux';


const CameraScreen = ({route, navigation}) => {
  const user = useSelector(state => state.user.user)
  
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();
  const {routeName} = route.params;
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
    let savePhoto = () => {
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };
    const dispatch = useDispatch();
    const taskFunction = async () => {
      if (routeName === "SettingsScreen") {
        dispatch(setProfilePhoto(photo.uri));
        const postPhoto = await uploadImageAsync({uri:photo.uri});
        setPhoto(undefined);
        navigation.navigate("SettingsScreen");
      } else {
        dispatch(setUserPosts(
        {post: photo.uri, 
        longitude: user.longitude, 
        latitude: user.latitude}));
        setPhoto(undefined);
        navigation.navigate("Map");
      }
    }

    const uploadImageAsync = async({uri})=> {
      // Why are we using XMLHttpRequest? See:
      // https://github.com/expo/expo/issues/2402#issuecomment-443726662
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          console.log(e);
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        xhr.send(null);
      });
      console.log("blob",blob);
  
      const fileRef = ref(storage, uuid.v4());
      const result = await uploadBytes(fileRef, blob);
      return await getDownloadURL(fileRef);
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
         style= {styles.middleIcon}
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

