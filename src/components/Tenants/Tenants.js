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
            title: 'Seznam najemnikov',
            headerRight: <TouchableOpacity
                style={styles.add}
                onPress={() => params.handleAdd && params.handleAdd()}>
                <Text>
                    <Icon name="plus" size={30} color="black" />
                </Text>
            </TouchableOpacity>
        }

    };

    componentDidMount() {
        this.props.navigation.setParams({
            handleAdd: () => this.props.navigation.navigate("AddTenant",
                {
                    objectId: this.state.id,
                    objectDescription: this.state.description,
                    objectAddress: this.state.address
                }
            )
        });
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
                <TenantsList
                    objectId={this.props.navigation.state.params.id}
                    objectDescription={this.props.navigation.state.params.description}
                    objectAddress={this.props.navigation.state.params.address}
                    navigation={this.props.navigation}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    add: {
        paddingRight: 10
    },
    headContainer: {
        alignItems: 'center',
        paddingTop: 10,
        backgroundColor: 'white'
    },
    objectName: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'black'
    },
    objectAddress: {
        fontSize: 16,
        color: 'black'
    }
});
