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

export default class CustomDrawer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            image: null,
            email: '',
        }
    }

    componentWillMount() {
        AsyncStorage.getItem('@UserData:data').then((value) => {
            var data = JSON.parse(value);
            if (data !== null) {
                this.setState({ firstName: data.firstName });
                this.setState({ lastName: data.lastName });
                this.setState({ image: data.image });
                this.setState({ email: data.email });
            }
        });
    }

    logoutUser() {
        AsyncStorage.removeItem('@UserData:data');
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigation.navigate('Settings')}
                        style={styles.imageContainer}>
                        <UserImage />
                    </TouchableOpacity>
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
                </View>
            </ScrollView>
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
        padding: 10
    }
});