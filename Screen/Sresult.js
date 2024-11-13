import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';

export const Sresult = ({ route }) => {
  const { selectedExamData, examName } = route.params;
  const [selectedOptions, setSelectedOptions] = useState(Array(selectedExamData.length).fill(''));
  const [userScore, setUserScore] = useState(null);
  const [Rollno, setRollno] = useState(null);
  const [answerStyles, setAnswerStyles] = useState(Array(selectedExamData.length).fill({}));

  const email = route.params.userEmail;

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
        } else {
          console.log('Document does not exist');
        }
      } catch (error) {
        console.error('Error fetching Rollno:', error);
      }
    };

    fetchRollno();
  }, [email]);

  useEffect(() => {
    const db = database();
    const scoreRef = db.ref(`results/${examName}/${Rollno}/score`);

    const scoreListener = scoreRef.on('value', (snapshot) => {
      const score = snapshot.val();
      setUserScore(score);
    });

    return () => {
      scoreRef.off('value', scoreListener);
    };
  }, [examName, Rollno]);

  const handleOptionPress = (questionIndex, option) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[questionIndex] = option;

    const correctAnswerRef = database().ref(`exams/${examName}/${questionIndex}/Ans`);

    correctAnswerRef.once('value').then((snapshot) => {
      const correctAnswer = snapshot.val();

      if (option === correctAnswer) {
        const updatedStyles = [...answerStyles];
        updatedStyles[questionIndex] = { backgroundColor: '#00FF00' };
        setAnswerStyles(updatedStyles);
      } else {
        const updatedStyles = [...answerStyles];
        updatedStyles[questionIndex] = { backgroundColor: 'red' };
        setAnswerStyles(updatedStyles);
      }

      setSelectedOptions(updatedOptions);
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{examName}</Text>
      <Text style={styles.Marks}>Your Score {userScore}/{selectedExamData.length}{'\n\n'}</Text>
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
                    selectedOptions[index] === option ? '#007AFF' : answerStyles[index].backgroundColor || '#f5f5f5',
                },
              ]}
              onPress={() => handleOptionPress(index, option)}
              disabled={true}
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
  Marks: {
    color: 'green',
    fontSize: 22,
  },
});
