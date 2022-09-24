import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, Image, Modal} from 'react-native';
import Buttons from '../../Components/Buttons';
import {useSelector, useDispatch} from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import {useRoute} from '@react-navigation/native';
import styles from './SelectPhoto.style';
import {setLocation, setUserPosts, updateUser} from '../../Management/Features/User/userSlice';
import {ref, getDownloadURL, uploadBytes} from 'firebase/storage';
import {db, storage, auth} from '../../../config';
import uuid from 'react-native-uuid';
import {doc, updateDoc} from "firebase/firestore";
import {useIsFocused} from '@react-navigation/native';
import * as Location from 'expo-location';


const SelectPhoto = ({navigation}) => {

    const user = useSelector(state => state.user.user)
    const userLocation = useSelector(state => state.user.userLocation);
    const theme = useSelector(state => state.theme.theme)
    const profilePhoto = useSelector(state => state.user.profilePhoto);
    const [image, setImage] = useState();
    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = useState(false);
    
    console.log("location", user);
    const getCurrentLocation = async () => {
      const {status} = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
          Alert.alert('Permission to access location was denied');
          return;
      }
      const location = await Location.getCurrentPositionAsync({})
          dispatch(setLocation({longitude:location.coords.longitude, latitude:location.coords.latitude}));
      };
      const isFocused = useIsFocused();

      useEffect(() => {
      getCurrentLocation();
      }, [isFocused]);
    
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.All,
              allowsEditing: true,
              aspect: [4, 3],
              quality: 1,
        });
        if (!result.cancelled) {
            const postPhoto = await uploadImageAsync({uri:result.uri});
            console.log("photo", postPhoto)
            setImage(postPhoto);
            setModalVisible(true);
        }
    };
    
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

    const posts = useSelector (state => state.user.userPosts);
    const routeName = useRoute().name;

    const handleSubmit = async () => {
    const docRef = doc(db, "users", auth.currentUser.uid);
    await updateDoc(docRef, {post: {post: image, longitude:userLocation.longitude, latitude:userLocation.latitude}});
    dispatch(setUserPosts(image));
    }
    // console.log("posts", posts);
    // console.log("user", users);

    return (
        <SafeAreaView style={[styles.container, styles[`container${theme}`]]}>
            <Buttons 
            name="Select from gallery" 
            task={pickImage}/>
            <Buttons 
            name="Open camera" 
            task={() => {navigation.navigate("CameraScreen", 
            ({routeName}))}}
            />
            <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
            <View style={styles.modalView}>
            {image && <Image style={styles.image} source={{uri : image}} />}
            <Buttons task={() => {handleSubmit();setModalVisible(false);}} name="Share" />
            <Buttons task={() => {setImage(null);setModalVisible(false);}} name="Discard" />
            </View>
            </View>
            </Modal>
            
            
        </SafeAreaView>
    )
}

export default SelectPhoto;