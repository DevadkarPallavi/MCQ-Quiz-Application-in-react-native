import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

export class Attend_test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [
        {
          id: 1,
          text: 'What is our Group name',
          options: ['G1', 'G2', 'G3', 'G4'],
          correctAnswer: 2,
          selectedOption: null,
        },
        {
          id: 2,
          text: 'Which department we belong from?',
          options: ['CSE', 'ENTC', 'DS', 'AIML'],
          correctAnswer: 0,
          selectedOption: null,
        },
        {
          id: 3,
          text: 'Which batch we Belong from?',
          options: ['T1', 'T2', 'T3', 'T4'],
          correctAnswer: 0,
          selectedOption: null,
        },
        {
          id: 4,
          text: 'Timing of our college',
          options: ['8-4', '9-1', '9-4', '8-5'],
          correctAnswer: 2,
          selectedOption: null,
        },
        {
          id: 5,
          text: 'Name of our project co-ordinator',
          options: ['A J Jadhav', 'R S Jadhav', 'K T Mane', 'J S Jitkar'],
          correctAnswer: 1,
          selectedOption: null,
        },
        {
          id: 6,
          text: 'Number of our Classroom?',
          options: ['202', '203', '304', '405'],
          correctAnswer: 2,
          selectedOption: null,
        },
      ],
      isTestSubmitted: false,
      timeLeft: 0.4 * 60,
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      if (this.state.timeLeft > 0 && !this.state.isTestSubmitted) {
        this.setState(prevState => ({timeLeft: prevState.timeLeft - 1}));
        if (this.state.timeLeft == 20) {
          <text>Be quick</text>;
        }
      } else if (this.state.timeLeft === 0 && !this.state.isTestSubmitted) {
        clearInterval(this.timer);
        this.handleSubmit();
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  handleAnswer = (questionIndex, optionIndex) => {
    if (!this.state.isTestSubmitted) {
      const updatedQuestions = [...this.state.questions];
      updatedQuestions[questionIndex].selectedOption = optionIndex;
      this.setState({questions: updatedQuestions});
    }
  };

  handleSubmit = () => {
    this.setState({isTestSubmitted: true});
    clearInterval(this.timer);

    const {questions} = this.state;
    let score = 0;

    for (const question of questions) {
      if (question.selectedOption === question.correctAnswer) {
        score++;
      }
    }

    this.setState({score});
  };

  formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')} : ${String(
      remainingSeconds,
    ).padStart(2, '0')}`;
  }

  render() {
    const {questions, isTestSubmitted, timeLeft, score} = this.state;
    const totalQuestions = questions.length;
    const questionsAttempted = questions.filter(
      question => question.selectedOption !== null,
    ).length;

    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>
          {isTestSubmitted ? 'Test Has Been Submitted' : 'G3 Test Page'}
        </Text>
        <Text style={styles.statusText}>
          {`Questions Attempted: ${questionsAttempted} / ${totalQuestions}`}
          {'\n'}
          {`Time Left: ${this.formatTime(timeLeft)}`}
        </Text>

        <ScrollView style={styles.container}>
      <Text style={styles.title}>Attend Test{'\n'}</Text>
      {selectedExamData.map((question, index) => (
        <View key={index} style={styles.questionContainer}>
          <Text style={styles.questionText}>{`Q${index + 1}. ${question.question}`}</Text>
          <View style={styles.optionsContainer}>
            {['A', 'B', 'C', 'D'].map((optionKey, optionIndex) => (
              <Text key={optionIndex} style={styles.optionText}>
                {` ${optionKey}: ${question.options[optionKey.toLowerCase()]}`}
              </Text>
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'White',
    padding: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 10,
    backgroundColor: 'violet',
    color: '#fff',
  },
  statusText: {
    fontSize: 16,
    backgroundColor: 'violet',
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 60,
  },
  questionContainer: {
    marginBottom: 0,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  option: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 500,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  submitButton: {
    alignSelf: 'center',
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 1,
  },
  submitButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  submitMessageContainer: {
    alignSelf: 'center',
    marginTop: 20,
  },
  submitMessageText: {
    fontSize: 18,
    color: 'red',
    fontWeight: 'bold',
  },
});
