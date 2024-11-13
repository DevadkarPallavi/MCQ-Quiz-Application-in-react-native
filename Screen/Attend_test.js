import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert,TouchableOpacity, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';

export const Attend_test = ({ route }) => {
  const { selectedExamData, examName } = route.params;
  const [selectedOptions, setSelectedOptions] = useState(Array(selectedExamData.length).fill(''));
  const [Rollno, setRollno] = useState(null);

  const email = route.params.userEmail;
  const navigation = useNavigation();

  useEffect(() => {
    const fetchRollno = async () => {
      try {
        const document = await firestore()
          .collection('Sprofile')
          .doc(email)
          .get();

        if (document.exists) {
          const userData = document.data();
          const rollno = userData.Rollno;
          setRollno(rollno);
        } 
      } catch (error) {
        console.error('Error! Cant fetching Roll no.');
      }
    };

    fetchRollno();
  }, []);

  const handleOptionPress = (questionIndex, option) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[questionIndex] = option;
    setSelectedOptions(updatedOptions);
  };

  const handleSubmit = () => {
    const db = database();

    const score = selectedExamData.reduce((totalScore, question, index) => {
      if (selectedOptions[index] === question.Ans) {
        return totalScore + 1;
      }
      return totalScore;
    }, 0);

    navigation.navigate('Student_home');
    Alert.alert('Successfully Submited', 'Test submited successfully!');
    const resultData = {
      score,
      totalQuestions: selectedExamData.length,
    };

    selectedExamData.forEach((question, index) => {
      resultData[`${index}`] = selectedOptions[index];
    });
    db.ref(`results/${examName}/${Rollno}`).set(resultData);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{examName}</Text>
      {selectedExamData.map((question, index) => (
        <View key={index} style={styles.questionContainer}>
          <Text style={styles.questionText}>{`Q${index + 1}. ${question.question}`}</Text>
          {['A', 'B', 'C', 'D'].map((option, optionIndex) => (
            <TouchableOpacity
              key={optionIndex}
              style={[
                styles.option,
                {
                  backgroundColor:
                    selectedOptions[index] === option ? '#007AFF' : '#f5f5f5',
                },
              ]}
              onPress={() => handleOptionPress(index, option)}
            >
              <Text
                style={[
                  styles.optionText,
                  {
                    color: selectedOptions[index] === option ? 'white' : 'black',
                  },
                ]}
              >{`${option}: ${question.options[option]}`}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
        <Button title="Submit" onPress={handleSubmit} />
      <View><Text>{'\n\n'}</Text></View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
    alignSelf: 'center',
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  option: {
    borderRadius: 10,
    padding: 10,
    marginTop: 5,
  },
  optionText: {
    fontSize: 18,
  },
});
