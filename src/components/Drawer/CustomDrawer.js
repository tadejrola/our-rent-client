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
import UserImage from '../UserSettings/UserImage';
import CurrentUser from './CurrentUser';

export default class CustomDrawer extends Component {
    logoutUser() {
        AsyncStorage.removeItem('@UserData:data');
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.userContainer}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigation.navigate('Settings')}
                            style={styles.imageContainer}>
                            <UserImage />
                        </TouchableOpacity>
                        <CurrentUser />
                    </View>
                    <DrawerItems
                        {...this.props.navigation}
                        style={styles.drawerItems}
                        onItemPress={
                            ({ route, focused }) => {
                                this.props.navigation.onItemPress({ route, focused });
                                route.key === "Login" ? this.logoutUser() : null;
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
        backgroundColor: 'rgba(111, 202, 186, 1)',
    },
    userContainer: {
        alignSelf: 'stretch',
        backgroundColor: 'rgba(111, 202, 186, 1)',
        alignItems: 'center'
    }
});