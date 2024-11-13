import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import database from '@react-native-firebase/database';

export const Tresult_list = ({ props }) => {
  const navigation = useNavigation();
  const [examNames, setExamNames] = useState([]);
  useEffect(() => {
    fetchExamNames();
  }, []);

  const fetchExamNames = () => {
    const dbRef = database().ref('exams');
    dbRef.once('value', (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const examList = Object.keys(data);
        setExamNames(examList);
      }
    });
  };

  const handleExamPress = async (examName) => {
    try {
      const examDataSnapshot = await database()
        .ref(`exams/${examName}`)
        .once('value');
      const examData = examDataSnapshot.val();
      navigation.navigate('Tresult', {selectedExamData: examData, examName });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select an Exam to attend</Text>
      <FlatList
        data={examNames}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.examItem}
            onPress={() => handleExamPress(item)}
          >
            <Text style={styles.examText}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  examItem: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    paddingVertical: 10,
  },
  examText: {
    fontSize: 18,
    color: 'black',
  },
});