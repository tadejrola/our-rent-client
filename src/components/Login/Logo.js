import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';
import { strings } from '../../../locales/i18n.js';

export default class Logo extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.image}
                    source={require('../../images/logo.png')} />
                <Text style={styles.logoText}>{strings('components.login.logo.welcome')}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    logoText: {
        marginVertical: 15,
        fontSize: 18,
        color: 'rgba(255, 255, 255, 0.7)'
    },
    image: {
        width: 150,
        height: 150
    }
});