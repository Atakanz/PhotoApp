import React, {useState, useEffect} from "react";
import {SafeAreaView, View, Text, Image, Pressable, Alert, Touchable, TouchableOpacity} from "react-native";
import styles from './UserInfoCard.style';
import {setProfilePhoto, setUser} from "../../Management/Features/User/userSlice";
import {firebase} from '../../../config';
import {useSelector, useDispatch} from "react-redux";
import * as ImagePicker from 'expo-image-picker';
import Options from "../Options/Options";
import Icon from '@expo/vector-icons/MaterialCommunityIcons'; 
import {useRoute} from '@react-navigation/native';

const UserInfoCard = ({navigation}) => {
    const theme = useSelector(state => state.theme.theme);
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.user.user);

    const [visible, setVisible] = useState(false);
    const editButton = () => {
        setVisible(!visible);
    }    
    const colorSelect = theme === 'Dark' ? '#fff' : '#212121';
    useEffect(()=> {
        firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get().then((snapshot) => {
            if (snapshot.exists) {
                dispatch(setProfilePhoto(snapshot.data().image));
                dispatch(setUser(snapshot.data()));
            } else {
                console.log('user does not exist')
            }
        })
    },[])
   
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.All,
              allowsEditing: true,
              aspect: [16, 9],
              quality: 1,
        });
        if (!result.cancelled) {
            dispatch(setProfilePhoto(result.uri));
        }
        setVisible(!visible);
    };

    
    const deletePhoto = async () => {
        if (image !== null) {
        await Alert.alert("Snapchat", "Are you sure deleting image?", 
        [
          {
            text: "OK",
            onPress: () => {dispatch(setProfilePhoto(null));setVisible(!visible);},
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
    const route = useRoute().name;
    console.log(route)
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
         option1="Gallery"
         option2="Camera"
         option3="Delete photo"
         task1={pickImage}
         task2={() => {navigation.navigate("CameraScreen", {route});setVisible(false);}}
         task3={deletePhoto} />}
            <View style={styles.logoTextView}>
             <Image style={styles.logo} source={require('../../Assets/logo.jpg')}/>
             <View style={styles.textView}>
             <Text 
               style={styles.textName} >{userInfo.name}
             </Text>
             <Text 
               style={styles.textEmail} >{userInfo.email}
             </Text>
             </View>
            </View>
      </SafeAreaView>
    )
}

export default UserInfoCard;