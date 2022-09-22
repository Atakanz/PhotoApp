import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import styles from './Buttons.style';
import {useSelector} from 'react-redux';

const Buttons = ({name, task, icon}) => {
  const theme = useSelector(state => state.theme.theme)
  return (
    <TouchableOpacity 
    style={[styles.button, styles[`button${theme}`]]} 
    onPress={task}>
      {icon && <View>{icon}</View>}
      <Text style={[styles.text, styles[`text${theme}`]]} >{name}</Text>
    </TouchableOpacity>
  );
};
export default Buttons;