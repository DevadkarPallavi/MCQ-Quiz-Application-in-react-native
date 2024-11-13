import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';

export const About = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text>{'\n'}</Text>
        <Image
          style={styles.stretch}
          source={require('../src/logo.png')}
        />
        <Text>{'\n'}</Text>
        <View>
          <Text style={{ color: 'black', fontStyle: 'italic', fontSize: 20, textAlign: 'center' }}>This App is Developed By Students of CSE TY - A as a 5th Semester Project{'\n'}</Text>
        </View>
        <View style={{ flex: 1, aligns: 'center' }}>
          
          <Text style={{ color: 'black', fontStyle: 'italic', fontSize: 20, textAlign: 'center' }}>
            Designed exclusively for collage students,This Quiz app transforms learning into an engaging and effective experience{'\n'}
          </Text>
          
          
          
          <Text style={{ color: 'black', textAlign: 'center', fontSize: 20, fontStyle: 'italic' }}>
            Thank you to our honorable Head of Department prof.Radhika Dhanal and Project Coordinator prof.Ranjita Jadhav for their support and guidance{'\n'}
          </Text>
          
          
          <Text style={{ alignSelf: 'center', color: 'black', fontSize: 25 }}>Our Group Members{'\n'}</Text>
          <View style={{ alignSelf: 'center' }}>
            <Image
              style={{ width: 345, height: 135 }}
              source={require('../src/shruti.jpeg')}
            />
            <Text>{'\n'}</Text>
          </View>
          <View style={{ alignSelf: 'center' }}>
            <Image
              style={{ width: 385, height: 160 }}
              source={require('../src/utkarsh.jpeg')}
            />
            <Text>{'\n'}</Text>
          </View>
          <View style={{ alignSelf: 'center' }}>
            <Image
              style={{ width: 385, height: 160 }}
              source={require('../src/vijay.jpeg')}
            />
            <Text>Name - Vijay Shete </Text>
            <Text>Roll No - 07</Text>
            <Text>Class - TY-A CSE</Text>
          </View>

          <View style={{ alignSelf: 'center' }}>
            <Image
              style={{ width: 400, height: 150, }}
              source={require('../src/pallavi.jpeg')}
            />
            <Text>{'\n'}</Text>
          </View>
          <Text style={{ alignSelf: 'center', color: 'black', fontSize: 18 }}>Contact us at tyg246713@gmail.com{'\n\n'}</Text>

        </View>

      </ScrollView>

    </View>

  );
};
const styles = StyleSheet.create({
  container: {
    flex: 10,
    //margin:50,
    backgroundColor: 'white'

  },
  stretch: {
    width: 360,
    height: 120,
    resizeMode: 'stretch',
    alignSelf: 'center'
  },
});

