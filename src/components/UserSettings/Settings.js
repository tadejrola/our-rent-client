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
    CheckBox
} from 'react-native';

export default class Settings extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            education: '',
            smoker: false,
            image: '',
            email: '',
            address: '',
        }
    }

    saveData() {

    }

    componentWillMount() {
        AsyncStorage.getItem('@UserData:data').then((value) => {
            var data = JSON.parse(value);
            if (data !== null) {
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
    //TODO: CHECKBOX NE DELA
    render() {
        return (
            <ScrollView style={styles.container}>
                <Image style={styles.image} source={require('../../images/defaultProfile.png')} />
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
                    value={this.state.firstName}
                    onChangeText={firstName => this.setState({ firstName })}
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
                    placeholder="Izobrazba"
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
                        checked={this.state.checked}
                    />
                </View>

                <Text style={styles.text}>Email</Text>
                <TextInput
                    editable={false}
                    style={styles.input}
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}
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
    picker: {
        marginTop: 10,
        margin: 20,
        marginBottom: 0,
        height: 44,
        borderRadius: 4,
        borderColor: '#ccc',
        borderWidth: 1,
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