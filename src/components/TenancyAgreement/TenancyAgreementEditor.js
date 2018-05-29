import React, { Component } from 'react'
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
    Image,
    NetInfo
} from 'react-native'

import DatePicker from 'react-native-datepicker'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import ImageViewer from 'react-native-image-zoom-viewer';

export default class TenancyAgreementEditor extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        return {
            title: params.tenancyAgreement === null ? 'Dodajanje pogodbe' : 'Urejanje pogodbe',
        }
    };

    constructor(props) {
        super(props)
        this.state = {
            modalOpen: false,
            name: null,
            validTo: new Date(),
            validFrom: new Date(),
            paymentInterval: null,
            paymentAmount: null,
            currency: null,
            tenancyAgreementId: null,
            image: null
        }
    }

    getSelectedImages(image) {
        this.props.navigation.state.params.tenancyAgreement = {
            image: image[0].uri
        }
        this.forceUpdate();
    }

    changeModalState() {
        this.setState({ modalOpen: !this.state.modalOpen });
    }

    componentDidMount() {
        if (this.props.navigation.state.params.tenancyAgreement !== null) {
            var data = this.props.navigation.state.params.tenancyAgreement;
            data.paymentAmount = data.paymentAmount === null ? data.paymentAmount = null : data.paymentAmount.toString();
            if (data.validTo !== null)
                data.validTo = data.validTo.substring(0, 10);
            if (data.validFrom !== null)
                data.validFrom = data.validFrom.substring(0, 10);
            this.setState({
                name: data.name,
                validTo: data.validTo,
                validFrom: data.validFrom,
                paymentInterval: data.paymentInterval,
                paymentAmount: data.paymentAmount,
                currency: data.currency,
                tenancyAgreementId: data.id
            });
        }
    }

    saveData() {
        var tempUrl = this.props.navigation.state.params.tenancyAgreement !== null ?
            'http://our-rent-api.herokuapp.com/api/tenancyAgreements/' + this.state.tenancyAgreementId :
            'http://our-rent-api.herokuapp.com/api/tenancyAgreements/';
        var tempMethod = this.props.navigation.state.params.tenancyAgreement !== null ?
            'PUT' :
            'POST';
        var userId = this.props.navigation.state.params.tenancyAgreement !== null ?
            this.props.navigation.state.params.tenancyAgreement.user_id :
            this.props.navigation.state.params.userId;

        var objectId = this.props.navigation.state.params.tenancyAgreement !== null ?
            this.props.navigation.state.params.tenancyAgreement.object_id :
            this.props.navigation.state.params.objectId;

        NetInfo.isConnected.fetch().then((value) => {
            if (value) {
                fetch(tempUrl, {
                    method: tempMethod,
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: this.state.name,
                        validTo: this.state.validTo,
                        validFrom: this.state.validFrom,
                        paymentInterval: this.state.paymentInterval,
                        paymentAmount: this.state.paymentAmount,
                        currency: this.state.currency,
                        user_id: userId,
                        object_id: objectId
                    }),
                }).then((value) => {
                    Alert.alert(
                        'Update successful',
                        'Za prikaz novih podatkov je potrebno posodobiti seznam uporabnikov!',
                        [
                            { text: 'OK', onPress: () => this.props.navigation.goBack() },
                        ],
                        { cancelable: false }
                    );
                }, (reason) => {
                    Alert.alert(
                        'Update unsuccessful',
                        'Fetch error!'
                    );
                });

            } else {
                Alert.alert(
                    'Sending unsuccessful',
                    'No connection available!'
                );
            }
        }, (reason) => {
            Alert.alert(
                'Sending unsuccessful',
                'NetInfo module error!'
            );
        });
    }

    render() {
        return (
            <ScrollView style={styles.dataContainer}>
                <View style={styles.headContainer}>
                    <Text style={styles.objectDescription}>{this.props.navigation.state.params.objectDescription}</Text>
                    <Text style={styles.objectAddress}>{this.props.navigation.state.params.objectAddress}</Text>
                </View>
                <Text style={styles.text}>Ime pogodbe</Text>
                <TextInput
                    style={styles.input}
                    value={this.state.name}
                    onChangeText={name => this.setState({ name })}
                    underlineColorAndroid='rgba(0,0,0,0)'
                />
                <View style={styles.datePickerContainer}>
                    <View>
                        <Text style={styles.text}>Veljavno od</Text>
                        <DatePicker
                            style={styles.datePicker}
                            date={this.state.validFrom}
                            mode="date"
                            format="YYYY-MM-DD"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36
                                }
                            }}
                            onDateChange={(validFrom) => { this.setState({ validFrom }) }}
                        />
                    </View>
                    <View>
                        <Text style={styles.text}>Veljavno do</Text>
                        <DatePicker
                            style={styles.datePicker}
                            date={this.state.validTo}
                            mode="date"
                            format="YYYY-MM-DD"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36,
                                }
                            }}
                            onDateChange={(validTo) => { this.setState({ validTo }) }}
                        />
                    </View>
                </View>
                <Text style={styles.text}>Plačilo do dneva</Text>
                <TextInput
                    style={styles.input}
                    value={this.state.paymentInterval}
                    onChangeText={paymentInterval => this.setState({ paymentInterval })}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    onSubmitEditing={() => this.paymentAmount.focus()}
                    ref={(input) => this.paymentInterval = input}
                />
                <Text style={styles.text}>Višina najemnine</Text>
                <TextInput
                    style={styles.input}
                    value={this.state.paymentAmount}
                    onChangeText={paymentAmount => this.setState({ paymentAmount })}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    onSubmitEditing={() => this.currency.focus()}
                    ref={(input) => this.paymentAmount = input}
                />
                <Text style={styles.text}>Valuta</Text>
                <TextInput
                    style={styles.input}
                    value={this.state.currency}
                    onChangeText={currency => this.setState({ currency })}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    ref={(input) => this.currency = input}
                />
                <View style={styles.footer}>
                    <View style={styles.imageContainer}>
                        <TouchableOpacity
                            style={styles.addImageButton}
                            onPress={() => this.props.navigation.navigate('ImagePicker', { getSelectedImages: this.getSelectedImages.bind(this) })}>
                            <Text>
                                <Icon name="image" size={40} color="black" />
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.changeModalState()}
                        >
                            <Image style={styles.image} source={
                                this.props.navigation.state.params.tenancyAgreement !== null ?
                                    (this.props.navigation.state.params.tenancyAgreement.image !== null ?
                                        { uri: this.props.navigation.state.params.tenancyAgreement.image } :
                                        require('../../images/tenancyImg.png')) :
                                    require('../../images/tenancyImg.png')} />
                        </TouchableOpacity>
                        <Modal
                            visible={this.state.modalOpen}
                            transparent={true}
                            onRequestClose={() => this.changeModalState()}
                        >
                            <ImageViewer imageUrls={
                                this.props.navigation.state.params.tenancyAgreement !== null ?
                                    (this.props.navigation.state.params.tenancyAgreement.image !== null ?
                                        [{
                                            url: this.props.navigation.state.params.tenancyAgreement.image
                                        }] :
                                        [{
                                            props: { source: require('../../images/tenancyImg.png') }
                                        }]) : [{
                                            props: { source: require('../../images/tenancyImg.png') }
                                        }]} />
                        </Modal>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        large
                        icon={{ name: 'plus', type: 'octicon' }}
                        buttonStyle={styles.addButton}
                        title='Shrani'
                        onPress={() => this.saveData()} />
                </View>
            </ScrollView >
        )
    }
}

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
        width: 250,
    },
    footer: {
        paddingBottom: 20,
        paddingTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
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
    buttonContainer: {
        margin: 20,
    },
    addButton: {
        backgroundColor: 'rgba(111, 202, 186, 1)',
        borderRadius: 10
    },
    addImageButton: {
        position: 'absolute',
        zIndex: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 60,
        backgroundColor: 'rgba(111, 202, 186, 1)',
        borderRadius: 100,
        marginLeft: 10,
        marginTop: 10

    },
    datePicker: {
        flex: 1,
    },
    datePickerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 20,
    },
});
