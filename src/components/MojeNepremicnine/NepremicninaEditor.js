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
      userId: null,
      description: null,
      category: null,
      address: null,
      houseNumber: null,
      city: null,
      zip: null,
      country: null,
      image: null,
      isEditing: false, 
      objectID: null
    }
  }

  componentWillMount() {
    AsyncStorage.getItem('@UserData:data').then((value) => {
      var data = JSON.parse(value);
      if (data !== null) {
        this.setState({ userId: data.id });
      }
    });
  }

  componentDidMount(){
   if('id' in this.props.navigation.state.params){
      var combinedAddress = this.props.navigation.state.params.address.split(", ");
      this.setState({
        userId: this.props.navigation.state.params.user_id,
        description: this.props.navigation.state.params.description,
        category: this.props.navigation.state.params.category,
        address:combinedAddress[0],
        houseNumber: combinedAddress[1],
        zip: combinedAddress[2],
        city: combinedAddress[3],
        country: combinedAddress[4],
        image: this.props.navigation.state.params.image,
        objectID: this.props.navigation.state.params.id,
        isEditing: true
      });
    }
  }

  async saveBtnClick() {
    var combinedAddress = this.state.address.concat(", ", this.state.houseNumber, ", ", this.state.zip, ", ", this.state.city, ", ", this.state.country);
    if (this.state.category == null || this.state.category == "") {
      await this.setState({ category: "Stanovanje" })
    }

    if (this.state.category == "Stanovanje") {
      await this.setState({ image: "https://cdn4.iconfinder.com/data/icons/eldorado-building/40/apartment-512.png" })
    }
    else if (this.state.category == "Hiša") {
      await this.setState({ image: "https://cdn4.iconfinder.com/data/icons/icon-flat-icon-set/50/home-512.png" })
    }
    else if (this.state.category == "Garaža") {
      await this.setState({ image: "http://icons.iconarchive.com/icons/icons8/windows-8/512/Household-Garage-icon.png" })
    }
    var dataBody = JSON.stringify({
      description: this.state.description,
      category: this.state.category,
      image: this.state.image,
      address: combinedAddress,
      user_id: this.state.userId
    });

    if (this.state.isEditing) {
      var result = await fetch('http://our-rent-api.herokuapp.com/api/objects/'+this.state.objectID, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: dataBody,
      });
      if (result.status == 200) {
        Alert.alert("Nepremičnina je bila posodobljena");
      }
      else {
        Alert.alert("Nepremičnina ni bila posodobljena. ");
      }
    }
    else {
      var result = await fetch('http://our-rent-api.herokuapp.com/api/objects/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: dataBody
      });
      if (result.status == 200) {
        Alert.alert("Nepremičnina je bila shranjena");
      }
      else {
        Alert.alert("Nepremičnina ni bila shranjena. Preveri vpisane podatke. ");
      }
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
          <Picker.Item label="Stanovanje" value="Stanovanje" />
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
