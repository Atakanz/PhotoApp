import React from "react";
import {SafeAreaView, Text, TouchableOpacity} from "react-native";
import styles from './Options.style';

const Options = ({option1, option2, option3, task1, task2, task3}) => {
    return (
        <SafeAreaView style={styles.container}>
           <TouchableOpacity style={styles.options} onPress={task1}>
            <Text style={styles.textOption}>{option1}</Text>
            </TouchableOpacity>
           <TouchableOpacity style={styles.options} onPress={task2}>
            <Text style={styles.textOption}>{option2}</Text>
            </TouchableOpacity>
           {option3 && task3 && <TouchableOpacity style={styles.options} onPress={task3}>
            <Text style={styles.textOption}>{option3}</Text>
            </TouchableOpacity>}
        </SafeAreaView>
    )
}

export default Options;