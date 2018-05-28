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

import DatePicker from 'react-native-datepicker'
import Icon from 'react-native-vector-icons/FontAwesome';
import ImageViewer from 'react-native-image-zoom-viewer';

export default class TenancyAgreementOverview extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        return {
            title: "Pregled pogodbe",
            headerRight: <TouchableOpacity
                style={styles.edit}
                onPress={() => params.handleAdd && params.handleAdd()}>
                <Text>
                    <Icon name="edit" size={30} color="black" />
                </Text>
            </TouchableOpacity>
        }
    };

    constructor(props) {
        super(props)
        this.state = {
            tenancyAgreement: {
                name: null,
                validTo: new Date(),
                validFrom: new Date(),
                paymentInterval: null,
                paymentAmount: null,
                currency: null
            },
            modalOpen: false
        }
    }

    changeModalState() {
        this.setState({ modalOpen: !this.state.modalOpen });
    }

    editAgreement() {
        this.props.navigation.navigate("TenancyAgreementEditor", {
            tenancyAgreement: this.state.tenancyAgreement,
            user: null,
            objectDescription: this.props.navigation.state.params.objectDescription,
            objectAddress: this.props.navigation.state.params.objectAddress,
        });
    }

    componentDidMount() {
        this.props.navigation.setParams({ handleAdd: () => this.editAgreement() });
        var data = this.props.navigation.state.params.tenancyAgreement;
        data.paymentAmount = data.paymentAmount === null ? data.paymentAmount = null : data.paymentAmount.toString();
        if (data.validTo !== null)
            data.validTo = data.validTo.substring(0, 10);
        if (data.validFrom !== null)
            data.validFrom = data.validFrom.substring(0, 10);
        this.setState({
            tenancyAgreement: data,
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
                    editable={false}
                    style={styles.input}
                    value={this.state.tenancyAgreement.name}
                    underlineColorAndroid='rgba(0,0,0,0)'
                />
                <View style={styles.datePickerContainer}>
                    <View>
                        <Text style={styles.text}>Veljavno od</Text>
                        <DatePicker
                            style={styles.datePicker}
                            date={this.state.tenancyAgreement.validFrom}
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
                        />
                    </View>
                    <View>
                        <Text style={styles.text}>Veljavno do</Text>
                        <DatePicker
                            style={styles.datePicker}
                            date={this.state.tenancyAgreement.validTo}
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
                        />
                    </View>
                </View>
                <Text style={styles.text}>Plačilo do dneva</Text>
                <TextInput
                    editable={false}
                    style={styles.input}
                    value={this.state.tenancyAgreement.paymentInterval}
                    underlineColorAndroid='rgba(0,0,0,0)'
                />
                <Text style={styles.text}>Višina najemnine</Text>
                <TextInput
                    editable={false}
                    style={styles.input}
                    value={this.state.tenancyAgreement.paymentAmount}
                    underlineColorAndroid='rgba(0,0,0,0)'
                />
                <Text style={styles.text}>Valuta</Text>
                <TextInput
                    editable={false}
                    style={styles.input}
                    value={this.state.tenancyAgreement.currency}
                    underlineColorAndroid='rgba(0,0,0,0)'
                />
                <View style={styles.imageContainer}>
                    <TouchableOpacity
                        onPress={() => this.changeModalState()}
                    >
                        <Image style={styles.image} source={this.state.tenancyAgreement.image !== null ?
                            { uri: this.state.tenancyAgreement.image } : require('../../images/tenancyImg.png')} />
                    </TouchableOpacity>
                    <Modal
                        visible={this.state.modalOpen}
                        transparent={true}
                        onRequestClose={() => this.changeModalState()}
                    >
                        <ImageViewer imageUrls={this.state.tenancyAgreement.image !== null ?
                            [{
                                url: this.state.tenancyAgreement.image,
                                props: {

                                }
                            }] :
                            [{
                                props:
                                    {
                                        source: require('../../images/tenancyImg.png')
                                    }
                            }]} />
                    </Modal>
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
    datePicker: {
        flex: 1,
    },
    datePickerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 20,
    }
});