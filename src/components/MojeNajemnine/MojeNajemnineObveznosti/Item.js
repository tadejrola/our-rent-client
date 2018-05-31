import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
  ActivityIndicator
} from 'react-native'

import { Button, CheckBox } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

class Item extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: "Pregled obveznosti"
  })

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      dataMaintenances: [],
      dataBills: [],
      error: null,
      refreshing: false,
      paid: false,
    };
  }




  componentDidMount() {
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.informationContainer}>
          <View style={styles.containerObveznosti}>
            <Text style={styles.title}>Pregled obveznosti</Text>

            <Text style={styles.atributteTitle}>Naziv</Text>
            <Text style={styles.text}>{`${this.props.navigation.state.params.name}`}</Text>

            <Text style={styles.atributteTitle}>Opis</Text>
            <Text style={styles.text}>{`${this.props.navigation.state.params.description}`}</Text>

            <Text style={styles.atributteTitle}>Rok plačila</Text>
            <Text style={styles.text}>{`${this.props.navigation.state.params.dueDate}`}</Text>

            <Text style={styles.atributteTitle}>Znesek</Text>
            <Text style={styles.text}>{`${this.props.navigation.state.params.billAmount}`}</Text>

            <Text style={styles.atributteTitle}>Je obveznost bila poravnana</Text>
            <CheckBox
              style={styles.paidCheckBox}
              center
              checked={this.state.paid}
              onPress={() => this.setState({ paid: !this.state.paid })}
            />

            <View style={styles.buttonContainer}>
            </View>
          </View>
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
  title: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  informationContainer: {
    flex: 6
  },
  text: {
    fontSize: 15,
    marginLeft: 5,
    padding: 5,
    color: 'black'
  },
  containerObvestila: {
    flex: 3,
    marginBottom: 25
  },
  atributteTitle: {
    marginTop: 20,
    marginLeft: 5,
    color: 'black',
    fontSize: 17,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  buttonContainer: {
    margin: 20,
  },
  addButton: {
    backgroundColor: 'rgba(111, 202, 186, 1)',
    borderRadius: 10
  }
})
