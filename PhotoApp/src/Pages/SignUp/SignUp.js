import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import styles from './SignUp.style';
import LoginForm from '../../Components/LoginForm';
import {useSelector, useDispatch} from 'react-redux';
import {useState} from 'react';
import {firebase} from '../../../config';

const SignUp = ({navigation}) => {
    const [newUserEmail, setNewUserEmail] = useState('');
	const [newUserPassword, setNewUserPassword] = useState('');
	const [newUserRePassword, setNewUserRePassword] = useState('');
	const [newUserName, setNewUserName] = useState('');
	const [newUserSurname, setNewUserSurname] = useState('');
    const theme = useSelector(state => state.theme.theme)
	registerUser = async (email, password, firstName, lastName) => {
		await firebase.auth().createUserWithEmailAndPassword(newUserEmail, newUserPassword)
		.then(()=> {firebase.firestore().collection('users')
		.doc(firebase.auth().currentUser.uid)
		.set({newUserName, newUserSurname, newUserEmail})}).catch((error)=>{alert(error.message)})
		.catch((error => {alert(error.message)}))}

	return (
	<SafeAreaView style={[styles.container, styles[`container${theme}`]]}>
	<LoginForm
	  isLogoExist={require('../../Assets/logo.jpg')}
	  holder1="E-mail"
	  holder2="Password"
	  holder3="Password again"
	  holder4="Name"
	  holder5="Surname"
	  name1="Sign Up"
	  value1={newUserEmail}
	  value2={newUserPassword}
	  value3={newUserRePassword}
	  value4={newUserName}
	  value5={newUserSurname}
	  emailFormTask={setNewUserEmail}
	  passwordFormTask={setNewUserPassword}
	  repasswordFormTask={setNewUserRePassword}
	  userNameFormTask={setNewUserName}
	  userSurnameFormTask={setNewUserSurname}
	  task1={()=> {registerUser();navigation.navigate("SignIn")}}
	  securityFalse={false}
	  securityTrue={true}
	/>
  </SafeAreaView>
 )
}
export default SignUp;