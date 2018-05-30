import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    AsyncStorage,
    CheckBox,
    Alert,
    TouchableOpacity,
    NetInfo
} from 'react-native';
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

export default class AddTenant extends Component {
    static navigationOptions = {
        title: 'Dodajanje najemnika',
    };

    constructor(props) {
        super(props)
        this.state = {
            objectId: null,
            objectDescription: null,
            objectAddress: null,
            email: null,
        }
    }

    postData() {
        NetInfo.isConnected.fetch().then((value) => {
            if (value) {
                fetch('http://our-rent-api.herokuapp.com/api/tenancyAgreements/addObjectUser', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        object_id: this.state.objectId,
                        email: this.state.email,
                    }),
                }).then((value) => {
                    Alert.alert(
                        'Save successful',
                        'Data saved!',
                        [
                            { text: 'OK', onPress: () => this.props.navigation.goBack() },
                        ],
                        { cancelable: false }
                    );
                }, (reason) => {
                    Alert.alert(
                        'Save unsuccessful',
                        'Fetch error!'
                    );
                });
            }
            else {
                Alert.alert(
                    'Save unsuccessful',
                    'No connection available!'
                );
            }
        }, (reason) => {
            Alert.alert(
                'Update unsuccessful',
                'NetInfo module error!'
            );
        });
    }

    componentDidMount() {
        this.setState({
            objectId: this.props.navigation.state.params.objectId,
            objectDescription: this.props.navigation.state.params.objectDescription,
            objectAddress: this.props.navigation.state.params.objectAddress
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headContainer}>
                    <Text style={styles.objectDescription}>{this.state.objectDescription}</Text>
                    <Text style={styles.objectAddress}>{this.state.objectAddress}</Text>
                </View>
                <View>
                    <Text style={styles.text}>Email uporabnika</Text>
                    <TextInput
                        style={styles.input}
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}
                        placeholder="Vnesi email uporabnika"
                        autoCapitalize="none"
                        keyboardType="default"
                        underlineColorAndroid='rgba(0,0,0,0)'
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        large
                        icon={{ name: 'plus', type: 'octicon' }}
                        buttonStyle={styles.addButton}
                        title='Shrani'
                        onPress={() => this.postData()} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    objectDescription: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'black'
    },
    objectAddress: {
        fontSize: 16,
        color: 'black'
    },
    headContainer: {
        alignItems: 'center',
        padding: 10,
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
    },
    buttonContainer: {
        margin: 20,
    },
    addButton: {
        backgroundColor: '#3399ff',
        borderRadius: 10
    }
});
