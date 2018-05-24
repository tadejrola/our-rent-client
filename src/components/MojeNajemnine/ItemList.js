import React, { Component } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, Alert, AsyncStorage } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome';

class ItemList extends Component {
  static navigationOptions = {
    title: 'Pregled mojih najemnin'
  }
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

  async componentDidMount() {
    AsyncStorage.getItem('@UserData:data').then((value) => {
      var data = JSON.parse(value);
      if (data !== null) {
        this.setState({ id: data.id });
        this.makeRemoteRequestObjects();
      }
    });

  }

  async makeRemoteRequestObjects() {
    const getData = () => new Promise(resolve => {
      const placesArrayReal = [];
      fetch('https://our-rent-api.herokuapp.com/api/tenancyAgreements/userTenancies/' + this.state.id.toString())
        .then(res => res.json())
        .then(async (objects) => {
          console.log(objects);
          if (objects.length > 0) {
            let index = 0;
            for (let item of objects) {

              const res = await fetch(`https://our-rent-api.herokuapp.com/api/objects/${item.id}`);
              const data = await res.json();
              index++;
              console.log(data);
              placesArrayReal.push(data);

            }
            resolve(placesArrayReal);
          }

        });
    });

    getData().then(data => {
      this.setState({
        dataObjects: data
      })

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
          <Text style={styles.text}><Icon name="home" size={24} color="black" /> Moje najemnine</Text>
          <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
            <FlatList
              data={this.state.dataObjects}
              renderItem={({ item }) => (
                <ListItem
                  key={item.id}
                  onPress={() => this.props.navigation.navigate('MojeNajemnineItem', item)}
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
          <TouchableOpacity onPress={() => this.props.navigation.navigate('MojeNajemnineZemljevid', { user_id: this.state.id })}>
            <Text style={styles.text}><Icon name="location-arrow" size={24} color="black" /> Iskanje na zemljevidu</Text>
          </TouchableOpacity>
        </View>
      </View>

    );
  }
}

export default ItemList;
const styles = StyleSheet.create({
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