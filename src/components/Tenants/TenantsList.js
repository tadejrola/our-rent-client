import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet
} from 'react-native'

export default class TenantsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            objectId: null,
        }
    }

    componentDidMount() {
        this.setState({ objectId: this.props.objectId });
    }

    render() {
        return (
            <View>
                <Text>
                    Prikazi za: {this.state.objectId}
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
});
