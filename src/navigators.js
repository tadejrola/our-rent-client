import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  ScrollView
} from 'react-native';

// Navigators
import { DrawerNavigator, DrawerItems, StackNavigator } from 'react-navigation'

// StackNavigator screens
import MojeNajemnineList from './components/MojeNajemnine/ItemList'
import MojeNajemnineItem from './components/MojeNajemnine/Item'

import MojeNepremicnineList from './components/MojeNepremicnine/ItemList'
import MojeNepremicnineItem from './components/MojeNepremicnine/Item'
import NepremicninaEditor from './components/MojeNepremicnine/NepremicninaEditor'

import ObvestilaList from './components/Obvestila/ItemList'
import ObvestilaItem from './components/Obvestila/Item'

import LoginScreen from './pages/Login'
import SignupScreen from './pages/Signup'

import Home from './pages/Home'

export const MojeNepremicnine = StackNavigator({
  MojeNepremicnineList: { screen: MojeNepremicnineList },
  MojeNepremicnineItem: { screen: MojeNepremicnineItem },
  MojeNepremicnineEditor: { screen: NepremicninaEditor}
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
  Login: {
    screen: Login,
    navigationOptions: () => ({
      title: "Odjava",
      drawerLockMode: 'locked-closed'
    })
  }
};

function logoutUser() {
  AsyncStorage.removeItem('@UserData:email');
  AsyncStorage.removeItem('@UserData:password');
  AsyncStorage.removeItem('@UserData:id');
}

const DrawerContent = (props) => {
  const nav = props.nav;

  return (
    <View>
      <ScrollView>
        <DrawerItems
          {...props}
          onItemPress={
            ({ route, focused }) => {
              props.onItemPress({ route, focused })
              route.key === "Login" ? logoutUser() : null
            }
          }
        />
      </ScrollView>
    </View>
  )
};

const RouteConfigs = {
  initialRouteName: 'Login',
  contentComponent: DrawerContent
};

export const Drawer = DrawerNavigator(DrawerRoutes, RouteConfigs);