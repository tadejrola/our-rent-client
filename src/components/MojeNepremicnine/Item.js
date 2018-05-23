import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

class Item extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.description
  })

  render() {
    return (
      <View style = {styles.container}>
        <View style = {styles.topButtonContainer}>
          <View style={styles.containerFilterSort}>
            <View style={styles.containerFilter}>
              <Text style={styles.text}><Icon name="plus" size={25} color="black" /> Dodaj</Text>
            </View>
            <View style={styles.containerSort}>
              <Text style={styles.text}><Icon name="edit" size={30} color="black" /> </Text>
            </View>
          </View>
        </View>
        <View style = {styles.informationContainer}>
          <Text style = {styles.title}>Podatki o nepremičnini.</Text>
          <Text style = {styles.informationTitle}>Opis</Text>
          <Text style = {styles.text}>{`${this.props.navigation.state.params.description}`}.</Text>
          <Text style = {styles.informationTitle}>Kategorija nepremičnine</Text>
          <Text style = {styles.text}>{`${this.props.navigation.state.params.category}`}.</Text>
          <Text style = {styles.informationTitle}>Naslov</Text>
          <Text style = {styles.text}>{`${this.props.navigation.state.params.address}`}.</Text>
        </View>
      </View>
    )
  }
}

export default Item

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 10
  },
  containerFilterSort: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -25
  },
  containerFilter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerSort: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold'
  },
  topButtonContainer:{
    flex: 1
  },
  informationContainer: {
    flex: 6
  },
  informationTitle: {
    fontSize: 17,
    marginLeft: 5,
    padding: 5,
    color: 'black'
  },
  text:{
    fontSize: 15,
    marginLeft: 5,
    fontWeight: 'bold',
    padding: 5,
    color: 'black'
  } 
})
