import React, { useState } from 'react';
import { ScrollView, View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

export const Tsignup = () => {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [En_no, setEnNo] = useState('');
  const [post, setpost] = useState('');
  const navigation = useNavigation();

  const handleSignup = async () => {
    try {
      const authUser = await auth().createUserWithEmailAndPassword(email, password);

      const userData = {
        Name: name,
        Dep: department,
        En_no: En_no,
        Mail: email,
        Post: post,
      };

      await firestore()
        .collection('Tprofile')
        .doc(email)
        .set(userData);

      setName('');
      setDepartment('');
      setEmail('');
      setPassword('');
      setEnNo('');
      setpost('');

      Alert.alert('Success', 'Account created successfully!', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Tlogin'),
        },
      ]);
    } catch (error) {
      console.error('Error: ', error);
      Alert.alert('Error', 'Account creation failed. Please try again.');
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="gray"
        value={name}
        onChangeText={setName}
      />
      <Picker
        selectedValue={department}
        style={styles.input}
        onValueChange={(itemValue) => setDepartment(itemValue)}>
        <Picker.Item label="Select Department" value="" />
        <Picker.Item label="CSE" value="CSE" />
        <Picker.Item label="ENTC" value="ENTC" />
      </Picker>
      <Picker
        selectedValue={post}
        style={styles.input}
        onValueChange={(itemValue) => setpost(itemValue)}>
        <Picker.Item label="Select Post" value="" />
        <Picker.Item label="Assistant Proffessor" value="Assistant Proffessor" />
        <Picker.Item label="Assosiate Proffessor" value="Assosiate Proffessor" />
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="EN Number"
        placeholderTextColor="gray"
        value={En_no}
        onChangeText={setEnNo}
        mode="outlined"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="gray"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        mode="outlined"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="gray"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign Up" onPress={handleSignup} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  input: {
    backgroundColor: 'white',
    color: 'black',
    marginBottom: 20,
    padding: 16,
    borderWidth: 0.5,
    borderColor: 'black',
    borderRadius: 8,
  },
});

export default Tsignup;