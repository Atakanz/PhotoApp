import React from 'react';
import {SafeAreaView, TouchableOpacity, Text, View} from 'react-native';
import styles from './ThemeSettings.style';
import themeSlice from '../../Management/Features/Theme/themeSlice';
import {useDispatch, useSelector} from 'react-redux';
import {setTheme} from '../../Management/Features/Theme/themeSlice';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const ThemeSettings = ({navigation}) => {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.theme.theme);
  const themeToggle = () => {
    if (theme === 'Light') {
      dispatch(setTheme('Dark'));
    } else {
      dispatch(setTheme('Light'));
    }
    // if theme is light, toggle to dark
  };

  return (
    <SafeAreaView style={[styles.container, styles[`container${theme}`]]}>
      <View style={styles.touchableView}>
        <TouchableOpacity
          style={[styles.button, styles[`button${theme}`]]}
          onPress={themeToggle}>
          <Text style={[styles.text, styles[`text${theme}`]]}>{theme}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ThemeSettings;