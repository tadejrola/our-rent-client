import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Picker,
    ScrollView,
    Alert,
    AsyncStorage
} from 'react-native'

export default class TenancyAgreementEditor extends Component {

    static navigationOptions = {
        title: 'Dodajanje pogodbe',
    };

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <Text>Editor</Text>
        )
    }
}

const styles = StyleSheet.create({
});
