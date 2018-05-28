import React, { Component } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, Alert, AsyncStorage } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome';

class ItemList extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Pregled mojih nepremičnin',
      headerRight: <TouchableOpacity
        style={styles.add}
        onPress={() => navigation.navigate('MojeNepremicnineEditor', { isEditing: false })}>
        <Text>
          <Icon name="plus" size={30} color="black" />
        </Text>
      </TouchableOpacity>
    }
  };

  constructor(props) {
    super(props);

    this.state = {
      id: null,
      loading: false,
      dataObjects: [],
      dataBills: [],
      error: null,
      refreshing: false
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('@UserData:data').then((value) => {
      var data = JSON.parse(value);
      if (data !== null) {
        this.setState({ id: data.id });
        this.makeRemoteRequestObjects();
      }
    });

  }

  makeRemoteRequestObjects = () => {
    const url = 'http://our-rent-api.herokuapp.com/api/objects/userObjects/' + this.state.id.toString();
    this.setState({ loading: true });

    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          dataObjects: res,
          error: res.error || null,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };


  handleRefresh = () => {
    this.setState(
      {
        refreshing: true
      },
      () => {
        this.makeRemoteRequestObjects();
      }
    );
  };


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

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerMojeNepremicnine}>
          <Text style={styles.text}><Icon name="home" size={24} color="black" /> Moje nepremičnine</Text>

          <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
            <FlatList
              data={this.state.dataObjects}
              renderItem={({ item }) => (
                <ListItem
                  key={item.id}
                  onPress={() => this.props.navigation.navigate('MojeNepremicnineItem', item)}
                  // roundAvatar
                  avatar={{ uri: item.image }}
                  title={`${item.description}`}
                  subtitle={item.address}
                  containerStyle={{ borderBottomWidth: 0 }}
                />
              )}
              keyExtractor={item => item.id.toString()}
              ItemSeparatorComponent={this.renderSeparator}
              ListFooterComponent={this.renderFooter}
              ListHeaderComponent={this.renderHeader}
              onRefresh={this.handleRefresh}
              refreshing={this.state.refreshing}
            />
          </List>
        </View>
        <View style={styles.containerPregledMape}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('MojeNepremicnineZemljevid', { user_id: this.state.id })}>
            <Text style={styles.text}><Icon name="location-arrow" size={24} color="black" /> Iskanje na zemljevidu</Text>
          </TouchableOpacity>
        </View>
      </View>

    );
  }
}

export default ItemList;
const styles = StyleSheet.create({
  add: {
    paddingRight: 10
  },
  container: {
    flex: 1,
    // backgroundColor: 'white',
    padding: 10
  },
  text: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold'
  },
  containerMojeNepremicnine: {
    flex: 4
  },
  containerPregledMape: {
    flex: 1
  }
})