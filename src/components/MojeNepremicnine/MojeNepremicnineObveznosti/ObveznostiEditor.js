import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  DatePickerAndroid,
  ScrollView,
  Alert,
} from 'react-native'

import { Button, CheckBox } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-datepicker'

class NepremicninaEditor extends Component {

  static navigationOptions = {
    title: 'Nova nepremičnina',
  };

  constructor(props) {
    super(props)
    this.state = {
      id: null,
      name: null,
      description: null,
      dueDate: new Date(),
      billAmount: null,
      image: null,
      paid: false, 
      objectID: null, 
      tenancyAgreement_id: 1, 
      isEditing: false
    }
  }

  /*componentWillMount() {
    AsyncStorage.getItem('@UserData:data').then((value) => {
      var data = JSON.parse(value);
      if (data !== null) {
        this.setState({ userId: data.id });
      }
    });
  }*/

  componentDidMount(){
   if('id' in this.props.navigation.state.params){
      this.setState({
        name: this.props.navigation.state.params.name,
        description: this.props.navigation.state.params.description,
        dueDate: this.props.navigation.state.params.dueDate,
        billAmount: this.props.navigation.state.params.billAmount,
        paid: this.props.navigation.state.params.paid,
        image: this.props.navigation.state.params.image,
        objectID: this.props.navigation.state.params.id,
        tenancyAgreement_id: this.props.navigation.state.params.tenancyAgreement_id,
        isEditing: true
      });
    }
    else{
      this.setState({
        objectID: this.props.navigation.state.params.objectID
      });
    }
  }

  async saveBtnClick() {

    await this.setState({ image: "https://cdn4.iconfinder.com/data/icons/eldorado-building/40/apartment-512.png" })

    var dataBody = JSON.stringify({
      billAmount: this.state.billAmount,
      paid: this.state.paid, 
      object_id: this.state.objectID,  
      tenancyAgreement_id: this.state.tenancyAgreement_id,
      name: this.state.name, 
      description: this.state.description,
      dueDate: this.state.dueDate,
      image: this.state.image
    });
  
    if (this.state.isEditing) {
      var result = await fetch('http://our-rent-api.herokuapp.com/api/utilityBills/'+this.state.objectID, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: dataBody,
      });
      if (result.status == 200) {
        this.showAlert('posodobljena');
      }
      else {
        Alert.alert("Obveznost ni bila posodobljena.");
      }
    }
    else {
      var result = await fetch('http://our-rent-api.herokuapp.com/api/utilityBills/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: dataBody
      });
      if (result.status == 200) {
        this.showAlert("shranjena");
      }
      else {
        Alert.alert("Obveznost ni bila shranjena. Preveri vpisane podatke. ");
      }
    }
  }

  showAlert(about){
    Alert.alert(
      'Obveznost je bila '+about,
      '',
      [
        {text: 'OK', onPress: () => this.props.navigation.navigate('MojeNepremicnineList')}
      ],
      { cancelable: false })
  }

  render() {
    return (
      <ScrollView style={styles.container}>
         <Text style={styles.text}>Naziv</Text>
         <TextInput
          style={styles.input}
          value={this.state.name}
          onChangeText={name => this.setState({ name })}
          placeholder="Naziv"
          autoCapitalize="words"
          keyboardType="default"
          onSubmitEditing={this._next}
          blurOnSubmit={false}
        />
        <Text style={styles.text}>Opis</Text>
        <TextInput
          style={styles.input}
          value={this.state.description}
          onChangeText={description => this.setState({ description })}
          placeholder="Opis obveznosti"
          autoCapitalize="words"
          keyboardType="default"
          onSubmitEditing={this._next}
          blurOnSubmit={false}
        />
        <Text style={styles.text}>Datum ...</Text>
        <DatePicker
            style={styles.datePicker}
            date={this.state.dueDate}
            mode="date"
            format="DD-MM-YYYY"
            customStyles={{
               dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              }
          }}
          onDateChange={(dueDate) => {this.setState({dueDate: dueDate})}}
          />
        <Text style={styles.text}>Je obveznost poravnana?</Text>
        <CheckBox 
          style = {styles.paidCheckBox}
          center
          checked={this.state.paid}
          onPress={() => this.setState({paid: !this.state.paid})}
        />
        <Text style={styles.text}>Vrednost</Text>
        <TextInput
          style={styles.input}
          value={this.state.billAmount}
          onChangeText={billAmount => this.setState({ billAmount })}
          placeholder="0.0"
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
  },
  datePicker: {
    flex: 1, 
    margin: 20
  }, 
  paidCheckBox: {
    flex: 1, 
    margin: 20
  }
});