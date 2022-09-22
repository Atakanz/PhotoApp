import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import ShareStack from './ShareStack';
import MapStack from './MapStack';
import SettingStack from './SettingStack';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
const Tab = createBottomTabNavigator();



export const BottomTab = ({navigation}) => {
	const theme = useSelector(state => state.theme.theme);
    const colorSelect = theme === 'Dark' ? '#fff' : '#212121';
	const editProfile = <Icon name="pencil-outline" size={30} 
    color={colorSelect} style={{marginRight: 15}} />
	return (
	<Tab.Navigator screenOptions={{
        headerTintColor: theme === 'Dark' ? '#fff' : '#212121',
		tabBarShowLabel:false,
        headerStyle: {
          backgroundColor: theme === 'Dark' ? '#212121' : '#f1ff69',
        },
        tabBarInactiveBackgroundColor: theme === 'Dark' ? '#212121' : '#fff',
        tabBarActiveBackgroundColor: theme === 'Dark' ? '#212121' : '#fff',
      }} >
		<Tab.Screen 
		name='Share' 
		component={ShareStack} 
		options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="export-variant" color={colorSelect} size={30} />
          ),
        }} />
		<Tab.Screen 
		name='Map' 
		component={MapStack} 
		options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="map-marker" color={colorSelect} size={30} />
          ),
        }} />
		<Tab.Screen 
		name='Settings' 
		component={SettingStack} 
		options={{
			tabBarIcon: ({color, size}) => (
				<Icon name="account" color={colorSelect} size={30} />
			  ),
			}}
             />
	</Tab.Navigator>
);
}