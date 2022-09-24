import React from 'react';
import {SafeAreaView} from 'react-native';
import LoginForm from '../../Components/LoginForm';
import {useSelector, useDispatch} from 'react-redux';
import {useState} from 'react';
import styles from './SignIn.style';
import {logIn} from '../../Management/Features/User/userSlice';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {doc, getDoc} from 'firebase/firestore';
import {auth, db} from '../../../config';

const SignIn = ({navigation}) => {
    const [userEmail, setUserEmail] = useState(null);
	  const [userPassword, setUserPassword] = useState(null);
    const dispatch = useDispatch();


    const loginUserButton = async () => {
        signInWithEmailAndPassword(auth, userEmail, userPassword)
          .then(async response => {
            const userDoc = doc(db, 'users', response.user.uid);
            const userRef = await getDoc(userDoc);
            if (userRef.exists()) {
                dispatch(logIn({mail: userEmail, password: userPassword}));
            }
          })
          .catch(err => {
            console.log(err)
          });
      };
    

    const navigateSignUp = () => {
    navigation.navigate("SignUp")
    }
    const theme = useSelector(state => state.theme.theme)
    return (
    <SafeAreaView style={[styles.container, styles[`container${theme}`]]} >
    <LoginForm
        isLogoExist={require('../../Assets/logo.jpg')}
        holder1="E-mail"
        holder2="Password"
        name1="Sign In"
        name2="Sign Up"
        value1={userEmail}
        value2={userPassword}
        emailFormTask={value => setUserEmail(value)}
        passwordFormTask={value => setUserPassword(value)}
        task1={loginUserButton}
        task2={navigateSignUp}
        securityFalse={false}
        securityTrue={true}
        // password input
      />
    </SafeAreaView>
	)
};

export default SignIn;