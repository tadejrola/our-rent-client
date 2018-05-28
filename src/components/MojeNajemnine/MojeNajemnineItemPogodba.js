import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    AsyncStorage,
    ScrollView,
    TouchableOpacity,
    Alert,
    Modal,
    Image
} from 'react-native';
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import ImageViewer from 'react-native-image-zoom-viewer';

const images = [{
    // Simplest usage.
    url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460',
    // You can pass props to <Image />.
    props: {
        // headers: ...
    }
}, {
    props: {
        // Or you can set source directory.
        source: require('../../images/tenancyImg.png')
    }
}]

class MojeNajemnineItemPogodba extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.description + "- POGODBA"
    })

    constructor(props) {
        super(props);

        this.state = {
            dataTenancyAgreement: {
                name: null,
                validTo: null,
                validFrom: null,
                paymentInterval: null,
                paymentAmount: null,
                currency: null,
                image: null
            },
            user_id: null,
            dataObject: this.props.navigation.state.params,
            refreshing: false,
            modalOpen: false
        };
    }

    changeModalState() {
        this.setState({ modalOpen: !this.state.modalOpen });
    }

    componentDidMount() {
        AsyncStorage.getItem('@UserData:data').then((value) => {
            var data = JSON.parse(value);
            if (data !== null) {
                this.setState({ id: data.id });
                this.makeRemoteRequestAgreement();
            }
        });
    }

    async makeRemoteRequestAgreement() {
        fetch('https://our-rent-api.herokuapp.com/api/tenancyAgreements/userTenancies/' + this.state.id.toString())
            .then(res => res.json())
            .then(async (agreements) => {
                var latestAgreement = agreements[agreements.length - 1];
                latestAgreement.paymentAmount = latestAgreement.paymentAmount.toString();
                latestAgreement.validFrom = latestAgreement.validFrom.substr(0, 10);
                latestAgreement.validTo = latestAgreement.validTo.substr(0, 10);
                console.log(latestAgreement);
                this.setState({
                    dataTenancyAgreement: latestAgreement
                });
            })
    };



    render() {
        return (
            <ScrollView style={styles.dataContainer}>
                <View style={styles.headContainer}>
                    <Text style={styles.objectDescription}>{this.state.dataObject.description}</Text>
                    <Text style={styles.objectAddress}>{this.state.dataObject.address}</Text>
                </View>
                <Text style={styles.text}>Ime pogodbe</Text>
                <TextInput
                    editable={false}
                    style={styles.input}
                    value={this.state.dataTenancyAgreement.name}
                    underlineColorAndroid='rgba(0,0,0,0)'
                />
                <Text style={styles.text}>Veljavno do</Text>
                <TextInput
                    editable={false}
                    style={styles.input}
                    value={this.state.dataTenancyAgreement.validTo}
                    underlineColorAndroid='rgba(0,0,0,0)'
                />
                <Text style={styles.text}>Veljavno od</Text>
                <TextInput
                    editable={false}
                    style={styles.input}
                    value={this.state.dataTenancyAgreement.validFrom}
                    underlineColorAndroid='rgba(0,0,0,0)'
                />
                <Text style={styles.text}>Plačilo do dneva</Text>
                <TextInput
                    editable={false}
                    style={styles.input}
                    value={this.state.dataTenancyAgreement.paymentInterval}
                    underlineColorAndroid='rgba(0,0,0,0)'
                />
                <Text style={styles.text}>Višina najemnine</Text>
                <TextInput
                    editable={false}
                    style={styles.input}
                    value={this.state.dataTenancyAgreement.paymentAmount}
                    underlineColorAndroid='rgba(0,0,0,0)'
                />
                <Text style={styles.text}>Valuta</Text>
                <TextInput
                    editable={false}
                    style={styles.input}
                    value={this.state.dataTenancyAgreement.currency}
                    underlineColorAndroid='rgba(0,0,0,0)'
                />
                <View style={styles.imageContainer}>
                    <TouchableOpacity
                        onPress={() => this.changeModalState()}
                    >
                        <Image style={styles.image}
                            source={{ uri: this.state.dataTenancyAgreement.image }} />
                    </TouchableOpacity>
                    <Modal
                        visible={this.state.modalOpen}
                        transparent={true}
                        onRequestClose={() => this.changeModalState()}
                    >
                        <ImageViewer imageUrls={[{ url: this.state.dataTenancyAgreement.image, props: {} }]} />
                    </Modal>
                </View>
            </ScrollView >
        )
    }



};



export default MojeNajemnineItemPogodba
const styles = StyleSheet.create({
    dataContainer: {
        paddingBottom: 20,
        backgroundColor: 'white',
    },
    text: {
        marginTop: 10,
        marginLeft: 20,
        color: 'black',
        fontSize: 20
    },
    input: {
        marginTop: 10,
        margin: 20,
        marginBottom: 0,
        height: 44,
        paddingHorizontal: 10,
        borderRadius: 4,
        borderColor: '#ccc',
        borderWidth: 1,
        fontSize: 16,
        color: 'black'
    },
    image: {
        width: 250,
        height: 250,
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 20,
        paddingTop: 20
    },
    edit: {
        paddingRight: 10
    },
    objectDescription: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'black'
    },
    objectAddress: {
        fontSize: 16,
        color: 'black'
    },
    headContainer: {
        alignItems: 'center',
        padding: 10,
    },
});