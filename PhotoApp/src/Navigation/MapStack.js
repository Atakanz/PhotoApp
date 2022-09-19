import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Map from '../Pages/Map/Map';
import SeeImage from '../Pages/SeeImage/SeeImage';


const Stack = createNativeStackNavigator();

export const MapStack = () => (
	<Stack.Navigator screenOptions={{headerShown:false}}>
		<Stack.Screen 
        name='MapScreen' 
        component={Map} />
		<Stack.Screen 
        name='SeeImageScreen' 
        component={SeeImage} />
	</Stack.Navigator>
);

export default MapStack;