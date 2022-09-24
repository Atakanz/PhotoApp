import React, {useState, useEffect} from "react";
import {SafeAreaView, View, Text, Image, Alert} from "react-native";
import styles from './UserInfoCard.style';
import {setProfilePhoto, setUser} from "../../Management/Features/User/userSlice";
import {useSelector, useDispatch} from "react-redux";
import * as ImagePicker from 'expo-image-picker';
import {doc, updateDoc, collection, query, where, getDocs} from "firebase/firestore";
import Options from "../Options/Options";
import {ref, getDownloadURL, uploadBytes} from 'firebase/storage';
import uuid from 'react-native-uuid';
import {db, storage, auth} from '../../../config';
import Icon from '@expo/vector-icons/MaterialCommunityIcons'; 
import {useRoute} from '@react-navigation/native';

const UserInfoCard = ({navigation}) => {
    const theme = useSelector(state => state.theme.theme);
    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);
    const editButton = () => {
        setVisible(!visible);
    }    
    const colorSelect = theme === 'Dark' ? '#fff' : '#212121';
    useEffect(()=> {
        getData();
    },[])

    const getData = async () => {
    const q = query(collection(db, "users"), where("id", "==", auth.currentUser.uid));
    await getDocs(q).then(res => {
      const _users = res.docs.map(item => item.data());
      console.log("user", _users);
      dispatch(setProfilePhoto(_users[0].profilePhoto));
      dispatch(setUser(_users[0]));
    });
    };
    
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.All,
              allowsEditing: true,
              aspect: [16, 9],
              quality: 1,
        });
        if (!result.cancelled) {
            const profile = await uploadImageAsync({uri:result.uri});
            dispatch(setProfilePhoto(profile));
            const docRef = doc(db, "users", auth.currentUser.uid);
            await updateDoc(docRef, {profilePhoto: profile});
        }
        setVisible(!visible);
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

    const deletePhoto = async () => {
    dispatch(setProfilePhoto(null));
    console.log(auth.currentUser.uid);
    const docRef = doc(db, "users", auth.currentUser.uid);
    await updateDoc(docRef, {profilePhoto: null });
    }

    
    const removePhoto = async () => {
        if (image !== null) {
        await Alert.alert("Snapchat", "Are you sure deleting image?", 
        [
          {
            text: "OK",
            onPress: () => {deletePhoto();},
            style: "OK",
          },
        ],
          {
            cancelable: true,
            onDismiss: () => {}
          }
          )} else {
            Alert.alert("Snapchat", "No profile photo selected")
          }
    }
    
    const image = useSelector(state => state.user.profilePhoto)
    const routeName = useRoute().name;
   
    return (
      <SafeAreaView style= {styles.container}>
         <View>
              {image ? 
                <Image style={styles.profilePhoto} 
                       source={{uri: image}} /> 
                       : 
                <Image style={styles.profilePhoto} 
                       source={require('../../Assets/avatar.jpg')} />
              }
               <View style={styles.editIcon} >
               <Icon 
               onPress={editButton}
               name="pencil-circle" 
               color={colorSelect} 
               size={40} />
               </View>
         </View>
         {visible && 
         <Options 
         style = {styles.optionsView}
         option1="Gallery"
         option2="Camera"
         option3="Delete photo"
         task1={pickImage}
         task2={() => {navigation.navigate("CameraScreen", {routeName});setVisible(false);}}
         task3={removePhoto} />}
            <View style={styles.logoTextView}>
             <Image style={styles.logo} source={require('../../Assets/logo.jpg')}/>
             <View style={styles.textView}>
             <Text 
               style={styles.textName} >{user.name}
             </Text>
             <Text 
               style={styles.textEmail} >{user.email}
             </Text>
             </View>
            </View>
      </SafeAreaView>
    )
}

export default UserInfoCard;