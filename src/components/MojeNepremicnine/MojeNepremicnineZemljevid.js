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

        //TEST DATA
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

        //REAL DATA
        const placesArrayReal = [];
        fetch("https://our-rent-api.herokuapp.com/api/objects")
            .then(function (response) {
                response.json().then(function (objects) {
                    var index = 0;
                    for (let item of objects) {
                        fetch("https://maps.google.com/maps/api/geocode/json?key=AIzaSyCIGc4fL0PJv0smNrtUsHylALwAeoygHnI&address=" + item.address).then(function (coordinates) {
                            coordinates.json().then(function (data) {
                                var location = data.results[0].geometry.location;
                                index = index + 1;
                                placesArrayReal.push({
                                    latitude: location.lat,
                                    longitude: location.lng,
                                    id: index.toString(),
                                    title: "test" + index.toString(),
                                    description: "test" + index.toString()
                                });
                            })

                        })
                    }
                })
            })
        console.log(placesArray);
        console.log(placesArrayReal);
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
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1,
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
