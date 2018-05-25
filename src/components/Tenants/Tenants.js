import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Alert,
    TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import TenantsList from './TenantsList';

export default class Tenants extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: null,
            description: null,
            address: null,
        }
    }

    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        return {
            title: 'Pregled najemnikov',
            headerRight: <TouchableOpacity
                style={styles.addUser}
                onPress={() => params.handleAdd && params.handleAdd()}>
                <Text>
                    <Icon name="plus" size={30} color="black" />
                </Text>
            </TouchableOpacity>
        }

    };

    addUser() {
        Alert.alert("ADD TENANT lol");
    }

    componentDidMount() {
        this.props.navigation.setParams({ handleAdd: () => this.addUser() });
        this.setState({
            id: this.props.navigation.state.params.id,
            address: this.props.navigation.state.params.address,
            description: this.props.navigation.state.params.description
        });
    }

    render() {
        return (
            <View>
                <View style={styles.headContainer}>
                    <Text style={styles.objectName}>{this.state.description}</Text>
                    <Text style={styles.objectAddress}>{this.state.address}</Text>
                </View>
                <TenantsList objectId={this.props.navigation.state.params.id} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    addUser: {
        paddingRight: 10
    },
    headContainer: {
        alignItems: 'center',
        padding: 10
    },
    objectName: {
        fontWeight: 'bold',
        fontSize: 20
    },
    objectAddress: {
        fontSize: 16
    }
});
