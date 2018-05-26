import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    AsyncStorage,
} from 'react-native';
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

export default class UserData extends Component {
    render() {
        return (
            <View style={styles.dataContainer}>
                <Text style={styles.text}>Ime</Text>
                <TextInput
                    editable={false}
                    style={styles.input}
                    value={this.props.user.firstName}
                    underlineColorAndroid='rgba(0,0,0,0)'
                />
                <Text style={styles.text}>Priimek</Text>
                <TextInput
                    editable={false}
                    style={styles.input}
                    value={this.props.user.lastName}
                    underlineColorAndroid='rgba(0,0,0,0)'
                />
                <Text style={styles.text}>Naslov</Text>
                <TextInput
                    editable={false}
                    style={styles.input}
                    value={this.props.user.address}
                    underlineColorAndroid='rgba(0,0,0,0)'
                />
                <Text style={styles.text}>Telefon</Text>
                <TextInput
                    editable={false}
                    style={styles.input}
                    value={this.props.user.phoneNumber}
                    underlineColorAndroid='rgba(0,0,0,0)'
                />
                <Text style={styles.text}>Izobrazba</Text>
                <TextInput
                    editable={false}
                    style={styles.input}
                    value={this.props.user.education}
                    underlineColorAndroid='rgba(0,0,0,0)'
                />
                <Text style={styles.text}>Sluzba</Text>
                <TextInput
                    editable={false}
                    style={styles.input}
                    value={this.props.user.job}
                    underlineColorAndroid='rgba(0,0,0,0)'
                />
                <Text style={styles.text}>Email</Text>
                <TextInput
                    editable={false}
                    style={styles.input}
                    value={this.props.user.email}
                    underlineColorAndroid='rgba(0,0,0,0)'
                />
            </View >
        )
    }
}

const styles = StyleSheet.create({
    dataContainer: {
        paddingBottom: 20
    },
    text: {
        marginTop: 10,
        marginLeft: 20,
        color: 'black',
        fontSize: 20
    },
    input: {
        marginTop: 10,
        margin: 20,
        marginBottom: 0,
        height: 44,
        paddingHorizontal: 10,
        borderRadius: 4,
        borderColor: '#ccc',
        borderWidth: 1,
        fontSize: 16,
        color: 'black'
    }
});