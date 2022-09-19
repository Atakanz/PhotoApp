import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from '../Pages/SignIn/SignIn';
import SignUp from '../Pages/SignUp/SignUp';


const Stack = createNativeStackNavigator();

export const LoginStack = () => (
	<Stack.Navigator screenOptions={{headerShown:false}}>
		<Stack.Screen 
        name='SignIn' 
        component={SignIn} />
		<Stack.Screen 
        name='SignUp' 
        component={SignUp} />
	</Stack.Navigator>
);

export default LoginStack;