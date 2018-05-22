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

// Navigators
import { DrawerNavigator, DrawerItems, StackNavigator } from 'react-navigation'

// StackNavigator screens
import MojeNajemnineList from './components/MojeNajemnine/ItemList'
import MojeNajemnineItem from './components/MojeNajemnine/Item'

import MojeNepremicnineList from './components/MojeNepremicnine/ItemList'
import MojeNepremicnineItem from './components/MojeNepremicnine/Item'
import NepremicninaEditor from './components/MojeNepremicnine/NepremicninaEditor'
import MojeNepremicnineZemljevid from './components/MojeNepremicnine/MojeNepremicnineZemljevid'

import ObvestilaList from './components/Obvestila/ItemList'
import ObvestilaItem from './components/Obvestila/Item'

import LoginScreen from './pages/Login'
import SignupScreen from './pages/Signup'

import Home from './pages/Home'

import Settings from './components/UserSettings/Settings'

export const MojeNepremicnine = StackNavigator({
  MojeNepremicnineList: { screen: MojeNepremicnineList },
  MojeNepremicnineItem: { screen: MojeNepremicnineItem },
  MojeNepremicnineEditor: { screen: NepremicninaEditor },
  MojeNepremicnineZemljevid: { screen: MojeNepremicnineZemljevid }
}, {
    initialRouteName: 'MojeNepremicnineList',
  })

export const MojeNajemnine = StackNavigator({
  MojeNajemnineList: { screen: MojeNajemnineList },
  MojeNajemnineItem: { screen: MojeNajemnineItem },
}, {
    initialRouteName: 'MojeNajemnineList',
  })

export const Obvestila = StackNavigator({
  ObvestilaList: { screen: ObvestilaList },
  ObvestilaItem: { screen: ObvestilaItem },
}, {
    initialRouteName: 'ObvestilaList',
  })

export const Login = StackNavigator({
  Login: { screen: LoginScreen },
  Signup: { screen: SignupScreen },
}, {
    initialRouteName: 'Login',
  })

const DrawerRoutes = {
  Home: {
    screen: Home,
    navigationOptions: {
      title: "Domov"
    }
  },
  MojeNepremicnine: {
    screen: MojeNepremicnine,
    navigationOptions: {
      title: "Moje nepremičnine"
    }
  },
  MojeNajemnine: {
    screen: MojeNajemnine,
    navigationOptions: {
      title: "Moje najemnine"
    }
  },
  Obvestila: {
    screen: Obvestila,
    navigationOptions: {
      title: "Popravila/obveznosti",
    }
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      title: "Nastavitve profila"
    }
  },
  Login: {
    screen: Login,
    navigationOptions: () => ({
      title: "Odjava",
      drawerLockMode: 'locked-closed'
    })
  }
};

function logoutUser() {
  AsyncStorage.removeItem('@UserData:data');
}
function userSettings() {
  //TODO: implementirat navigacijo na SETTINGS!!
}

const DrawerContent = (props) => {
  const nav = props.nav;

  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => userSettings()}
          style={styles.imageContainer}
        >
          <Image style={styles.image} source={require('./images/defaultProfile.png')} />
        </TouchableOpacity>
        <DrawerItems
          {...props}
          style={styles.drawerItems}
          onItemPress={
            ({ route, focused }) => {
              props.onItemPress({ route, focused });
              route.key === "Login" ? logoutUser() : null;
            }
          }
        />
      </View>
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  image: {
    width: 150,
    height: 150
  },
  drawerItems: {
    alignSelf: 'stretch',
  },
  imageContainer: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 150,
    backgroundColor: '#fff',
    borderRadius: 100,
  }
});

const RouteConfigs = {
  initialRouteName: 'Login',
  contentComponent: DrawerContent
};

export const Drawer = DrawerNavigator(DrawerRoutes, RouteConfigs);