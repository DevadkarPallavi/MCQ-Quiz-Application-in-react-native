import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Alert,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import { Picker } from '@react-native-picker/picker';

export const Settest = ({route}) => {
  const [examName, setExamName] = useState('');
  const [numberOfQuestions, setNumberOfQuestions] = useState('');
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [teacherName, setTeacherName] = useState('');
  const email = route.params.userEmail;
  useEffect(() => {
    firestore()
      .collection('Tprofile')
      .doc(email)
      .get()
      .then((snapshot) => {
        const data = snapshot.data();
        if (data && data.Name) {
          setTeacherName(data.Name);
        }
      })
      .catch((error) => {
        console.error('Error fetching teacher name:', error.message);
      });
  }, []);

  const handleAddQuestions = () => {
    if (numberOfQuestions > 0) {
      const newQuestions = Array.from(
        { length: numberOfQuestions },
        (_, index) => ({
          question: '',
          options: {
            A: '',
            B: '',
            C: '',
            D: '',
          },
        }),
      );
      setQuestions(newQuestions);
      setAnswers(Array(numberOfQuestions).fill('Select Correct answer'));
    }
  };

  const handleSaveQuestions = async () => {
    try {
      if (examName.length === 0) {
        Alert.alert(
          'Enter Exam Name',
          'Please enter an exam name before saving questions.'
        );
        return;
      }

      const allquestions = questions.map((question, index) => ({
        sequence: index + 1,
        question: question.question,
        options: question.options,
        Ans: answers[index],
      }));

      const totalquestion = questions.length;

      const examData = {
        teacher: teacherName,
        allquestions,
        totalquestion,
      };

      await database().ref(`exams/${examName}`).set(examData);

      Alert.alert(
        'Questions Saved',
        'Questions have been saved to the database.'
      );
      setExamName('');
      setQuestions([]);
      setNumberOfQuestions(1);
      setAnswers([]);
    } catch (error) {
      console.error('Firebase Database Error:', error.message);
    }
  };

  const handleSelectCorrectAnswer = (value, index) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value.toUpperCase();
    setAnswers(updatedAnswers);
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar hidden={true} />
      <View>
        <Text style={styles.title}>Set Test</Text>
        <Text style={styles.label}>Exam Name:</Text>
        <TextInput
          style={styles.inputBox}
          placeholder="Enter Exam Name"
          value={examName}
          onChangeText={(text) => setExamName(text)}
          placeholderTextColor="gray"
        />
        <Text style={styles.label}>Number of Questions:</Text>
        <TextInput
          style={styles.inputBox}
          keyboardType="numeric"
          value={numberOfQuestions.toString()}
          onChangeText={(value) => setNumberOfQuestions(Number(value))}
          placeholder="Enter number of questions"
          placeholderTextColor="gray"
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddQuestions}>
          <Text style={styles.buttonText}>Add Questions</Text>
        </TouchableOpacity>
        <View>
          <Text>{'\n\n'}</Text>
        </View>
        {questions.map((question, index) => (
          <View key={index} style={styles.questionCard}>
            <Text style={styles.label}>Question {index + 1}:</Text>
            <TextInput
              style={styles.inputBox}
              placeholder={`Enter Question ${index + 1}`}
              value={question.question}
              onChangeText={(text) => {
                const updatedQuestions = [...questions];
                updatedQuestions[index].question = text;
                setQuestions(updatedQuestions);
              }}
              placeholderTextColor="gray"
            />
            <Text style={styles.label}>Options:</Text>
            {['A', 'B', 'C', 'D'].map((option) => (
              <TextInput
                key={option}
                style={styles.optionInput}
                placeholder={`Option ${option}`}
                value={question.options[option]}
                onChangeText={(text) => {
                  const updatedQuestions = [...questions];
                  updatedQuestions[index].options[option] = text;
                  setQuestions(updatedQuestions);
                }}
                placeholderTextColor="gray"
              />
            ))}
            <Text style={styles.label}>Correct Answer:</Text>
            <Picker
              selectedValue={answers[index]}
              style={styles.picker}
              onValueChange={(itemValue) => {
                handleSelectCorrectAnswer(itemValue, index);
              }}>
              <Picker.Item
                label="Select Correct answer"
                value=""
                color="white"
              />
              {['A', 'B', 'C', 'D'].map((option) => (
                <Picker.Item
                  key={option}
                  label={`Option ${option}`}
                  value={option}
                  color={answers[index] === 'white'}
                />
              ))}
            </Picker>
          </View>
        ))}
        {questions.length > 0 && (
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveQuestions}>
            <Text style={styles.buttonText}>Save Questions</Text>
          </TouchableOpacity>
        )}
      </View>
      <View>
        <Text>{'\n\n'}</Text>
      </View>
    </ScrollView>
  );
};

const { height, width } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  inputBox: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    color: 'black',
  },
  addButton: {
    backgroundColor: 'purple',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
  },
  saveButton: {
    backgroundColor: 'green',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  questionCard: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  optionInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: 'black',
  },
  picker: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: 'green',
  },
});
