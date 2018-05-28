import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    AsyncStorage,
    CheckBox,
    NetInfo,
    Alert,
    TouchableOpacity
} from 'react-native';
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

export default class UserDataEditor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            education: '',
            email: '',
            job: '',
            address: ''
        }
    }

    componentDidMount() {
        this.setState({
            id: this.props.user.id,
            firstName: this.props.user.firstName,
            lastName: this.props.user.lastName,
            phoneNumber: this.props.user.phoneNumber,
            education: this.props.user.education,
            email: this.props.user.email,
            job: this.props.user.job,
            address: this.props.user.address
        });
    }

    updateLocalStorage() {
        var data = this.props.user;
        data.firstName = this.state.firstName;
        data.lastName = this.state.lastName;
        data.phoneNumber = this.state.phoneNumber;
        data.education = this.state.education;
        data.job = this.state.job;
        data.address = this.state.address;
        AsyncStorage.setItem('@UserData:data', JSON.stringify(data)).then((data) => {
            Alert.alert(
                'Update successful',
                'Data saved!',
                [
                    { text: 'OK', onPress: () => this.props.navigation.goBack() },
                ],
                { cancelable: false }
            );
        });
    }

    postData() {
        NetInfo.isConnected.fetch().then((value) => {
            if (value) {
                fetch('http://our-rent-api.herokuapp.com/api/users/' + this.state.id, {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        firstName: this.state.firstName,
                        lastName: this.state.lastName,
                        phoneNumber: this.state.phoneNumber,
                        education: this.state.education,
                        job: this.state.job,
                        address: this.state.address
                    }),
                }).then((value) => {
                    this.updateLocalStorage();
                }, (reason) => {
                    Alert.alert(
                        'Update unsuccessful',
                        'Fetch error!'
                    );
                });
            }
            else {
                Alert.alert(
                    'Update unsuccessful',
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

    render() {
        return (
            <View>
                <Text style={styles.text}>Ime</Text>
                <TextInput
                    style={styles.input}
                    value={this.state.firstName}
                    onChangeText={firstName => this.setState({ firstName })}
                    placeholder="Ime"
                    autoCapitalize="words"
                    keyboardType="default"
                    underlineColorAndroid='rgba(0,0,0,0)'
                    onSubmitEditing={() => this.lastName.focus()}
                />
                <Text style={styles.text}>Priimek</Text>
                <TextInput
                    style={styles.input}
                    value={this.state.lastName}
                    onChangeText={lastName => this.setState({ lastName })}
                    placeholder="Priimek"
                    autoCapitalize="words"
                    keyboardType="default"
                    underlineColorAndroid='rgba(0,0,0,0)'
                    onSubmitEditing={() => this.address.focus()}
                    ref={(input) => this.lastName = input}
                />
                <Text style={styles.text}>Naslov</Text>
                <TextInput
                    style={styles.input}
                    value={this.state.address}
                    onChangeText={address => this.setState({ address })}
                    placeholder="Naslov"
                    autoCapitalize="words"
                    keyboardType="default"
                    underlineColorAndroid='rgba(0,0,0,0)'
                    onSubmitEditing={() => this.phoneNumber.focus()}
                    ref={(input) => this.address = input}
                />
                <Text style={styles.text}>Telefon</Text>
                <TextInput
                    style={styles.input}
                    value={this.state.phoneNumber}
                    onChangeText={phoneNumber => this.setState({ phoneNumber })}
                    placeholder="Telefon"
                    autoCapitalize="words"
                    keyboardType="default"
                    underlineColorAndroid='rgba(0,0,0,0)'
                    onSubmitEditing={() => this.education.focus()}
                    ref={(input) => this.phoneNumber = input}
                />
                <Text style={styles.text}>Izobrazba</Text>
                <TextInput
                    style={styles.input}
                    value={this.state.education}
                    onChangeText={education => this.setState({ education })}
                    placeholder="Izobrazba"
                    autoCapitalize="words"
                    keyboardType="default"
                    underlineColorAndroid='rgba(0,0,0,0)'
                    onSubmitEditing={() => this.job.focus()}
                    ref={(input) => this.education = input}
                />
                <Text style={styles.text}>Sluzba</Text>
                <TextInput
                    style={styles.input}
                    value={this.state.job}
                    onChangeText={job => this.setState({ job })}
                    placeholder="Sluzba"
                    autoCapitalize="words"
                    underlineColorAndroid='rgba(0,0,0,0)'
                    ref={(input) => this.job = input}
                />
                <Text style={styles.text}>Email</Text>
                <TextInput
                    editable={false}
                    style={styles.input}
                    value={this.state.email}
                    underlineColorAndroid='rgba(0,0,0,0)'
                />
                <View style={styles.buttonContainer}>
                    <Button
                        large
                        icon={{ name: 'plus', type: 'octicon' }}
                        buttonStyle={styles.addButton}
                        title='Shrani'
                        onPress={() => this.postData()} />
                </View>
            </View >
        )
    }
}

const styles = StyleSheet.create({
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
        backgroundColor: 'rgba(111, 202, 186, 1)',
        borderRadius: 10
    }
});