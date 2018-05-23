import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Picker,
  ScrollView,
  Alert,
  AsyncStorage
} from 'react-native'

import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

class NepremicninaEditor extends Component {

  static navigationOptions = {
    title: 'Nova nepremičnina',
  };

  constructor(props) {
    super(props)
    this.state = {
      id: null,
      description: null,
      category: null,
      address: null,
      houseNumber: null,
      city: null,
      zip: null,
      country: null
    }
  }

  componentWillMount() {
    AsyncStorage.getItem('@UserData:data').then((value) => {
      var data = JSON.parse(value);
      if (data !== null) {
        this.setState({ id: data.id });
      }
    });
  }

  async saveBtnClick() {
    var combinedAddress = this.state.address.concat(", ", this.state.houseNumber, ", ", this.state.zip, ", ", this.state.city, ", ", this.state.country);
    var result = await fetch('http://our-rent-api.herokuapp.com/api/objects/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description: this.state.description,
        category: this.state.category,
        image: "pod to neke slike",
        address: combinedAddress,
        user_id: this.state.id
      }),
    });
    var data = await result.json();
    if (!isNaN(data) && data !== false) {
      Alert.alert("Nepremičnina je bila shranjena");
    }
    else {
      Alert.alert("Nepremičnina ni bila shranjena. Preveri vpisane podatke. ");
    }
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.text}>Opis</Text>
        <TextInput
          style={styles.input}
          value={this.state.description}
          onChangeText={description => this.setState({ description })}
          placeholder="Opis objekta"
          autoCapitalize="words"
          keyboardType="default"
          onSubmitEditing={this._next}
          blurOnSubmit={false}
        />
        <Text style={styles.text}>Kategorija objekta</Text>
        <Picker
          selectedValue={this.state.category}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => this.setState({ category: itemValue })}>
          <Picker.Item label="Blok" value="Blok" />
          <Picker.Item label="Hiša" value="Hiša" />
          <Picker.Item label="Garaža" value="Garaža" />
        </Picker>
        <Text style={styles.text}>Naslov</Text>
        <TextInput
          style={styles.input}
          value={this.state.address}
          onChangeText={address => this.setState({ address })}
          placeholder="Naslov"
          autoCapitalize="words"
          keyboardType="default"
          onSubmitEditing={this._next}
          blurOnSubmit={false}
        />
        <Text style={styles.text}>Hišna številka</Text>
        <TextInput
          style={styles.input}
          value={this.state.houseNumber}
          onChangeText={houseNumber => this.setState({ houseNumber })}
          placeholder="Hišna številka"
          autoCapitalize="words"
          keyboardType="default"
          onSubmitEditing={this._next}
          blurOnSubmit={false}
        />
        <Text style={styles.text}>Kraj</Text>
        <TextInput
          style={styles.input}
          value={this.state.city}
          onChangeText={city => this.setState({ city })}
          placeholder="Kraj"
          autoCapitalize="words"
          keyboardType="default"
          onSubmitEditing={this._next}
          blurOnSubmit={false}
        />
        <Text style={styles.text}>Poštna številka</Text>
        <TextInput
          style={styles.input}
          value={this.state.zip}
          onChangeText={zip => this.setState({ zip })}
          placeholder="Poštna številka"
          autoCapitalize="words"
          keyboardType="default"
          onSubmitEditing={this._next}
          blurOnSubmit={false}
        />
        <Text style={styles.text}>Država</Text>
        <TextInput
          style={styles.input}
          value={this.state.country}
          onChangeText={country => this.setState({ country })}
          placeholder="Država"
          autoCapitalize="words"
          keyboardType="default"
          onSubmitEditing={this._next}
          blurOnSubmit={false}
        />
        <View style={styles.buttonContainer}>
          <Button
            large
            icon={{ name: 'plus', type: 'octicon' }}
            buttonStyle={styles.addButton}
            title='Shrani'
            onPress={this.saveBtnClick.bind(this)} />
        </View>
      </ScrollView>
    )
  }
}

export default NepremicninaEditor

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    marginTop: 10,
    marginLeft: 20,
    color: 'black',
    fontSize: 20
  },
  input: {
    marginTop: 10,
    margin: 20,
    marginBottom: 0,
    height: 44,
    paddingHorizontal: 10,
    borderRadius: 4,
    borderColor: '#ccc',
    borderWidth: 1,
    fontSize: 16,
  },
  picker: {
    marginTop: 10,
    margin: 20,
    marginBottom: 0,
    height: 44,
    borderRadius: 4,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  buttonContainer: {
    margin: 20,
  },
  addButton: {
    backgroundColor: 'rgba(111, 202, 186, 1)',
    borderRadius: 10
  }
});
