import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import Logo from '../components/Login/Logo';
import Form from '../components/Login/LoginForm';
import Home from './Home';

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: null,
      password: null,
      id: null
    }
  }

  componentWillMount() {
    AsyncStorage.getItem('@UserData:email').then((value) => {
      this.setState({ email: value });
    });
    AsyncStorage.getItem('@UserData:password').then((value) => {
      this.setState({ password: value });
    });
    AsyncStorage.getItem('@UserData:id').then((value) => {
      this.setState({ id: value });
    });
  }

  static navigationOptions = {
    header: null
  }

  render() {
    if (this.state.email !== null && this.state.password !== null && this.state.id !== null)
      return (this.props.navigation.navigate('Home'));
    else
      return (
        <View style={styles.container}>
          <Logo />
          <Form type="Login" navigation={this.props.navigation} email={this.state.email} password={this.state.password} />
          <View style={styles.signupTextCont}>
            <Text style={styles.signupText}>Don't have an account yet?</Text>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Signup')}>
              <Text style={styles.signupButton}> Signup</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#455a64',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  signupTextCont: {
    flexGrow: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: 16,
    flexDirection: 'row'
  },
  signupText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 16
  },
  signupButton: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500'
  }
});