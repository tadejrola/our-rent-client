import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
} from 'react-native'

export default class TenancyAgreementEditor extends Component {

    static navigationOptions = {
        title: 'Dodajanje/urejanje pogodbe',
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
