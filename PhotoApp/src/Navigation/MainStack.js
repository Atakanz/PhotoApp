import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {BottomTab} from './BottomTab'
import {useDispatch, useSelector} from 'react-redux';
import {setUser} from '../Management/Features/User/userSlice';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../../config';
import LoginStack from './LoginStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CameraScreen from '../Pages/CameraScreen/CameraScreen';

const Stack = createNativeStackNavigator();

export const MainStack = () => {


  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const getSavedItem = async () => {
    let userData = await AsyncStorage.getItem('savedUser');
    console.log("loginUser", userData)
    const _user = userData ? JSON.parse(userData) : null;
    dispatch(setUser(_user));
    // console.log(_user);
    if (_user !== null){
    signInWithEmailAndPassword(auth, _user.mail, _user.password)
  }
  };
  
  useEffect(() => {
    getSavedItem();
  }, [dispatch]);
 
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
            headerShown: false,
          }}>
  {!user ? (
    <>
      <Stack.Screen name='Login' component={LoginStack} />
    </>
  ) : (
    <>
      <Stack.Screen name='BottomTab' component={BottomTab} />
      <Stack.Screen name='CameraScreen' component={CameraScreen} />
    </>
  )}
  </Stack.Navigator>
  </NavigationContainer>
  )
};

export default MainStack;