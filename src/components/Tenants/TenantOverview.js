import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Text,
    Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import UserImage from '../User/UserImage';
import UserData from '../User/UserData';

export default class TenantOverview extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        return {
            title: params.user.firstName + " " + params.user.lastName,
            headerRight: <TouchableOpacity
                style={styles.add}
                onPress={() => params.handleAdd && params.handleAdd()}>
                <Text>
                    <Icon name="plus" size={30} color="black" />
                </Text>
            </TouchableOpacity>
        }

    };

    addAgreement() {
        Alert.alert("ADD aggrfghfsdr lol");
    }

    componentDidMount() {
        this.props.navigation.setParams({ handleAdd: () => this.addAgreement() });
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.imageBox}>
                    <View
                        style={styles.imageContainer}>
                        <UserImage user={{ image: this.props.navigation.state.params.user.image }} />
                    </View>
                </View>
                <UserData
                    user={{
                        firstName: this.props.navigation.state.params.user.firstName,
                        lastName: this.props.navigation.state.params.user.lastName,
                        phoneNumber: this.props.navigation.state.params.user.phoneNumber,
                        education: this.props.navigation.state.params.user.education,
                        job: this.props.navigation.state.params.user.job,
                        address: this.props.navigation.state.params.user.address,
                        email: this.props.navigation.state.params.user.email,
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
    add: {
        paddingRight: 10
    },
});