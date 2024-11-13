import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Input, Button} from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

export const Tlogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const [errorMessage, setErrorMessage] = useState(null);

  const handleLogin = async () => {
    try {
      if (email.length > 0 && password.length > 0) {
        await auth().signInWithEmailAndPassword(email, password);
        navigation.navigate('Teacher_home');
      } else {
        setErrorMessage('Please Enter ID & Password');
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const clearErrorMessage = () => {
    setErrorMessage(null);
  };

  const handleEmailChange = text => {
    setEmail(text);
    clearErrorMessage();
  };

  const handlePasswordChange = text => {
    setPassword(text);
    clearErrorMessage();
  };

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeIn" style={styles.header}>
        <Text style={styles.headerText}>Teacher Login</Text>
      </Animatable.View>
      <Animatable.View animation="slideInUp" style={styles.footer}>
        <Input
          placeholder="User ID"
          onChangeText={handleEmailChange}
          onFocus={clearErrorMessage}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          onChangeText={handlePasswordChange}
          onFocus={clearErrorMessage}
        />
        <Button
          title="Login"
          buttonStyle={styles.loginButton}
          onPress={handleLogin}
        />

        {errorMessage && (
          <Text style={styles.errorMessage}>Invalid id or password</Text>
        )}

        <TouchableOpacity>
          <Text
            style={styles.signup}
            onPress={() => navigation.navigate('Tsignup')}>
            Signup
          </Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 50,
    fontWeight: 'bold',
  },
  footer: {
    flex: 2,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  loginButton: {
    backgroundColor: '#003f5c',
    marginTop: 20,
  },
  signup: {
    textAlign: 'center',
    marginTop: 20,
    color: '#003f5c',
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});
