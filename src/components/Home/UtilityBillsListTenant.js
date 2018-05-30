import React, { Component } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, Alert, AsyncStorage } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";

export default class MaintenancesListOwner extends Component {
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
        AsyncStorage.getItem('@UserData:data').then((value) => {
            var data = JSON.parse(value);
            if (data !== null) {
                this.makeRemoteRequestMaintenances(data.id)
            }
        });
    }
    makeRemoteRequestMaintenances = (id) => {
        const url = 'http://our-rent-api.herokuapp.com/api/utilityBills/utilityBillsForTenant/' + id;
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
            </View>
        );
    }
}
const styles = StyleSheet.create({
    add: {
        paddingRight: 10
    },
    container: {
        flex: 1,
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
})