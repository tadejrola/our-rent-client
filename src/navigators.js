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
import ImagePicker from './components/TenancyAgreement/ImagePicker'
import MojeNajemnineList from './components/MojeNajemnine/ItemList'
import MojeNajemnineItem from './components/MojeNajemnine/Item'
import MojeNajemnineZemljevid from './components/MojeNajemnine/MojeNajemnineZemljevid'
import MojeNajemnineItemZemljevid from './components/MojeNajemnine/MojeNajemnineItemZemljevid'
import MojeNajemnineItemPogodba from './components/MojeNajemnine/MojeNajemnineItemPogodba'
import MojeNajemninePopravilaList from './components/MojeNajemnine/MojeNajemninePopravila/ItemList'
import MojeNajemninePopravilaItem from './components/MojeNajemnine/MojeNajemninePopravila/Item'
import MojeNajemninePopravilaEditor from './components/MojeNajemnine/MojeNajemninePopravila/PopravilaEditor'
import MojeNajemninePopravilaAdd from './components/MojeNajemnine/MojeNajemninePopravila/PopravilaAdd'

import TenancyAgreementEditor from './components/TenancyAgreement/TenancyAgreementEditor'
import Tenants from './components/Tenants/Tenants'
import AddTenant from './components/Tenants/AddTenant'
import TenantOverview from './components/Tenants/TenantOverview'
import TenancyAgreementOverview from './components/TenancyAgreement/TenancyAgreementOverview'
import MojeNepremicnineList from './components/MojeNepremicnine/ItemList'
import MojeNepremicnineItem from './components/MojeNepremicnine/Item'
import NepremicninaEditor from './components/MojeNepremicnine/NepremicninaEditor'
import MojeNepremicnineZemljevid from './components/MojeNepremicnine/MojeNepremicnineZemljevid'
import MojeNepremicnineObveznostiList from './components/MojeNepremicnine/MojeNepremicnineObveznosti/ItemList'
import MojeNepremicnineObveznostiItem from './components/MojeNepremicnine/MojeNepremicnineObveznosti/Item'
import MojeNepremicnineObveznostEditor from './components/MojeNepremicnine/MojeNepremicnineObveznosti/ObveznostiEditor'

import ObvestilaList from './components/Obvestila/ItemList'
import ObvestilaItem from './components/Obvestila/Item'

import LoginScreen from './pages/Login'
import SignupScreen from './pages/Signup'

import Home from './pages/Home'

import SettingsScreen from './components/User/Settings'
import SettingsEditScreen from './components/User/SettingsEdit'

export const MojeNepremicnine = StackNavigator({
  MojeNepremicnineList: { screen: MojeNepremicnineList },
  MojeNepremicnineItem: { screen: MojeNepremicnineItem },
  MojeNepremicnineEditor: { screen: NepremicninaEditor },
  Tenants: { screen: Tenants },
  TenantOverview: { screen: TenantOverview },
  AddTenant: { screen: AddTenant },
  TenancyAgreementOverview: { screen: TenancyAgreementOverview },
  TenancyAgreementEditor: { screen: TenancyAgreementEditor },
  ImagePicker: { screen: ImagePicker },
  MojeNepremicnineZemljevid: { screen: MojeNepremicnineZemljevid },
  MojeNepremicnineObveznostiList: { screen: MojeNepremicnineObveznostiList },
  MojeNepremicnineObveznostiItem: { screen: MojeNepremicnineObveznostiItem },
  MojeNepremicnineObveznostEditor: { screen: MojeNepremicnineObveznostEditor }
}, {
    initialRouteName: 'MojeNepremicnineList',
  })

export const MojeNajemnine = StackNavigator({
  MojeNajemnineList: { screen: MojeNajemnineList },
  MojeNajemnineItem: { screen: MojeNajemnineItem },
  MojeNajemnineZemljevid: { screen: MojeNajemnineZemljevid },
  MojeNajemnineItemZemljevid: { screen: MojeNajemnineItemZemljevid },
  MojeNajemnineItemPogodba: { screen: MojeNajemnineItemPogodba },
  MojeNajemninePopravilaList: { screen: MojeNajemninePopravilaList },
  MojeNajemninePopravilaItem: { screen: MojeNajemninePopravilaItem },
  MojeNajemninePopravilaEditor: { screen: MojeNajemninePopravilaEditor },
  MojeNajemninePopravilaAdd: { screen: MojeNajemninePopravilaAdd }

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

export const Settings = StackNavigator({
  Settings: { screen: SettingsScreen },
  SettingsEdit: { screen: SettingsEditScreen }
}, {
    initialRouteName: 'Settings',
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
      title: "Nastavitve profila",
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