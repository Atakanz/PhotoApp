import React, {useState} from 'react';
import {SafeAreaView, Text, Button, Alert} from 'react-native';
import styles from './EditProfile.style';
import {useSelector, useDispatch} from 'react-redux';
import {setUser} from '../../Management/Features/User/userSlice'
import LoginForm from '../../Components/LoginForm/LoginForm';
import {logOut} from '../../Management/Features/User/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {auth} from '../../../config';
import {updateEmail, updatePassword} from 'firebase/auth';

const EditProfile = () => {
const [userEmail, setUserEmail] = useState(null);
const [userPassword, setUserPassword] = useState(null);
const userInfo = useSelector(state => state.user.user);
const theme = useSelector(state => state.theme.theme);
const dispatch = useDispatch();


const editProfile = () => {
updateEmail(auth.currentUser, userEmail).then(() => {
}).catch((error) => {
console.log(error)
});
updatePassword(auth.currentUser, userPassword).then(() => {
}).catch((error) => {
console.log(error)
});
dispatch(setUser(null));
dispatch(logOut(null));
AsyncStorage.removeItem('savedUser');
}



return (
    <SafeAreaView style={[styles.container, styles[`container${theme}`]]}>
      <LoginForm
	  isLogoExist={require('../../Assets/logo.jpg')}
	  holder1="E-mail"
	  holder2="Password"
	  name1="Edit profile"
	  value1={userEmail}
	  value2={userPassword}
	  emailFormTask={setUserEmail}
	  passwordFormTask={setUserPassword}
	  task1={editProfile}
	  securityFalse={false}
	  securityTrue={true}
      />
    </SafeAreaView>
  );
};

export default EditProfile;