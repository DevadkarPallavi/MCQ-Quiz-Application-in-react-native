import React, { useState } from 'react';
import { ScrollView, View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

export const Ssignup = () => {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [classValue, setClass] = useState('');
  const [division, setDivision] = useState('');
  const [roll, setRoll] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [En_no, setEnNo] = useState('');
  const [Passout, setPassout] = useState('');
  const navigation = useNavigation();

  const handleSignup = async () => {
    try {
      const authUser = await auth().createUserWithEmailAndPassword(email, password);

      const userData = {
        Name: name,
        Dep: department,
        Class: classValue,
        Div: division,
        Rollno: roll,
        En_no: En_no,
        Mail: email,
        Passout: Passout,
      };

      await firestore()
        .collection('Sprofile')
        .doc(email)
        .set(userData);

      Alert.alert('Success', 'Account created successfully!', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Slogin'),
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
      <TextInput
        style={styles.input}
        placeholder="Roll NO"
        placeholderTextColor="gray"
        value={roll}
        onChangeText={setRoll}
        mode="outlined"
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
        selectedValue={classValue}
        style={styles.input}
        onValueChange={(itemValue) => setClass(itemValue)}>
        <Picker.Item label="Select Class" value="" />
        <Picker.Item label="FY" value="FY" />
        <Picker.Item label="SY" value="SY" />
        <Picker.Item label="TY" value="TY" />
        <Picker.Item label="BTECH" value="BTECH" />
      </Picker>
      <Picker
        selectedValue={division}
        style={styles.input}
        onValueChange={(itemValue) => setDivision(itemValue)}>
        <Picker.Item label="Select Division" value="" />
        <Picker.Item label="A" value="A" />
        <Picker.Item label="B" value="B" />
        <Picker.Item label="C" value="C" />
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
        placeholder="Year of Passout"
        placeholderTextColor="gray"
        value={Passout}
        onChangeText={setPassout}
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

export default Ssignup;
