import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

export const Student_home = ({ route }) => {
  const navigation = useNavigation();
  const userEmail = 'vaishalimalav432@gmail.com';

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#4682b4', '#778899', '#add8e6', '#4682b4']}
        style={styles.gradientContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}></Text>
        </View>
        <View style={styles.buttonContainer}>
          <Animatable.View animation="fadeInLeft" delay={500} duration={1000}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Sprofile', { userEmail: userEmail })}>
              <View style={{ margin: 10 }}>
                <Image
                  style={{
                    width: 70,
                    height: 70,
                    resizeMode: 'stretch',
                  }}
                  source={require('../src/assets/profile.png')}
                />
              </View>
              <Text style={styles.buttonText}>Profile</Text>
            </TouchableOpacity>
          </Animatable.View>
          <Animatable.View animation="fadeInRight" delay={700} duration={1000}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Attend_test_list', { userEmail: userEmail })}>
              <View style={{ margin: 10 }}>
                <Image
                  style={{
                    width: 70,
                    height: 70,
                    resizeMode: 'stretch',
                  }}
                  source={require('../src/assets/attendtest.png')}
                />
              </View>
              <Text style={styles.buttonText}>Attend Test</Text>
            </TouchableOpacity>
          </Animatable.View>
          <Animatable.View animation="fadeInLeft" delay={900} duration={1000}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Sresult_list', { userEmail: userEmail })}>
              <View style={{ margin: 10 }}>
                <Image
                  style={{
                    width: 70,
                    height: 70,
                    resizeMode: 'stretch',
                  }}
                  source={require('../src/assets/viewresult.png')}
                />
              </View>
              <Text style={styles.buttonText}>Result</Text>
            </TouchableOpacity>
          </Animatable.View>
          <Animatable.View animation="fadeInRight" delay={1100} duration={1000}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Sannouncement')}>
              <View style={{ margin: 10 }}>
                <Image
                  style={{
                    width: 70,
                    height: 70,
                    resizeMode: 'stretch',
                  }}
                  source={require('../src/assets/announcement.png')}
                />
              </View>
              <Text style={styles.buttonText}>Announcement</Text>
            </TouchableOpacity>
          </Animatable.View>
          <Animatable.View animation="fadeInUp" delay={1300} duration={1000}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('About')}>
              <View style={{ margin: 10 }}>
                <Image
                  style={{
                    width: 70,
                    height: 70,
                    resizeMode: 'stretch',
                  }}
                  source={require('../src/assets/about.png')}
                />
              </View>
              <Text style={styles.buttonText}>About</Text>
            </TouchableOpacity>
          </Animatable.View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  titleContainer: {
    marginVertical: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
  },
  button: {
    width: 150,
    height: 150,
    marginVertical: 20,
    borderRadius: 15,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'black',
  },
  buttonText: {
    marginTop: 10,
    color: 'black',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
