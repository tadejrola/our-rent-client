import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput, 
  Picker, 
  ScrollView, 
  Alert
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
        description: null,
        category: null,
        adress: null, 
        houseNumber: null, 
        city: null, 
        zip: null, 
        country: null
    }
  }
  
  saveBtnClick(){
   /* var result = await fetch('http://our-rent-api.herokuapp.com/api/countries/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                country: this.state.country
            }),
        });
        var data = await result.json();
        if (!isNaN(data) && data !== false) {
          var result2 = await fetch('http://our-rent-api.herokuapp.com/api/cities/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                city: this.state.city, 
                zip: this.state.zip,
                fkcountry: 1
            }),
          });
          var data1 = await result.json();
          if (!isNaN(data1) && data1 !== false) {
            var result3 = await fetch('http://our-rent-api.herokuapp.com/api/addresses/', {
              method: 'POST',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  adress: this.state.adress, 
                  houseNumber: this.state.houseNumber,
                  fkcity: 2
              }),
            });
            var data2 = await result.json();
            if (!isNaN(data2) && data2 !== false) {
              var result4 = await fetch('http://our-rent-api.herokuapp.com/api/addresses/', {
              method: 'POST',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  description: this.state.description, 
                  category: this.state.category,
                  image: "pod to neke slike",
                  address_id: 1,
                  user_id: 1
              }),
            });
            var data3 = await result.json();
            if (!isNaN(data3) && data3 !== false) {

            }
            }
          }
        }*/

        var result = fetch('http://our-rent-api.herokuapp.com/api/countries/', {
          method: 'POST',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              country: this.state.country
          }),
      });
        var result2 =  fetch('http://our-rent-api.herokuapp.com/api/cities/', {
          method: 'POST',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              city: this.state.city, 
              zip: this.state.zip,
              country_id: 1
          }),
        });
      
          var result3 =  fetch('http://our-rent-api.herokuapp.com/api/addresses/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                address: this.state.adress, 
                housenumber: this.state.houseNumber,
                fkcity: 1
            }),
          });
          

            var result4 =  fetch('http://our-rent-api.herokuapp.com/api/objects/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                description: this.state.description, 
                category: this.state.category,
                image: "pod to neke slike",
                address_id: 1,
                user_id: 1
            }),
          });

          Alert.alert(result3.json);
          
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style = {styles.text}>Opis</Text>
         <TextInput
          style={styles.input}
          value={this.state.description}
          onChangeText={description => this.setState({description})}
          placeholder="Opis objekta"
          autoCapitalize="words"
          keyboardType="default"
          onSubmitEditing={this._next}
          blurOnSubmit={false}
        />
        <Text style = {styles.text}>Kategorija objekta</Text>
        <Picker
          selectedValue={this.state.category}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => this.setState({category: itemValue})}>
          <Picker.Item label="Blok" value="Blok" />
          < Picker.Item label="Hiša" value="Hiša" />
          </Picker>
        <Text style = {styles.text}>Naslov</Text>
         <TextInput
          style={styles.input}
          value={this.state.adress}
          onChangeText={adress => this.setState({adress})}
          placeholder="Naslov"
          autoCapitalize="words"
          keyboardType="default"
          onSubmitEditing={this._next}
          blurOnSubmit={false}
        />
        <Text style = {styles.text}>Hišna številka</Text>
         <TextInput
          style={styles.input}
          value={this.state.houseNumber}
          onChangeText={houseNumber => this.setState({houseNumber})}
          placeholder="Hišna številka"
          autoCapitalize="words"
          keyboardType="default"
          onSubmitEditing={this._next}
          blurOnSubmit={false}
        />
         <Text style = {styles.text}>Kraj</Text>
         <TextInput
          style={styles.input}
          value={this.state.city}
          onChangeText={city => this.setState({city})}
          placeholder="Kraj"
          autoCapitalize="words"
          keyboardType="default"
          onSubmitEditing={this._next}
          blurOnSubmit={false}
        />
        <Text style = {styles.text}>Poštna številka</Text>
         <TextInput
          style={styles.input}
          value={this.state.zip}
          onChangeText={zip => this.setState({zip})}
          placeholder="Poštna številka"
          autoCapitalize="words"
          keyboardType="default"
          onSubmitEditing={this._next}
          blurOnSubmit={false}
        />
         <Text style = {styles.text}>Država</Text>
         <TextInput
          style={styles.input}
          value={this.state.country}
          onChangeText={country => this.setState({country})}
          placeholder="Država"
          autoCapitalize="words"
          keyboardType="default"
          onSubmitEditing={this._next}
          blurOnSubmit={false}
        />
        <View style = {styles.buttonContainer}>
        <Button
          large
          icon={{name: 'plus', type: 'octicon'}}
           buttonStyle = {styles.addButton}
           title='Shrani'
            onPress={this.saveBtnClick.bind(this)}/>
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
  picker:{
    marginTop: 10, 
    margin: 20,
    marginBottom: 0,
    height: 44,
    borderRadius: 4,
    borderColor: '#ccc',
    borderWidth: 1,
  }, 
  buttonContainer:{
    margin: 20,
  },
  addButton: {
    backgroundColor: 'rgba(111, 202, 186, 1)', 
    borderRadius: 10
  }
})
