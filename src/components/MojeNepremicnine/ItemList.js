import React, { Component } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, Alert, AsyncStorage } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome';

class ItemList extends Component {
  static navigationOptions = {
    title: 'Pregled mojih nepremičnin'
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
    //Alert.alert(this.state.id.toString());
    const url = 'http://our-rent-api.herokuapp.com/api/objects/';//+this.state.id.toString();
    // Alert.alert(url);
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
        console.log(this.state.dataObjects);
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
          <TouchableOpacity onPress={() => this.props.navigation.navigate('MojeNepremicnineEditor')}>
            <Text style={styles.text}><Icon name="plus" size={24} />Dodaj</Text>
          </TouchableOpacity>
          <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
            <FlatList
              data={this.state.dataObjects}
              renderItem={({ item }) => (
                <ListItem
                  key={item.id}
                  onPress={() => this.props.navigation.navigate('MojeNepremicnineItem', { title: item.description })}
                  // roundAvatar
                  avatar={{ uri: item.image }}
                  title={`${item.description}`}
                  subtitle={item.category}
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
          <TouchableOpacity onPress={() => this.props.navigation.navigate('MojeNepremicnineZemljevid')}>
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