import React, { useState } from "react";
import {Image, View, Modal, Pressable} from 'react-native';
import styles from './CustomMarker.style';
import MapView, {Marker} from 'react-native-maps';
import Buttons from "../Buttons";

const CustomMarker = ({postUrl, lat, long, task}) => {
     const [modalVisible, setModalVisible]=useState(false)
     return (
    <Marker 
    onPress={task} 
    coordinate={{
      latitude: lat,
      longitude: long,
    }}>
      {postUrl ? (
        <Image
          style={styles.image}
          source={{uri: postUrl}} 
        />
      ) : (
        null
      )}
    </Marker>
  )
};

  export default CustomMarker;