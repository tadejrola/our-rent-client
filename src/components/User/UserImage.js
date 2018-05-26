import React, { Component } from 'react';
import { Image, AsyncStorage, StyleSheet } from 'react-native';

export default class UserImage extends Component {
    render() {
        return (
            <Image style={styles.image} source={this.props.user.image !== null ?
                { uri: this.props.user.image } : require('../../images/defaultProfile.png')} />
        )
    }
}

const styles = StyleSheet.create({
    image: {
        borderWidth: 2,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
        height: 150,
        backgroundColor: 'rgba(111, 202, 186, 1)',
        borderRadius: 100
    }
});