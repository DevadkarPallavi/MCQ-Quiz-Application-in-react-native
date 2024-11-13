import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  FlatList,
  Alert,
  StyleSheet,
  Dimensions,
  Keyboard,
} from 'react-native';
import database from '@react-native-firebase/database';

export const Tannouncement = props => {
  const [inputTextValue, setInputTextValue] = useState('');
  const [announcementList, setAnnouncementList] = useState([]);
  const [isUpdateData, setIsUpdateData] = useState(false);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);

  useEffect(() => {
    getDatabase();
    return () => {
      const dbRef = database().ref('announcement');
      dbRef.off('value');
    };
  }, []);

  const getDatabase = () => {
    const dbRef = database().ref('announcement');
    dbRef.on('value', snapshot => {
      const data = snapshot.val();
      if (data) {
        const reversedData = Object.values(data).reverse();
        setAnnouncementList(Object.values(data));
      } else {
        setAnnouncementList([]);
      }
    });
  };

  const handleAddData = async () => {
    try {
      if (inputTextValue.length > 0) {
        const index = announcementList.length;
        const timestamp = new Date().toLocaleString();
        await database().ref(`announcement/${index}`).set({
          value: inputTextValue,
          timestamp: timestamp,
        });
        setInputTextValue('');
        Keyboard.dismiss();
      } else {
        Alert.alert('Enter Some Message', 'Please enter a Message');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateData = async () => {
    try {
      if (inputTextValue.length > 0) {
        await database().ref(`announcement/${selectedCardIndex}`).update({
          value: inputTextValue,
        });
        setInputTextValue('');
        setIsUpdateData(false);
        Keyboard.dismiss();
      } else {
        Alert.alert(
          'Enter Some Message',
          'Please enter message before updating.',
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCardPress = (cardIndex, cardValue) => {
    setIsUpdateData(true);
    setSelectedCardIndex(cardIndex);
    setInputTextValue(cardValue);
  };

  const handleCardLongPress = (cardIndex, cardValue) => {
    Alert.alert(
      'Is this Task Done',
      `Are you sure completed : ${cardValue} ?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => {
            console.log('Cancel button pressed.');
          },
        },
        {
          text: 'Mark as Completed',
          style: 'destructive',
          onPress: async () => {
            try {
              await database().ref(`announcement/${cardIndex}`).update({
                completed: true,
              });
              setInputTextValue('');
              setIsUpdateData(false);
            } catch (error) {
              console.error(error);
            }
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <View>
        <Text style={styles.title}></Text>
        <TextInput
          style={[styles.inputBox, {color: 'black'}]}
          placeholder="Enter a message "
          placeholderTextColor="#888"
          value={inputTextValue}
          onChangeText={value => setInputTextValue(value)}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddData}>
          <Text style={styles.buttonText}>Announce</Text>
        </TouchableOpacity>
      </View>

      <Text>{'\n'}</Text>
      <Text style={styles.sectionTitle}>Announcements</Text>
      <FlatList
        data={announcementList.filter(item => item !== null)}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              style={[styles.taskCard, {backgroundColor: 'white'}]}>
              <Text
                style={[
                  styles.taskText,
                  {
                    color: item.completed ? 'green' : 'black',
                  },
                ]}>
                {item.value}
              </Text>
              {item.timestamp && (
                <Text style={styles.dateTimeText}>{item.timestamp}</Text>
              )}
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const {height, width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    textAlign: 'center',
    fontSize: 36,
    fontWeight: 'bold',
    color: 'black',
    marginVertical: 30,
  },
  inputBox: {
    width: width - 130,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginVertical: 10,
    padding: 10,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: 'purple',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
  },
  updateButton: {
    backgroundColor: 'violet',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  taskCard: {
    width: width - 40,
    padding: 10,
    borderRadius: 0,
    marginVertical: 14,
    borderWidth: 0.5,
    borderColor: 'black',
  },
  taskText: {
    fontSize: 22,
  },
  dateTimeText: {
    fontSize: 12,
    color: '#888',
  },
});
