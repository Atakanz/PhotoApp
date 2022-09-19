import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import styles from './Settings.style';
import Buttons from '../../Components/Buttons';
import {useSelector} from 'react-redux';
import {firebase} from '../../../config';
import {logOut} from '../../Management/Features/User/userSlice'
import {useDispatch} from 'react-redux';

const Settings = () => {
    const dispatch = useDispatch();
	const logout = () => {
		dispatch(logOut(null));
	}
    return (
       <SafeAreaView>
        <Text>Hello Settings!</Text>
        <Buttons
            name="Log out"
            task={logout}
          />
       </SafeAreaView>
    )
}

export default Settings;

