import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  DatePickerAndroid,
  ScrollView,
  Alert,
  AsyncStorage
} from 'react-native'

import { Button, CheckBox } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-datepicker'

class PopravilaEditor extends Component {

  static navigationOptions = {
    title: 'Pregled/urejanje popravila',
  };

  constructor(props) {
    super(props)
    let { item } = this.props.navigation.state.params;
    if (item.fixedDate != null) {
      item.fixedDate = item.fixedDate.substr(0, 10);
    }
    item.dateReported = item.dateReported.substr(0, 10);
    this.state = {
      id: item.id,
      description: item.description,
      fixed: !!+item.fixed,
      fixingCost: item.fixingCost,
      fixedDate: new Date(item.fixedDate),
      dateReported: new Date(item.dateReported),
      object_id: item.object_id,
      user_id: item.user_id,
    }
    console.log(this.state);
  }

  async saveBtnClick() {

    var dataBody = JSON.stringify({
      id: this.state.id,
      description: this.state.description,
      fixed: this.state.fixed,
      fixingCost: this.state.fixingCost,
      fixedDate: new Date(),
      dateReported: new Date(this.state.dateReported),
      object_id: this.state.object_id,
      user_id: this.state.user_id
    });
    console.log(dataBody);
    var result = await fetch('http://our-rent-api.herokuapp.com/api/maintenances/' + this.state.id, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: dataBody
    });
    if (result.status == 200) {
      this.showAlert("posodobljeno");
    }
    else {
      Alert.alert("Popravilo ni bilo posodobljeno. Preveri vpisane podatke. ");
    }

  }

  showAlert(about) {
    Alert.alert(
      'Popravilo je bilo ' + about,
      '',
      [
        { text: 'OK', onPress: () => this.props.navigation.navigate('MojeNajemnineList') }
      ],
      { cancelable: false })
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.text}>Opis</Text>
        <TextInput
          style={styles.input}
          value={this.state.description}
          onChangeText={description => this.setState({ description })}
          placeholder="Opis"
          autoCapitalize="words"
          keyboardType="default"
          onSubmitEditing={this._next}
          blurOnSubmit={false}
        />
        <Text style={styles.text}>Datum nastanka problema</Text>
        <DatePicker
          style={styles.datePicker}
          date={this.state.dateReported}
          mode="date"
          format="YYYY-MM-DD"
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
          onDateChange={(dateReported) => { this.setState({ dateReported: dateReported }) }}
        />
        <Text style={styles.text}>Je popravilo opravljeno?</Text>
        <CheckBox
          style={styles.fixedCheckBox}
          center
          checked={this.state.fixed}
          onPress={() => this.setState({ fixed: !this.state.fixed })}
        />
        {/* <DatePicker
          style={styles.datePicker}
          date={this.state.fixedDate}
          mode="date"
          format="YYYY-MM-DD"
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
          onDateChange={(fixedDate) => { this.setState({ fixedDate: fixedDate }) }}
        /> */}
        <Text style={styles.text}>Vrednost popravila</Text>
        <TextInput
          style={styles.input}
          value={this.state.fixingCost}
          onChangeText={fixingCost => this.setState({ fixingCost })}
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

export default PopravilaEditor

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
  fixedheckBox: {
    flex: 1,
    margin: 20
  }
});