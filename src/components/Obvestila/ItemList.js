import React, { Component } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome';

class ItemList extends Component {
  static navigationOptions = {
    title: 'Pregled obvestil in obveznosti'
  }
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

  handleRefresh = () => {
    this.setState(
      {
        refreshing: true
      },
      () => {
        this.makeRemoteRequestMaintenances();
        this.makeRemoteRequestBills();
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
        <View style={styles.containerFilterSort}>
          <View style={styles.containerFilter}>
            <Text style={styles.text}><Icon name="filter" size={20} color="black" /> Filter</Text>

          </View>
          <View style={styles.containerSort}>
            <Text style={styles.text}><Icon name="sort" size={20} color="black" /> Sort</Text>
          </View>
        </View>
        <View style={styles.containerObvestila}>
          <Text style={styles.text}><Icon name="gavel" size={20} color="black" /> Popravila/obvestila</Text>
          <TouchableOpacity style={styles.TouchableOpacityStyle}>
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
          <TouchableOpacity style={styles.TouchableOpacityStyle}>
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
  containerFilterSort: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -25
  },
  containerFilter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerSort: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})