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
import { Constants } from 'expo';
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

    async postFormDataToImgur(formData) {
        let clientId = '89162d65eb63125';
        let clientSecret = "ab66cae30bf5e32e9d718541d55ac81c5007d57f";
        let token = false;
        let auth;
        if (token) {
            auth = 'Bearer ' + token;
        } else {
            auth = 'Client-ID ' + clientId;
        }

        return fetch('https://api.imgur.com/3/image', {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: auth,
                Accept: 'application/json',
            },
        });
    }

    getSelectedImages(image) {
        this.setState({ image });
    }

    save() {
        console.log(this.state.image);
        const imgurRes = await this.uploadImage(
            this.state.image
        );
        console.warn('out', imgurRes);

        //this.props.navigation.state.params.getSelectedImages(this.state.image);
        //this.props.navigation.goBack();
    }

    uploadImage = async uri => {
        const imageTag = await registerImageTagForImage(uri);

        /// Verify ImageTag exists
        // ImageStore.hasImageForTag(dataa, data => console.log("d", data) )

        let base64data;
        try {
            base64data = await base64ForImageTag(imageTag);
        } catch (error) {
            console.log(error);
        }
        const formData = formDataForBase64(base64data);
        let result = null;
        try {
            result = await postFormDataToImgur(formData);
        } catch (error) {
            console.log('ERROR', error);
        }
        ImageStore.removeImageForTag(imageTag);
        return result;
    };

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
