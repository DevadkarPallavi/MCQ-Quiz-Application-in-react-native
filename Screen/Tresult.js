import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import database from '@react-native-firebase/database';
export const Tresult = ({ props, route }) => {
    const navigation = useNavigation();
    const { selectedExamData, examName } = route.params;
    const Rollno = '4';
    useEffect(() => {
        fetchExamNames();
    }, []);

    const fetchExamNames = () => {
        const dbRef = database().ref(`results/${examName}/${Rollno}`);
        dbRef.once('value', (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const examList = Object.keys(data);
                setExamNames(examList);
            }
        });
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select an Exam</Text>
            <FlatList
                data={examName}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.examItem}
                    >
                        <Text style={styles.examText}>{item}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'black',
    },
    examItem: {
        borderBottomWidth: 1,
        borderColor: 'gray',
        paddingVertical: 10,
    },
    examText: {
        fontSize: 18,
        color: 'black',
    },
});