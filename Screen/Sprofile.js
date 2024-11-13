import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
export const Sprofile = ({ route }) => {
  const [myData, setMyData] = useState(null);
  //const email = route.params.userEmail;
  const navigation =useNavigation();
  useEffect(() => {
    getDatabase();
  }, []);

  const getDatabase = async () => {
    try {
      const data = await firestore()
        .collection('Sprofile')
        .doc(email)
        .get();

      setMyData(data._data);
      console.log(data._data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile</Text>
      {
        <View style={styles.infoContainer}>
          <View>
            <Text style={styles.label}>Full Name :</Text>
            <Text style={styles.value}>
              {myData ? myData.Name : 'loading...'}
            </Text>
          </View>
          <View>
            <Text style={styles.label}>Roll No :</Text>
            <Text style={styles.value}>
              {myData ? myData.Rollno : 'loading...'}
            </Text>
          </View>
          <View>
            <Text style={styles.label}>Unique Id :</Text>
            <Text style={styles.value}>{myData ? myData.En_no : 'loading...'}</Text>
          </View>
          <View>
            <Text style={styles.label}>Class :</Text>
            <Text style={styles.value}>{myData ? myData.Class : 'loading...'}</Text>
          </View>
          <View>
            <Text style={styles.label}>Division :</Text>
            <Text style={styles.value}>{myData ? myData.Div : 'loading...'}</Text>
          </View>
          <View>
            <Text style={styles.label}>Department :</Text>
            <Text style={styles.value}>{myData ? myData.Dep : 'loading...'}</Text>
          </View>
          <View>
            <Text style={styles.label}>Mail Id :</Text>
            <Text style={styles.value}>{myData ? myData.Mail : 'loading...'}</Text>
          </View>
          <View>
            <Text style={styles.label}>Passout Year :</Text>
            <Text style={styles.value}>{myData ? myData.Passout : 'loading...'}</Text>
          </View>
          <TouchableOpacity style={{ marginVertical: 20, alignItems: 'center', }}
           // onPress={() => navigation.navigate('Slogin')}
            >
            <Text style={{ color: 'red', fontWeight: 'bold' }}>Logout</Text>
          </TouchableOpacity>
        </View>
      }
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  label: {
    fontSize: 18,
    color: 'brown',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    color: 'black',
    marginBottom: 15,
  },
  loading: {
    marginTop: 20,
    color: 'black',
  },
});
