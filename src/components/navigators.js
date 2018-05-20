import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

// Navigators
import { DrawerNavigator, StackNavigator, TabNavigator } from 'react-navigation'

// StackNavigator screens
import MojeNajemnineList from './MojeNajemnine/ItemList'
import MojeNajemnineItem from './MojeNajemnine/Item'

import MojeNepremicnineList from './MojeNepremicnine/ItemList'
import MojeNepremicnineItem from './MojeNepremicnine/Item'

import ObvestilaList from './Obvestila/ItemList'
import ObvestilaItem from './Obvestila/Item'

import Home from './Home'

export const MojeNepremicnine = StackNavigator({
  MojeNepremicnineList: { screen: MojeNepremicnineList },
  MojeNepremicnineItem: { screen: MojeNepremicnineItem },
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

export const Drawer = DrawerNavigator({
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
      title: "Popravila/obveznosti"
    }
  }

})
