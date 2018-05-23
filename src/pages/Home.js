import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>HOME ZASLON</Text>
      </View>
    )
  }
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white'
  },
  text: {
    color: 'black',
    fontSize: 40,
    fontWeight: 'bold',
  }
})
