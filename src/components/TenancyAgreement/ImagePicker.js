import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    NetInfo,
    ImageStore,
    ImageEditor,
} from 'react-native'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import CameraRollPicker from 'react-native-camera-roll-picker';

export default class ImagePicker extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        return {
            title: 'Dodajanje slike'
        }
    };

    constructor(props) {
        super(props)
        this.state = {
            image: null,
        }
    }

    getSelectedImages(image) {
        this.setState({ image });
    }

    save() {
        this.props.navigation.state.params.getSelectedImages(this.state.image);
        this.props.navigation.goBack();
    }

    render() {
        return (
            <View style={styles.container}>
                <CameraRollPicker
                    callback={this.getSelectedImages.bind(this)}
                    maximum={1}
                />
                <View style={styles.buttonContainer}>
                    <Button
                        large
                        icon={{ name: 'plus', type: 'octicon' }}
                        buttonStyle={styles.addButton}
                        title='Dodaj'
                        onPress={() => this.save()} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    buttonContainer: {
        margin: 20,
    },
    addButton: {
        backgroundColor: 'rgba(111, 202, 186, 1)',
        borderRadius: 10
    },
});
