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
import { strings } from '../../../locales/i18n.js';

class Item extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.description,
      headerRight: <TouchableOpacity
        style={styles.add}
        onPress={() => navigation.navigate('MojeNajemnineItemZemljevid', navigation.state.params)}>
        <Text>
          <Icon name="location-arrow" size={30} color="black" />
        </Text>
      </TouchableOpacity>
    }
  };

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
    return <SearchBar placeholder={strings('components.mojeNajemnine.item.searchTerm')} lightTheme round />;
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

          <View style={styles.containerAgreement}>
            <Text style={styles.text} onPress={() => this.props.navigation.navigate('MojeNajemnineItemPogodba', this.props.navigation.state.params)}><Icon name="search" size={30} color="black" /> Pregled pogodbe</Text>

          </View>
        </View>
        <View style={styles.containerObvestila}>
          <Text style={styles.text}><Icon name="gavel" size={20} color="black" /> {strings('components.mojeNajemnine.item.maintenances')}</Text>
          <TouchableOpacity style={styles.TouchableOpacityStyle} onPress={() => this.props.navigation.navigate('MojeNajemninePopravilaList', { object_id: this.props.navigation.state.params.id })} >
            <Text style={styles.textMore}><Icon name="ellipsis-h" size={28} color="black" /> </Text>
          </TouchableOpacity>
          <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
            <FlatList
              data={this.state.dataMaintenances}
              renderItem={({ item }) => (
                <ListItem
                  key={item.id}
                  onPress={() => this.props.navigation.navigate('MojeNajemninePopravilaEditor', { item: item })}
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
        <View style={styles.containerObveznosti}>
          <Text style={styles.text}><Icon name="credit-card" size={20} color="black" /> {strings('components.mojeNajemnine.item.utilityBills')}</Text>

          <TouchableOpacity style={styles.TouchableOpacityStyle} onPress={() => this.props.navigation.navigate('MojeNajemnineObveznostiList', { object_id: this.props.navigation.state.params.id })} >
            <Text style={styles.textMore}><Icon name="ellipsis-h" size={28} color="black" /></Text>
          </TouchableOpacity>
          <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
            <FlatList
              data={this.state.dataBills}
              renderItem={({ item }) => (
                <ListItem
                  key={item.id}
                  onPress={() => this.props.navigation.navigate('MojeNajemnineObveznostiItem', item)}
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
  containerLocation: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  containerAgreement: {
    flex: 3,
    alignItems: 'flex-start',
    justifyContent: 'center'
  }
})