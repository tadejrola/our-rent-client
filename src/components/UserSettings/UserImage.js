import React, { Component } from 'react';
import { Image, AsyncStorage, StyleSheet } from 'react-native';

export default class UserImage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            image: null
        }
    }

    componentWillMount() {
        AsyncStorage.getItem('@UserData:data').then((value) => {
            var data = JSON.parse(value);
            if (data !== null) {
                this.setState({ image: data.image });
            }
        });
    }

    render() {
        return (
            <Image style={styles.image} source={this.state.image !== null ?
                { uri: this.state.image } : require('../../images/defaultProfile.png')} />
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