import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    TouchableOpacity,
} from 'react-native';


import Logo from './Logo';
import Form from './SignupForm';
import { strings } from '../../../locales/i18n.js';

export default class Signup extends Component {
    static navigationOptions = {
        header: null
    }
    render() {
        return (
            <View style={styles.container}>
                <Logo />
                <Form type={strings('pages.signUp.typeSignup')} navigation={this.props.navigation} />
                <View style={styles.signupTextCont}>
                    <Text style={styles.signupText}>{strings('pages.signUp.haveAccount')}</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}><Text style={styles.signupButton}> {strings('pages.login.typeLogin')}</Text></TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#455a64',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    signupTextCont: {
        flexGrow: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingVertical: 16,
        flexDirection: 'row'
    },
    signupText: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 16
    },
    signupButton: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '500'
    }
});