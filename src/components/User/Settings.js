import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Text,
    AsyncStorage
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import UserImage from './UserImage';
import UserData from './UserData';

export default class Settings extends Component {
    static navigationOptions = {
        header: null
    }

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
            image: null,
            address: '',
            user: {}
        }
    }
    componentDidMount() {
        this.getData();
    }

    componentDidUpdate() {
        this.getData();
    }

    getData() {
        AsyncStorage.getItem('@UserData:data').then((value) => {
            var data = JSON.parse(value);
            if (data !== null) {
                this.setState({
                    id: data.id,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    phoneNumber: data.phoneNumber,
                    education: data.education,
                    email: data.email,
                    job: data.job,
                    image: data.image,
                    address: data.address,
                    user: data
                });
            }
        });
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => this.props.navigation.navigate('SettingsEdit', { user: this.state.user })}>
                    <Icon name="edit" size={40} color="black" />
                </TouchableOpacity>
                <View style={styles.imageBox}>
                    <TouchableOpacity
                        style={styles.imageContainer}>
                        <UserImage user={{ image: this.state.image }} />
                    </TouchableOpacity>
                </View>
                <UserData user={{
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    phoneNumber: this.state.phoneNumber,
                    education: this.state.education,
                    job: this.state.job,
                    address: this.state.address,
                    email: this.state.email
                }} />
            </ScrollView >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    imageContainer: {
        padding: 10,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    imageBox: {
        backgroundColor: 'rgba(111, 202, 186, 1)'
    },
    editButton: {
        position: 'absolute',
        zIndex: 10,
        alignSelf: 'flex-end',
        padding: 10
    }
});