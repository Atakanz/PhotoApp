import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SelectPhoto from '../Pages/SelectPhoto/SelectPhoto';
import SharePhoto from '../Pages/SharePhoto';


const Stack = createNativeStackNavigator();

export const ShareStack = () => (
	<Stack.Navigator screenOptions={{headerShown:false}}>
		<Stack.Screen 
        name='SelectPhotoScreen' 
        component={SelectPhoto} />
		<Stack.Screen 
        name='SharePhotoScreen' 
        component={SharePhoto} />
	</Stack.Navigator>
);

export default ShareStack;