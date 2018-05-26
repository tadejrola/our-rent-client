import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    FlatList,
    ActivityIndicator
} from 'react-native'

import { Button, List, ListItem } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

class MojeNajemnineItemPogodba extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.description + "- POGODBA"
    })

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            dataMaintenances: [],
            dataBills: [],
            error: null,
            refreshing: false
        };
    }


    componentDidMount() {

    }



    render() {
        return (
            <View>
                <Text>TODO: PODATKI O POGODBI</Text>
            </View>
        )
    }



};



export default MojeNajemnineItemPogodba
