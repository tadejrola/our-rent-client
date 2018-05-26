import React, { Component } from 'react';
import { Image, AsyncStorage, StyleSheet, View, Text } from 'react-native';

export default class UserImage extends Component {
    render() {
        return (
            <View style={styles.loggedInUser}>
                <Text>{this.props.user.firstName} {this.props.user.lastName}</Text>
                <Text>{this.props.user.email}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    loggedInUser: {
        paddingBottom: 5,
        alignItems: 'center'
    }
});