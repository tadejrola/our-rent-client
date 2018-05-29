
import React, { PureComponent } from 'react';
import { View, Text, NetInfo, Dimensions, StyleSheet } from 'react-native';
import { strings } from '../../../locales/i18n.js';

const { width } = Dimensions.get('window');

export default class OfflineNotice extends PureComponent {
    state = {
        isConnected: true
    };

    componentDidMount() {
        NetInfo.isConnected.fetch().then((value) => {
            value === true ? this.setState({ isConnected: true }) : this.setState({ isConnected: false })
        });
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    }

    handleConnectivityChange = isConnected => {
        if (isConnected) {
            this.setState({ isConnected });
        } else {
            this.setState({ isConnected });
        }
    };

    render() {
        if (!this.state.isConnected) {
            return (
                <View style={styles.offlineContainer}>
                    <Text style={styles.offlineText}>{strings('components.internetConnection.offlineNotice.noConnection')}</Text>
                </View>
            );
        }
        return null;
    }
}

const styles = StyleSheet.create({
    offlineContainer: {
        backgroundColor: '#b52424',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width,
    },
    offlineText: { color: '#fff' }
});