import React from 'react';
import {SafeAreaView, Text, Button} from 'react-native';
const SignIn = ({navigation}) => {
    return (
        <SafeAreaView>
            <Text>Hello SignIn!</Text>
            <Button 
            title="go"
             onPress={() => navigation.navigate("BottomTab")} />
        </SafeAreaView>
    )
}

export default SignIn;