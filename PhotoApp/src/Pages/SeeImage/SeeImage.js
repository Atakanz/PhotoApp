import React from 'react';
import {SafeAreaView, Image} from 'react-native';
import styles from './SeeImage.style';

const SeeImage = ({route}) => {
    const imageUrl = route.params;
    return (
      <SafeAreaView style={styles.container}>
        <Image style={styles.image} source={{uri :imageUrl}} />
      </SafeAreaView>
    )
}

export default SeeImage;