import React, { Component } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, Alert, AsyncStorage } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome';

class ItemList extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Pregled popravil'
    }
  };

  constructor(props) {
    super(props);

    this.state = {
      id: null,
      loading: false,
      dataObjects: [],
      dataMaintenances: [],
      error: null,
      refreshing: false
    };
  }

  componentDidMount() {
    this.makeRemoteRequestMaintenances()
  }
  makeRemoteRequestMaintenances = () => {
    const url = 'http://our-rent-api.herokuapp.com/api/maintenances/objectMaintenance/' + this.props.navigation.state.params.object_id.toString();
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


  handleRefresh = () => {
    this.setState(
      {
        refreshing: true
      },
      () => {
        this.makeRemoteRequestMaintenances();
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
          <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
            <FlatList
              data={this.state.dataMaintenances}
              renderItem={({ item }) => (
                <ListItem
                  key={item.id}
                  onPress={() => this.props.navigation.navigate('MojeNepremicninePopravilaItem', { item: item })}
                  roundAvatar
                  title={`${item.description} - ${item.fixingCost}`}
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