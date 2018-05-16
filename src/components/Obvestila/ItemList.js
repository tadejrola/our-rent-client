import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'


const items = [
  { name: 'bla bla 1' },
  { name: 'jutri ne bo neta 1' },
  { name: 'popravi to' },
]

class ItemList extends Component {

  static navigationOptions = {
    title: 'Obvestila'
  }

  renderItem = (item, i) => {
    return (
      <TouchableOpacity
        key={i}
        style={styles.item}
        onPress={() => this.props.navigation.navigate('ObvestilaItem', { title: item.name })}
      >
        <Text style={styles.itemText}>{item.name}</Text>
      </TouchableOpacity>)
  }

  render() {
    return (
      <View style={styles.container}>
        {items.map(this.renderItem)}
      </View>
    )
  }
}

export default ItemList

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#2980b9',
    padding: 20,
  },
  text: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
  },
  item: {
    padding: 10,
  },
  itemText: {
    color: 'white',
    fontSize: 20,
  }
})
