import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    AsyncStorage,
    Alert,
    NetInfo
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

export default class LoginForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: null,
            password: null,
            id: null,
            activityAnimating: false
        }
    }

    componentWillMount() {
        AsyncStorage.getItem('@UserData:data').then((value) => {
            var data = JSON.parse(value);
            if (data !== null) {
                this.setState({ email: data.email });
                this.setState({ password: data.password });
                this.setState({ id: data.id });
            }
        });
    }

    navigateToHomeScreen() {
        this.setState({ activityAnimating: true });
        this.login().then(value => {
            this.setState({ activityAnimating: false });
            if (value) {
                this.props.navigation.navigate('Home');
            }
        });
    }

    async login() {
        isConnected = NetInfo.isConnected.fetch().then(value => {
            return value;
        });
        if (!this.state.email || !this.state.password) {
            Alert.alert(
                'Login unsuccessful',
                'No empty fields allowed!'
            );
            return false;
        }
        if (isConnected === true) {
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
            if (!isNaN(data.id) && data !== false && data.id !== 0) {
                await AsyncStorage.setItem('@UserData:data', JSON.stringify(data));
                return true;
            }
            else {
                Alert.alert(
                    'Login unsuccessful',
                    'Email or password is not correct!'
                )
            }
        }
        else {
            Alert.alert(
                'Login unsuccessful',
                'No connection available!'
            );
        }
        return false;
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
                <TouchableOpacity style={styles.button} onPress={() => this.navigateToHomeScreen()}>
                    <Text style={styles.buttonText}>{this.props.type}</Text>
                </TouchableOpacity>
                <Spinner visible={this.state.activityAnimating} cancelable={true} />
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