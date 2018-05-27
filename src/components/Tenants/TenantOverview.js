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
import TenancyAgreementsList from '../TenancyAgreement/TenancyAgreementsList';

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

    componentWillMount() {
        console.log(this.props.navigation.state.params);
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
                <View style={styles.headContainer}>
                    <Text style={styles.objectHeader}>Seznam sklenjenih pogodb</Text>
                    <Text style={styles.objectDescription}>{this.props.navigation.state.params.objectDescription}</Text>
                    <Text style={styles.objectAddress}>{this.props.navigation.state.params.objectAddress}</Text>
                </View>
                <TenancyAgreementsList
                    user={this.props.navigation.state.params.user}
                    navigation={this.props.navigation}
                    objectId={this.props.navigation.state.params.objectId}
                    objectDescription={this.props.navigation.state.params.objectDescription}
                    objectAddress={this.props.navigation.state.params.objectAddress}
                />
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
    headContainer: {
        alignItems: 'center',
        padding: 10,
    },
    objectHeader: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'black'
    },
    objectDescription: {
        fontSize: 16,
        color: 'black'
    },
    objectAddress: {
        fontSize: 12,
        color: 'black'
    }
});