import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SelectPhoto from '../Pages/SelectPhoto/SelectPhoto';


const Stack = createNativeStackNavigator();

export const ShareStack = () => (
	<Stack.Navigator screenOptions={{headerShown:false}}>
		<Stack.Screen 
        name='SelectPhotoScreen' 
        component={SelectPhoto} />
	</Stack.Navigator>
);

export default ShareStack;