import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
} from 'react-native'
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

class MojeNepremicnineZemljevid extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: "Zemljevid nepremičnin"
    })
    constructor(props) {
        super(props);

        this.state = {
            latitude: 0,
            longitude: 0,
            markers: null,
            error: null,
        };
    }
    componentWillMount() {
        const placesArray = [];
        placesArray.push({
            latitude: 45,
            longitude: 15,
            id: "1",
            title: "test1",
            description: "test1 desc"
        });
        placesArray.push({
            latitude: 46,
            longitude: 15,
            id: "2",
            title: "test3",
            description: "test3 desc"
        });
        placesArray.push({
            latitude: 47,
            longitude: 15,
            id: "3",
            title: "test2",
            description: "test2 desc"
        });

        const usersMarkers = placesArray.map(userPlace => <MapView.Marker coordinate={userPlace} key={userPlace.id} />);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    markers: usersMarkers,
                    error: null,
                });
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
    }

    render() {

        return (
            <View style={styles.container}>
                <MapView

                    style={styles.map}
                    region={{
                        latitude: this.state.latitude,
                        longitude: this.state.longitude,
                        latitudeDelta: 0.016,
                        longitudeDelta: 0.0121,
                    }}

                >{this.state.markers}
                </MapView>
            </View>
        );
    }
}

export default MojeNepremicnineZemljevid

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});
