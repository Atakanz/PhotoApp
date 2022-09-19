import React from 'react';
import {TextInput} from 'react-native';
import styles from './TextInputs.style';
import {useSelector} from 'react-redux';

const TextInputs = props => {
  const theme = useSelector(state => state.theme.theme)
  return (
    <TextInput
      style={[styles.formUnit, styles[`formUnit${theme}`]]}
      label={props.labelName}
      onFocus={props.focusTask}
      placeholder={props.holder}
      onChangeText={props.task}
      secureTextEntry={props.security}
      placeholderTextColor={theme === 'Light' ? '#212121' : '#fff'}
    />
  );
};

export default TextInputs;