import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    backgroundColor,
    Image,
} from 'react-native';
import Auth from '@react-native-firebase/auth';
import { StackActions, useNavigation } from '@react-navigation/native';

const Splash = () => {
    //const [isUserLogin, setisUserLogin] = useState(false);

    const navigation = useNavigation();

    useEffect(() => {
        setTimeout(() => {
            Auth().onAuthStateChanged((user) => {
                
                const routeName = user != null ? "Teacher_home" : "Login";

                //navigation.navigate(routeName);
                navigation.dispatch(StackActions.replace(routeName));
                StackActions.replace(routeName);
            });

        }, 2000);

        return () => {

        }
    }, [])

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'#87cefa' }}>
            
            <View style={{ margin: 10 ,}}>
                <Image
                  style={{
                    width: 250,
                    height: 250,
                    resizeMode: 'stretch',
                  }}
                  source={require('../src/start.png')}
                />
              </View>
        </View>
    );
};
export default Splash;