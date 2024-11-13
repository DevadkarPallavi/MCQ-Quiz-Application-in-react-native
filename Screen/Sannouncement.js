import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';
import database from '@react-native-firebase/database';

export const Sannouncement = props => {
  const [announcementList, setAnnouncementList] = useState([]);

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
        setAnnouncementList(reversedData);
      } else {
        setAnnouncementList([]);
      }
    });
  };

  const renderAnnouncement = ({item, index}) => {
    return (
      <View style={styles.taskCard}>
        <Text
          style={[
            styles.taskText,
            {
              color: 'black',
            },
          ]}>
          {item.value}
        </Text>
        {item.timestamp && (
          <Text style={styles.dateTimeText}>{item.timestamp}</Text>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <Text style={styles.title}>Announcements</Text>
      <FlatList
        data={announcementList.filter(item => item !== null)}
        renderItem={renderAnnouncement}
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
    color: 'gray',
  },
});
