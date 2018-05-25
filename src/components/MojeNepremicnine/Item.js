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

  onRemoveBtnPressed() {
    Alert.alert(
      'Ali želiš izbrisati nepremičnino.',
      'Haa?',
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'OK', onPress: () => this.deleteObject() },
      ],
      { cancelable: false })
  }

  async deleteObject() {
    var objectID = this.props.navigation.state.params.id.toString();
    var result = await fetch('http://our-rent-api.herokuapp.com/api/objects/' + objectID, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    if (result.status == 200) {
      this.props.navigation.navigate('MojeNepremicnineList');
    }
    else {
      Alert.alert("Nepremičnine ni bilo mogoče odstraniti.");
    }
  }

  onEditButtonPressed() {
    Alert.alert("Edit");
  }

  onUsersButtonPressed() {
    this.props.navigation.navigate('Tenants')
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
    this.makeRemoteRequestMaintenances();
    this.makeRemoteRequestBills();
  }

  makeRemoteRequestMaintenances = () => {
    const url = `http://our-rent-api.herokuapp.com/api/maintenances`;
    this.setState({ loading: true });

    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          dataMaintenances: res,
          error: res.error || null,
          loading: false,
          refreshing: false
        });
        console.log(this.state.dataMaintenances);
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  makeRemoteRequestBills = () => {
    const url = `http://our-rent-api.herokuapp.com/api/utilityBills`;
    this.setState({ loading: true });

    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          dataBills: res,
          error: res.error || null,
          loading: false,
          refreshing: false
        });
        console.log(this.state.dataBills);
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topButtonContainer}>
          <View style={styles.containerFilterSort}>
            <TouchableOpacity style={styles.containerButtonComponent} onPress={() => this.onEditButtonPressed()}>
              <Text style={styles.text}><Icon name="edit" size={30} color="black" /></Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.containerButtonComponent} onPress={() => this.props.navigation.navigate('Tenants', this.props.navigation.state.params)}>
              <Text style={styles.text}><Icon name="users" size={30} color="black" /></Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.containerButtonComponent} onPress={() => this.onRemoveBtnPressed()}>
              <Text style={styles.text}><Icon name="remove" size={35} color="black" /></Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.informationContainer}>
          <View style={styles.containerObvestila}>
            <Text style={styles.text}><Icon name="gavel" size={20} color="black" /> Popravila</Text>
            <TouchableOpacity>
              <Text style={styles.textMore}><Icon name="ellipsis-h" size={28} color="black" /></Text>
            </TouchableOpacity>
            <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
              <FlatList
                data={this.state.dataMaintenances}
                renderItem={({ item }) => (
                  <ListItem
                    key={item.id}
                    onPress={() => this.props.navigation.navigate('ObvestilaItem', { title: item.description })}
                    roundAvatar
                    title={`${item.description} ${item.fixingCost}`}
                    subtitle={item.dateReported}
                    containerStyle={{ borderBottomWidth: 0 }}
                  />
                )}
                keyExtractor={item => item.id.toString()}
                ItemSeparatorComponent={this.renderSeparator}
                ListFooterComponent={this.renderFooter}
                onRefresh={this.handleRefresh}
                refreshing={this.state.refreshing}
              />
            </List>
          </View>
          <View style={styles.containerObveznosti}>
            <Text style={styles.text}><Icon name="credit-card" size={20} color="black" /> Obveznosti</Text>
            <TouchableOpacity >
              <Text style={styles.textMore}><Icon name="ellipsis-h" size={28} color="black" /></Text>
            </TouchableOpacity>

            <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
              <FlatList
                data={this.state.dataBills}
                renderItem={({ item }) => (
                  <ListItem
                    key={item.id}
                    onPress={() => this.props.navigation.navigate('ObvestilaItem', { title: item.description })}
                    roundAvatar
                    title={`${item.name} ${item.billAmount}`}
                    subtitle={item.description}
                    containerStyle={{ borderBottomWidth: 0 }}
                  />
                )}
                keyExtractor={item => item.id.toString()}
                ItemSeparatorComponent={this.renderSeparator}
                ListFooterComponent={this.renderFooter}
                onRefresh={this.handleRefresh}
                refreshing={this.state.refreshing}
              />
            </List>
          </View>
        </View>
      </View>
    )
  }
}
/*
<View style = {styles.informationContainer}>
          <Text style = {styles.title}>Podatki o nepremičnini</Text>
          <Text style = {styles.informationTitle}>Opis</Text>
          <Text style = {styles.text}>{`${this.props.navigation.state.params.description}`}</Text>
          <Text style = {styles.informationTitle}>Kategorija nepremičnine</Text>
          <Text style = {styles.text}>{`${this.props.navigation.state.params.category}`}</Text>
          <Text style = {styles.informationTitle}>Naslov</Text>
          <Text style = {styles.text}>{`${this.props.navigation.state.params.address}`}</Text>
        </View> */
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
