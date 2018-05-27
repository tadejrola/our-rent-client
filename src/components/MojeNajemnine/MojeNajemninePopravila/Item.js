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

import { Button, List, ListItem } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

class Item extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.description
  })

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      dataMaintenances: [],
      dataBills: [],
      error: null,
      refreshing: false
    };
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };

  renderHeader = () => {
    return <SearchBar placeholder="Vnesite iskalni niz" lightTheme round />;
  };

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  componentDidMount() {
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.informationContainer}>
          <View style={styles.containerObveznosti}>
            <Text>Pregled enega popravila</Text>
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
  containerFilterSort: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -25
  },
  containerButtonComponent: {
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
  topButtonContainer: {
    flex: 1
  },
  informationContainer: {
    flex: 6
  },
  informationTitle: {
    fontSize: 17,
    marginLeft: 5,
    padding: 5,
    color: 'black',
    fontWeight: 'bold',
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
  containerObveznosti: {
    flex: 3
  },
  textMore: {
    textAlign: 'right'
  }
})
