import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';

export const Sresult_list = ({ route }) => {
  const navigation = useNavigation();
  const [examData, setExamData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const email = route.params.userEmail;

  const fetchUserRollNo = async () => {
    try {
      const userProfileDoc = await firestore().collection('Sprofile').doc(email).get();
      const userData = userProfileDoc.data();
      if (userData) {
        return userData.Rollno;
      }
      return null;
    } catch (error) {
      console.error('Error fetching user roll number:', error);
      return null;
    }
  };

  const handleExamPress = async (examName, examData, hasAttended) => {
    if (!hasAttended) {
      navigation.navigate('Attend_test', {
        userEmail: email,
        selectedExamData: examData,
        examName,
      });
    }
  };

  useEffect(() => {
    const fetchExamData = async () => {
      try {
        const dbRef = database().ref('exams');
        const snapshot = await dbRef.once('value');
        const data = snapshot.val();

        if (data) {
          const examList = Object.keys(data);
          const examDataArray = [];

          for (const examName of examList) {
            const examDataSnapshot = await database()
              .ref(`exams/${examName}/allquestions`)
              .once('value');
            const examData = examDataSnapshot.val();
            const totalQuestionSnapshot = await database()
              .ref(`exams/${examName}/totalquestion`)
              .once('value');
            const totalQuestions = totalQuestionSnapshot.val();

            const teacherNameSnapshot = await database()
              .ref(`exams/${examName}/teacher`)
              .once('value');
            const teacherName = teacherNameSnapshot.val();

            if (examData) {
              const userRollNo = await fetchUserRollNo();
              let hasAttended = false;
              let userScore = '';

              if (userRollNo !== null) {
                const resultSnapshot = await database().ref(`results/${examName}`)
                  .child(userRollNo).once('value');
                const userScoreSnapshot = await database().ref(`results/${examName}`)
                  .child(userRollNo).child('score').once('value');
                const scoreValue = userScoreSnapshot.val();

                hasAttended = scoreValue !== null;
                userScore = hasAttended ? `Score: ${scoreValue}` : 'Not Attended';
              }

              if (hasAttended) {
                examDataArray.push({
                  examName,
                  examData,
                  totalQuestions,
                  teacherName,
                  hasAttended,
                  userScore,
                });
              }
            }
          }

          setExamData(examDataArray);
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchExamData();
  }, []);

  const renderExamItem = ({ item }) => (
    <View style={styles.examItem}>
      <View>
        <Text style={styles.examNameText}>{item.examName}</Text>
        <Text style={styles.questionCountText}>Questions: {item.totalQuestions}</Text>
        <Text style={styles.teacherNameText}>Prof. {item.teacherName}</Text>
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <Text style={styles.scoreText}>{item.userScore}/{item.totalQuestions}</Text>
        <TouchableOpacity
          style={{ marginTop: 10 }}
        >
          <Text style={{ fontSize: 15, color: 'blue' }}>View</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>View Result</Text>
      {isLoading ? (
        <ActivityIndicator size="large" color="#007bff" style={styles.loadingIndicator} />
      ) : (
        <FlatList
          data={examData}
          keyExtractor={(item) => item.examName}
          renderItem={renderExamItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
    alignSelf: 'center',
  },
  examItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
    marginVertical: 5,
  },
  examNameText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  questionCountText: {
    fontSize: 14,
    color: '#555',
  },
  teacherNameText: {
    fontSize: 14,
    color: '#555',
  },
  scoreText: {
    fontSize: 16,
    color: 'black',
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
