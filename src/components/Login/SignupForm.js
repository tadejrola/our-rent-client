import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    NetInfo
} from 'react-native';

export default class SignupForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: null,
            password: null,
            repeatPassword: null,
            activityAnimating: false
        }
    }

    async register() {
        var isConnected = NetInfo.isConnected.fetch().then(isConnected => {
            return isConnected;
        });
        if (!this.state.email || !this.state.password || !this.state.repeatPassword) {
            Alert.alert(
                'Registration unsuccessful',
                'No empty fields allowed!'
            );
            return;
        }

        if (isConnected) {
            if (this.state.password === this.state.repeatPassword) {
                this.setState({ activityAnimating: true });
                var result = await fetch('http://our-rent-api.herokuapp.com/api/account/register', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: this.state.email,
                        password: this.state.password
                    }),
                });
                var data = await result.json();

                if (data === true) {
                    Alert.alert(
                        'Registration complete',
                        'You can login now!'
                    );
                    this.props.navigation.goBack();
                }
                else {
                    Alert.alert(
                        'Registration unsuccessful',
                        'User with same email already exists!'
                    )
                }
                this.setState({ activityAnimating: false });
            }
            else {
                Alert.alert(
                    'Registration unsuccessful',
                    'Passwords do not match!'
                );
            }
        }
        else
            Alert.alert(
                'Registration unsuccessful',
                'No connection available!'
            );
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.inputBox}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="Email"
                    placeholderTextColor="#ffffff"
                    selectionColor="#fff"
                    keyboardType="email-address"
                    onChangeText={(text) => this.setState({ email: text })}
                    onSubmitEditing={() => this.password.focus()}
                />
                <TextInput style={styles.inputBox}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="Password"
                    secureTextEntry={true}
                    placeholderTextColor="#ffffff"
                    onChangeText={(text) => this.setState({ password: text })}
                    ref={(input) => this.password = input}
                />
                <TextInput style={styles.inputBox}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="Repeat password"
                    secureTextEntry={true}
                    placeholderTextColor="#ffffff"
                    onChangeText={(text) => this.setState({ repeatPassword: text })}
                    ref={(input) => this.password = input}
                />
                <TouchableOpacity style={styles.button} onPress={() => this.register()}>
                    <Text style={styles.buttonText}>{this.props.type}</Text>
                </TouchableOpacity>
                <ActivityIndicator style={styles.activity} size="large" color="#ffffff" animating={this.state.activityAnimating} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    inputBox: {
        width: 300,
        backgroundColor: 'rgba(255, 255,255,0.2)',
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#ffffff',
        marginVertical: 10
    },
    button: {
        width: 300,
        backgroundColor: '#1c313a',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 13
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    }

});