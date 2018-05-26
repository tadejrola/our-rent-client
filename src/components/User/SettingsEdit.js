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
import UserDataEditor from './UserDataEditor';

export default class SettingsEdit extends Component {
    static navigationOptions = {
        header: null
    }

    componentWillMount() {
        console.log(this.props.navigation.state.params.user);
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <TouchableOpacity style={styles.cancelButton} onPress={() => this.props.navigation.goBack()}>
                    <Icon name="remove" size={40} color="black" />
                </TouchableOpacity>
                <View style={styles.imageBox}>
                    <TouchableOpacity
                        style={styles.imageContainer}>
                        <UserImage user={{ image: this.props.navigation.state.params.user.image }} />
                    </TouchableOpacity>
                </View>
                <UserDataEditor navigation={this.props.navigation} user={this.props.navigation.state.params.user} />
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
    cancelButton: {
        position: 'absolute',
        zIndex: 10,
        alignSelf: 'flex-end',
        paddingTop: 5,
        paddingRight: 10
    }
});