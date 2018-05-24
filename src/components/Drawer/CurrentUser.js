import React, { Component } from 'react';
import { Image, AsyncStorage, StyleSheet, View, Text } from 'react-native';

export default class UserImage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: null,
            lastName: null,
            email: null
        }
    }

    componentDidMount() {
        this.update();
    }

    update() {
        AsyncStorage.getItem('@UserData:data').then((value) => {
            var data = JSON.parse(value);
            if (data !== null) {
                this.setState({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email
                });
            }
        });
    }

    render() {
        return (
            <View style={styles.loggedInUser}>
                <Text>{this.state.firstName} {this.state.lastName}</Text>
                <Text>{this.state.email}</Text>
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