import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    Alert
} from 'react-native'
import { List, ListItem, SearchBar } from "react-native-elements";

export default class TenantsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            objectId: null,
            dataObjects: null,
            loading: false,
            refreshing: false,
            error: null
        }
    }

    componentDidMount() {
        this.setState({ objectId: this.props.objectId });
        this.makeRemoteRequestObjects();
    }

    makeRemoteRequestObjects = () => {
        const url = 'http://our-rent-api.herokuapp.com/api/objects/tenants/' + this.props.objectId;
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
            <View style={styles.seperator} />
        );
    };

    renderHeader = () => {
        return <SearchBar placeholder="Vnesite iskalni niz" lightTheme round />;
    };

    renderFooter = () => {
        if (!this.state.loading)
            return null;
        return (
            <View style={styles.footer}>
                <ActivityIndicator animating size="large" />
            </View>
        );
    };

    render() {
        return (
            <View style={styles.container}>
                <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
                    <FlatList
                        data={this.state.dataObjects}
                        renderItem={({ item }) => (
                            <ListItem
                                key={item.id}
                                onPress={() => this.props.navigation.navigate("TenantOverview", {
                                    user: item,
                                    objectId: this.props.objectId,
                                    objectDescription: this.props.objectDescription,
                                    objectAddress: this.props.objectAddress
                                })}
                                avatar={item.image !== null ? { uri: item.image } : require('../../images/defaultProfile.png')}
                                title={`${item.firstName + " " + item.lastName}`}
                                subtitle={item.email}
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
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    footer: {
        paddingVertical: 20,
        backgroundColor: "white",
    },
    seperator: {
        height: 1,
        width: "86%",
        backgroundColor: "white",
        marginLeft: "14%"
    }
});
