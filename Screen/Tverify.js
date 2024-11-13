import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export const Tverify = props => {
  const [securityCode, setSecurityCode] = useState('');
  const code = '5';

  const handleVerify = () => {
    if (securityCode == code) {
      setSecurityCode('');
      props.navigation.navigate('Tlogin');
    } else {
      setSecurityCode('');
      alert('Invalid Code, Try again!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{'\n\n\n'}Teacher Verification</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Security Code"
        placeholderTextColor={'grey'}
        onChangeText={text => setSecurityCode(text)}
        value={securityCode}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
        <Text style={styles.verifyButtonText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  heading: {
    fontSize: 34,
    color: 'black',
    marginBottom: 40,
  },
  input: {
    width: '70%',
    height: 40,
    borderColor: 'gray',
    color: 'black',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  verifyButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  verifyButtonText: {
    color: 'white',
    fontSize: 18,
  },
});
