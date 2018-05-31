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
    title: "Pregled obveznosti"
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
    this.props.navigation.navigate('MojeNepremicnineEditor', this.props.navigation.state.params);
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
    const url = 'http://our-rent-api.herokuapp.com/api/maintenances/objectMaintenance/' + this.props.navigation.state.params.id;
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
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  makeRemoteRequestBills = () => {
    const url = 'http://our-rent-api.herokuapp.com/api/utilityBills/objectUtilityBill/' + this.props.navigation.state.params.id;
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
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerButtons}>
          <View style={styles.containerEdit}>
            <Text style={styles.text} onPress={() => this.onEditButtonPressed()}><Icon name="edit" size={30} color="black" /></Text>

          </View>

          <View style={styles.containerTenants}>
            <Text style={styles.text} onPress={() => this.props.navigation.navigate('Tenants', this.props.navigation.state.params)}><Icon name="users" size={30} color="black" /></Text>

          </View>
          <View style={styles.containerRemove}>
            <Text style={styles.text} onPress={() => this.onRemoveBtnPressed()}><Icon name="remove" size={30} color="black" /></Text>
          </View>
        </View>
        <View style={styles.containerObvestila}>
          <Text style={styles.text}><Icon name="gavel" size={20} color="black" /> Popravila</Text>
          <TouchableOpacity style={styles.TouchableOpacityStyle} onPress={() => this.props.navigation.navigate('MojeNepremicninePopravilaList', { object_id: this.props.navigation.state.params.id })}>
            <Text style={styles.textMore}><Icon name="ellipsis-h" size={28} color="black" /></Text>
          </TouchableOpacity>
          <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
            <FlatList
              data={this.state.dataMaintenances}
              renderItem={({ item }) => (
                <ListItem
                  key={item.id}
                  onPress={() => this.props.navigation.navigate('MojeNepremicninePopravilaItem', { item: item })}
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
          <TouchableOpacity style={styles.TouchableOpacityStyle} onPress={() => this.props.navigation.navigate('MojeNepremicnineObveznostiList', { object_id: this.props.navigation.state.params.id })} >
            <Text style={styles.textMore}><Icon name="ellipsis-h" size={28} color="black" /> </Text>
          </TouchableOpacity>

          <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
            <FlatList
              data={this.state.dataBills}
              renderItem={({ item }) => (
                <ListItem
                  key={item.id}
                  onPress={() => this.props.navigation.navigate('MojeNepremicnineObveznostiItem', item)}
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
    )
  }
}

export default Item

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'white',
    padding: 10
  },
  text: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: -20
  },
  textMore: {
    textAlign: 'right'
  },
  TouchableOpacityStyle: {
    marginBottom: -20
  },
  containerObvestila: {
    flex: 3,
    marginBottom: 25
  },
  containerObveznosti: {
    flex: 3
  },
  containerButtons: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -25
  },
  containerRemove: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerTenants: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerEdit: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})