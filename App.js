import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Animatable from 'react-native-animatable';
import { Student_home } from './Screen/Student_home';
import { Attend_test_list } from './Screen/Attend_test_list';
import { Teacher_home } from './Screen/Teacher_home';
import { Tlogin } from './Screen/Tlogin';
import { Slogin } from './Screen/Slogin';
import { Sprofile } from './Screen/Sprofile';
import { Tannouncement } from './Screen/Tannouncement';
import { Sannouncement } from './Screen/Sannouncement';
import { Settest } from './Screen/Settest';
import { Tverify } from './Screen/Tverify';
import { Ssignup } from './Screen/Ssignup';
import { Attend_test } from './Screen/Attend_test';
import { Tresult_list } from './Screen/Tresult_list';
import { Sresult_list } from './Screen/Sresult_list';
import { Tsignup } from './Screen/Tsignup';
import { Tprofile } from './Screen/Tprofile';
import { Tresult } from './Screen/Tresult';
import { Sresult } from './Screen/Sresult';
import { About } from './Screen/About';
import Auth from '@react-native-firebase/auth';
import Splash from './Screen/Splash';
const Stack = createNativeStackNavigator();


const App = props => {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={Login} />
        {/* {!isUserLogin ? ( */}
        <Stack.Screen name="Slogin" component={Slogin} />
        {/* ):null}
        {!isUserLogin ?( */}
        <Stack.Screen name="Ssignup" component={Ssignup} />
        {/* ):null} */}
        
        <Stack.Screen name="Student_home" component={Student_home} />
        <Stack.Screen name="Attend_test_list" component={Attend_test_list} />
        <Stack.Screen name="Teacher_home" component={Teacher_home} />
        <Stack.Screen name="Tlogin" component={Tlogin} />

        <Stack.Screen name="Sprofile" component={Sprofile} />
        <Stack.Screen name="Tannouncement" component={Tannouncement} />
        <Stack.Screen name="Sannouncement" component={Sannouncement} />
        <Stack.Screen name="Settest" component={Settest} />
        <Stack.Screen name="Tverify" component={Tverify} />

        <Stack.Screen name="Attend_test" component={Attend_test} />
        <Stack.Screen name="Tresult_list" component={Tresult_list} />
        <Stack.Screen name="Sresult_list" component={Sresult_list} />
        <Stack.Screen name="Tsignup" component={Tsignup} />
        <Stack.Screen name="Tprofile" component={Tprofile} />
        <Stack.Screen name="Tresult" component={Tresult} />
        <Stack.Screen name="Sresult" component={Sresult} />
        <Stack.Screen name="About" component={About} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const Login = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose who you are</Text>
      <View style={styles.buttonContainer}>
        <Animatable.View
          animation="fadeIn"
          delay={500}
          style={styles.buttonWrapper}>
          <Animatable.View animation="bounceIn" delay={700}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => props.navigation.navigate('Slogin')}>
              <Text style={styles.buttonText}>👨‍🎓</Text>
              <Text style={styles.buttonLabel}>Student</Text>
            </TouchableOpacity>
          </Animatable.View>
        </Animatable.View>
        <Animatable.View
          animation="fadeIn"
          delay={1000}
          style={styles.buttonWrapper}>
          <Animatable.View animation="bounceIn" delay={1200}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => props.navigation.navigate('Tverify')}>
              <Text style={styles.buttonText}>👩‍🏫</Text>
              <Text style={styles.buttonLabel}>Teacher</Text>
            </TouchableOpacity>
          </Animatable.View>
        </Animatable.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
  },
  buttonLabel: {
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  buttonWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 70,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default App;