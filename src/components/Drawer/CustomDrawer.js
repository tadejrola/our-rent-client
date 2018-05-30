import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    AsyncStorage,
    ScrollView,
    Image,
    TouchableOpacity
} from 'react-native';

import { DrawerItems } from 'react-navigation'
import UserImage from '../User/UserImage';
import CurrentUser from './CurrentUser';
import { NavigationActions } from 'react-navigation'
import OfflineNotice from '../InternetConnection/OfflineNotice'

export default class CustomDrawer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            image: null,
            firstName: null,
            lastName: null,
            email: null
        }
    }

    componentDidMount() {
        this.update();
    }

    update() {
        AsyncStorage.getItem('@UserData:data').then((value) => {
            var data = JSON.parse(value);
            if (data !== null) {
                this.setState({
                    image: data.image,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email
                });
            }
        });
    }

    logoutUser() {
        AsyncStorage.removeItem('@UserData:data');
    }

    render() {
        return (
            <ScrollView>
                <OfflineNotice />
                <View style={styles.container}>
                    <View style={styles.userContainer}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigation.navigate('Settings')}
                            style={styles.imageContainer}>
                            <UserImage user={{ image: this.state.image }} />
                        </TouchableOpacity>
                        <CurrentUser user={{
                            firstName: this.state.firstName,
                            lastName: this.state.lastName,
                            email: this.state.email
                        }} />
                    </View>
                    <DrawerItems
                        {...this.props.navigation}
                        style={styles.drawerItems}
                        onItemPress={
                            ({ route, focused }) => {
                                route.key === "Login" ? this.logoutUser() : null;
                                () => this.props.navigation.navigation.dispatch(NavigationActions.reset({
                                    index: 0,
                                }));
                                this.props.navigation.onItemPress({ route, focused });
                            }
                        }
                    />
                </View >
            </ScrollView >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    drawerItems: {
        alignSelf: 'stretch',
    },
    imageContainer: {
        paddingTop: 10,
        paddingBottom: 5,
        backgroundColor: '#3399ff',
    },
    userContainer: {
        alignSelf: 'stretch',
        backgroundColor: '#3399ff',
        alignItems: 'center'
    }
});