import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Picker,
    ScrollView,
    AsyncStorage,
    Image,
    Button,
    CheckBox,
    NetInfo,
    Alert
} from 'react-native';
import OfflineNotice from '../InternetConnection/OfflineNotice'
import Spinner from 'react-native-loading-spinner-overlay';

export default class Settings extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            education: '',
            smoker: false,
            image: null,
            email: '',
            address: '',
            activityAnimating: false
        }
    }

    componentWillMount() {
        AsyncStorage.getItem('@UserData:data').then((value) => {
            var data = JSON.parse(value);
            if (data !== null) {
                this.setState({ id: data.id });
                this.setState({ firstName: data.firstName });
                this.setState({ lastName: data.lastName });
                this.setState({ phoneNumber: data.phoneNumber });
                this.setState({ education: data.education });
                this.setState({ smoker: data.smoker });
                this.setState({ image: data.image });
                this.setState({ email: data.email });
                this.setState({ address: data.address });
            }
        });
    }

    saveData() {
        this.setState({ activityAnimating: true });
        this.postData().then(() => {
            this.setState({ activityAnimating: false });
        });
    }


    async postData() {
        NetInfo.isConnected.fetch().then((value) => {
            if (value) {
                fetch('http://our-rent-api.herokuapp.com/api/users/' + this.state.id, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        firstName: this.state.firstName,
                        lastName: this.state.lastName,
                        phoneNumber: this.state.phoneNumber,
                        education: this.state.education,
                        smoker: this.state.smoker,
                        image: this.state.image,
                        address: this.state.address
                    }),
                }).then((value) => {
                    console.log(value);
                    Alert.alert(
                        'Post successful',
                        'Data saved!'
                    );
                }, (reason) => {
                    Alert.alert(
                        'Post unsuccessful',
                        'Fetch error!'
                    );
                });
            }
            else {
                Alert.alert(
                    'Post unsuccessful',
                    'No connection available!'
                );
            }
        }, (reason) => {
            Alert.alert(
                'Post unsuccessful',
                'NetInfo module error!'
            );
        });
    }

    //TODO: CHECKBOX NE DELA
    render() {
        return (
            <ScrollView style={styles.container}>
                <OfflineNotice />

                <Image style={styles.image} source={this.state.image !== null ?
                    { uri: this.state.image } : require('../../images/defaultProfile.png')} />
                <TextInput
                    editable={false}
                    style={styles.input}
                    value={this.state.image}
                    placeholder="Image url"
                    autoCapitalize="words"
                    keyboardType="default"
                    onSubmitEditing={this._next}
                    blurOnSubmit={false}
                />
                <Text style={styles.text}>Ime</Text>
                <TextInput
                    style={styles.input}
                    value={this.state.firstName}
                    onChangeText={firstName => this.setState({ firstName })}
                    placeholder="Ime"
                    autoCapitalize="words"
                    keyboardType="default"
                    onSubmitEditing={this._next}
                    blurOnSubmit={false}
                />
                <Text style={styles.text}>Priimek</Text>
                <TextInput
                    style={styles.input}
                    value={this.state.lastName}
                    onChangeText={lastName => this.setState({ lastName })}
                    placeholder="Priimek"
                    autoCapitalize="words"
                    keyboardType="default"
                    onSubmitEditing={this._next}
                    blurOnSubmit={false}
                />
                <Text style={styles.text}>Naslov</Text>
                <TextInput
                    style={styles.input}
                    value={this.state.address}
                    onChangeText={address => this.setState({ address })}
                    placeholder="Naslov"
                    autoCapitalize="words"
                    keyboardType="default"
                    onSubmitEditing={this._next}
                    blurOnSubmit={false}
                />
                <Text style={styles.text}>Telefon</Text>
                <TextInput
                    style={styles.input}
                    value={this.state.phoneNumber}
                    onChangeText={phoneNumber => this.setState({ phoneNumber })}
                    placeholder="Telefon"
                    autoCapitalize="words"
                    keyboardType="default"
                    onSubmitEditing={this._next}
                    blurOnSubmit={false}
                />
                <Text style={styles.text}>Izobrazba</Text>
                <TextInput
                    style={styles.input}
                    value={this.state.education}
                    onChangeText={education => this.setState({ education })}
                    placeholder="Izobrazba"
                    autoCapitalize="words"
                    keyboardType="default"
                    onSubmitEditing={this._next}
                    blurOnSubmit={false}
                />
                <View>
                    <Text style={styles.text}>Kadilec</Text>

                    <CheckBox
                        onValueChange={() => this.setState({ smoker: !this.state.smoker })}
                        style={styles.checkbox}
                        checked={this.state.smoker}
                    />
                </View>

                <Text style={styles.text}>Email</Text>
                <TextInput
                    editable={false}
                    style={styles.input}
                    value={this.state.email}
                    placeholder="Email"
                    autoCapitalize="words"
                    keyboardType="default"
                    onSubmitEditing={this._next}
                    blurOnSubmit={false}
                />
                <View style={styles.buttonContainer}>
                    <Button
                        large
                        icon={{ name: 'plus', type: 'octicon' }}
                        buttonStyle={styles.addButton}
                        title='Shrani'
                        onPress={() => this.saveData()} />
                </View>
                <Spinner visible={this.state.activityAnimating} />
            </ScrollView >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
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
        backgroundColor: 'rgba(111, 202, 186, 1)',
        borderRadius: 10
    },
    image: {
        width: 100,
        height: 100
    },
    checkbox: {
        marginTop: 10,
        margin: 20,
        marginBottom: 0,
        height: 44,
        paddingHorizontal: 10,
        borderRadius: 4,
        borderColor: '#ccc',
        borderWidth: 1
    }
});