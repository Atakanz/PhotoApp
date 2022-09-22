import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, Image, Text, Pressable, Alert} from 'react-native';
import styles from './Settings.style';
import Buttons from '../../Components/Buttons';
import UserInfoCard from '../../Components/UserInfoCard';
import {useSelector} from 'react-redux';
import {logOut} from '../../Management/Features/User/userSlice';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import {firebase} from '../../../config';

const Settings = ({navigation}) => {
    const theme = useSelector(state => state.theme.theme)
    const dispatch = useDispatch();     
	const logout = () => {
		dispatch(logOut(null));
	}
    const colorSelect = theme === 'Dark' ? '#fff' : '#212121';
	const themeIcon = <Icon name="compare" size={30} 
    color='#212121' style={{marginRight: 15}} />
	const editIcon = <Icon name="account-settings" size={30} 
    color='#212121' style={{marginRight: 15}} />
	const logOutIcon = <Icon name="logout" size={30} 
    color='#212121' style={{marginRight: 15}} />
    
    return (
        <SafeAreaView 
	      style={[styles.container, styles[`container${theme}`]]}>
        
         <UserInfoCard navigation={navigation} />
         
        <View style={styles.buttons}>
         <View style={styles.button}>
          <Buttons
            name="Theme Settings"
            icon={themeIcon}
            task={() => navigation.navigate('ThemeSettingsScreen')}
          />
          <Buttons
            name="Edit Profile"
            icon={editIcon}
            task={() => navigation.navigate('EditProfileScreen')}
          />
		  <View style={styles.logOutButton}>
             <Buttons
               name="Log out"
               icon={logOutIcon}
               task={logout}
              />
		  </View>
          </View>
         </View>
        </SafeAreaView>
    )
}

export default Settings;



          