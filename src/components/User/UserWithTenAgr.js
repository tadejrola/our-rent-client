import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import UserImage from './UserImage';
import UserData from './UserData';

export default class UserWithTenAgr extends Component {
    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.imageBox}>
                    <View
                        style={styles.imageContainer}>
                        <UserImage />
                    </View>
                </View>
                <UserData />
            </ScrollView >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    imageContainer: {
        padding: 10,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    imageBox: {
        backgroundColor: 'rgba(111, 202, 186, 1)'
    }
});