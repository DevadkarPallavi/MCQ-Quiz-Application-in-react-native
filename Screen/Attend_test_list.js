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

export const Attend_test_list = ({ route }) => {
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

              if (userRollNo !== null) {
                const resultSnapshot = await database().ref(`results/${examName}`)
                  .child(userRollNo).once('value');
                const userResult = resultSnapshot.val();
                hasAttended = userResult !== null;
              }

              examDataArray.push({
                examName,
                examData,
                totalQuestions,
                teacherName,
                hasAttended,
              });
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
      {item.hasAttended ? (
        <Text style={styles.attendedText}>Attended</Text>
      ) : (
        <TouchableOpacity
          style={styles.attendButton}
          onPress={() => handleExamPress(item.examName, item.examData, item.hasAttended)}
        >
          <Text style={styles.attendButtonText}>Attend</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select an Exam to Attend</Text>
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
  attendButton: {
    backgroundColor: '#007bff',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  attendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  attendedText: {
    color: 'green',
    fontWeight: 'bold',
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
