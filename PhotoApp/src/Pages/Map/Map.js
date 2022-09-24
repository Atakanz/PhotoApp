import React, {useState, useEffect} from 'react';
import MapView from 'react-native-maps';
import {Alert, SafeAreaView, Image, View, Modal} from 'react-native';
import styles from './Map.style';
import {useSelector, useDispatch} from 'react-redux';
import {db, auth} from '../../../config';
import {getDocs, collection, query, where} from 'firebase/firestore';
import CustomMarker from '../../Components/CustomMarker';
import {useIsFocused} from '@react-navigation/native';
import Buttons from '../../Components/Buttons';
import {setAllUsers} from '../../Management/Features/User/userSlice';

const Map = ({navigation}) => {
      const userLocation = useSelector(state => state.user.userLocation);
      const allUsers = useSelector(state => state.user.allUsers);
      // const [allUsers, setAllUsers] = useState([]);
      const [modalVisible, setModalVisible] = useState(false);
      const dispatch = useDispatch();
      const getUsers = () => {
        const q = query(collection(db, 'users'), where('id', '!=', '==',
         auth.currentUser.uid));
         getDocs(q).then(res => {
          const _users = res.docs.map(item => item.data());
          dispatch(setAllUsers(_users));
        });
      };
    
    
        
      console.log(allUsers);
      const isFocused = useIsFocused();

      useEffect(() => {
       getUsers();
      }, [isFocused]);

    
      const onlyPostsList = allUsers.map(function(item){
      return {posts: item.post}});
      const currentLocation = allUsers.find(function(item){
          return item.id === auth.currentUser.uid;
      })
      console.log("allUsers", allUsers);
      console.log("yourInfo", currentLocation);
      return (
      <SafeAreaView style={styles.container}>
        {userLocation.latitude && <MapView 
            initialRegion={{ 
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421}}
            style={styles.map} 
            maxZoomLevel={15}>
        {onlyPostsList.map((item, index) => {
          return (
            <View key={index}>
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
            <Image
            style={styles.bigImage} 
            source={{uri : item.posts.post}} />
            <Buttons
            task={() => {setModalVisible(!modalVisible)}} 
            name="Go map" />
            </View>
            </View>
            </Modal>
            <CustomMarker
              task={() => navigation.navigate("SeeImageScreen", (item.posts.post))}
              postUrl={item.posts.post}
              lat={item.posts.latitude}
              long={item.posts.longitude}
            />
            </View>
          );
        })}
        </MapView>}
     </SafeAreaView>
    )
}

export default Map;