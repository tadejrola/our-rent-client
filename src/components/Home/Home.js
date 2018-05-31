import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  AsyncStorage
} from 'react-native'
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import MaintenancesListOwner from './MaintenancesListOwner'
import MaintenancesListTenant from './MaintenancesListTenant'
import UtilityBillsListOwner from './UtilityBillsListOwner'
import UtilityBillsListTenant from './UtilityBillsListTenant'
import Icon from 'react-native-vector-icons/FontAwesome';

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

export default class Home extends Component {
  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'Najemniške obv.' },
      { key: 'second', title: 'Lastniške obv.' },
    ],
  };

  _handleIndexChange = index => this.setState({ index });

  _renderHeader = props => <TabBar {...props} />;

  _renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return <View style={styles.container} >
          <Text style={styles.text}><Icon name="gavel" size={20} color="black" /> Popravila</Text>
          <MaintenancesListTenant navigation={this.props.navigation} />
          <Text style={styles.text}><Icon name="credit-card" size={20} color="black" /> Obveznosti</Text>
          <UtilityBillsListTenant navigation={this.props.navigation} />
        </View>;
      case 'second':
        return <View style={styles.container} >
          <Text style={styles.text}><Icon name="gavel" size={20} color="black" /> Popravila</Text>
          <MaintenancesListOwner navigation={this.props.navigation} />
          <Text style={styles.text}><Icon name="credit-card" size={20} color="black" /> Obveznosti</Text>
          <UtilityBillsListOwner navigation={this.props.navigation} />
        </View>;
      default:
        return null;
    }
  }

  render() {
    return (
      <TabViewAnimated
        navigationState={this.state}
        renderScene={this._renderScene}
        renderHeader={this._renderHeader}
        onIndexChange={this._handleIndexChange}
        initialLayout={initialLayout}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5
  },
  text: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: -20,
    alignSelf: 'center'
  },
})
