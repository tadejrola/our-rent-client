import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    AsyncStorage,
    Alert,
    ActivityIndicator,
    NetInfo
} from 'react-native';

export default class LoginForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: this.props.email,
            password: this.props.password,
            activityAnimating: false
        }
    }

    componentWillMount() {
        AsyncStorage.getItem('@UserData:email').then((value) => {
            this.setState({ email: value });
        });
        AsyncStorage.getItem('@UserData:password').then((value) => {
            this.setState({ password: value });
        });
        AsyncStorage.getItem('@UserData:id').then((value) => {
            this.setState({ id: value });
        });
        /*if (this.state.email !== null && this.state.password !== null && this.state.id !== null)
          return (this.props.navigation.navigate('Home'));*/
    }

    navigateToHomeScreen() {
        this.login().then(value => {
            if (value) {
                this.props.navigation.navigate('Home');
            }
        })
    }

    async login() {
        var isConnected = NetInfo.isConnected.fetch().then(isConnected => {
            return isConnected;
        });
        if (!this.state.email || !this.state.password) {
            Alert.alert(
                'Login unsuccessful',
                'No empty fields allowed!'
            );
            return false;
        }

        if (isConnected) {
            this.setState({ activityAnimating: true });
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
            if (!isNaN(data) && data !== false && data !== 0) {
                await AsyncStorage.setItem('@UserData:email', this.state.email);
                await AsyncStorage.setItem('@UserData:password', this.state.password);
                await AsyncStorage.setItem('@UserData:id', data.toString());
                return true;
            }
            else {
                Alert.alert(
                    'Login unsuccessful',
                    'Email or password is not correct!'
                )
            }
            this.setState({ activityAnimating: false });
        }
        else
            Alert.alert(
                'Login unsuccessful',
                'No connection available!'
            );
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