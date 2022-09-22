import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Settings from '../Pages/Settings/Settings';
import EditProfile from '../Pages/EditProfile/EditProfile';
import ThemeSettings from '../Pages/ThemeSettings/ThemeSettings';


const Stack = createNativeStackNavigator();

export const SettingStack = () => (
	<Stack.Navigator screenOptions={{headerShown:false}}>
		<Stack.Screen 
        name='SettingsScreen' 
        component={Settings} />
		<Stack.Screen 
        name='EditProfileScreen' 
        component={EditProfile} />
		<Stack.Screen 
        name='ThemeSettingsScreen' 
        component={ThemeSettings} />
		{/* <Stack.Screen 
        name='CameraScreen' 
        component={CameraScreen} /> */}
	</Stack.Navigator>
);

export default SettingStack;