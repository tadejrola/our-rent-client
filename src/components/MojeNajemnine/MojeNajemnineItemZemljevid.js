import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    AsyncStorage
} from 'react-native'
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

class MojeNajemnineItemZemljevid extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.description
    })
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.navigation.state.params.id,
            latitude: 45,
            longitude: 15,
            markers: null,
            error: null,
        };
    }


    componentWillMount() {

        const getData = () => new Promise(resolve => {
            const placesArrayReal = [];
            fetch('https://our-rent-api.herokuapp.com/api/objects/' + this.state.id.toString())
                .then(res => res.json())
                .then(async (object) => {
                    let res = await fetch(`https://maps.google.com/maps/api/geocode/json?key=AIzaSyCIGc4fL0PJv0smNrtUsHylALwAeoygHnI&address=${object.address}`);
                    let data = await res.json();
                    if (data.results.length > 0) {
                        const location = data.results[0].geometry.location;
                        placesArrayReal.push({
                            latitude: location.lat,
                            longitude: location.lng,
                            id: '1',
                            title: 'Title ',
                            description: 'Descr '
                        });
                    }
                    resolve(placesArrayReal);
                })
        });


        getData().then(data => {
            if (data.length > 0) {
                const usersMarkers = data.map(userPlace => <MapView.Marker coordinate={userPlace} key={userPlace.id} />);
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        this.setState({
                            latitude: data[0].latitude,
                            longitude: data[0].longitude,
                            markers: usersMarkers,
                            error: null,
                        });
                    },
                    (error) => this.setState({ error: error.message }),
                    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
                );
            }

        });
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

export default MojeNajemnineItemZemljevid

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
