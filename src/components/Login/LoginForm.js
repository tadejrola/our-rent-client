import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';

export default class LoginForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: null,
            password: null
        }
    }

    /*isLoggedIn() {
        console.log("get asyncstorage");
        this.state.email = await AsyncStorage.getItem('@UserData:email');
        console.log(this.state.email);
        this.state.password = await AsyncStorage.getItem('@UserData:password');
        console.log(this.state.password);
    }*/

    async login() {
        var result = await fetch('http://our-rent-api.herokuapp.com/api/account/login', {
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
        if (!isNaN(data)) {
            try {
                await AsyncStorage.setItem('@UserData:email', this.state.email);
                await AsyncStorage.setItem('@UserData:password', this.state.password);
                await AsyncStorage.setItem('@UserData:id', data.toString());
                this.props.navigation.navigate('Home');
            } catch (error) {
                console.log(error);
            }
        }
        else {
            //prijava neuspesna
        }
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
                >{this.state.email}</TextInput>
                <TextInput style={styles.inputBox}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="Password"
                    secureTextEntry={true}
                    placeholderTextColor="#ffffff"
                    onChangeText={(text) => this.setState({ password: text })}
                    ref={(input) => this.password = input}
                >{this.state.password}</TextInput>
                <TouchableOpacity style={styles.button} onPress={() => this.login()}>
                    <Text style={styles.buttonText}>{this.props.type}</Text>
                </TouchableOpacity>
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