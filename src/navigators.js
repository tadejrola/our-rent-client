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
import { DrawerNavigator, StackNavigator } from 'react-navigation'

import CustomDrawer from './components/Drawer/CustomDrawer'

// StackNavigator screens
import MojeNajemnineList from './components/MojeNajemnine/ItemList'
import MojeNajemnineItem from './components/MojeNajemnine/Item'
import MojeNajemnineZemljevid from './components/MojeNajemnine/MojeNajemnineZemljevid'

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
  MojeNajemnineZemljevid: { screen: MojeNajemnineZemljevid },
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

const RouteConfigs = {
  initialRouteName: 'Login',
  contentComponent: (props) => {
    return <CustomDrawer navigation={props} />
  }
};

export const Drawer = DrawerNavigator(DrawerRoutes, RouteConfigs);