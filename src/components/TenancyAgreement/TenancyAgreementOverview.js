import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    AsyncStorage,
    ScrollView,
    Image,
    TouchableOpacity,
    Alert
} from 'react-native';
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

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
                validTo: null,
                validFrom: null,
                paymentInterval: null,
                paymentAmount: null,
                currency: null
            }
        }
    }

    editAgreement() {
        Alert.alert("EDIT aggrfghfsdr lol");
    }

    componentDidMount() {
        this.props.navigation.setParams({ handleAdd: () => this.editAgreement() });
        var data = this.props.navigation.state.params.tenancyAgreement;
        data.paymentAmount = data.paymentAmount.toString();
        this.setState({
            tenancyAgreement: data
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
                <Text style={styles.text}>Veljavno do</Text>
                <TextInput
                    editable={false}
                    style={styles.input}
                    value={this.state.tenancyAgreement.validTo}
                    underlineColorAndroid='rgba(0,0,0,0)'
                />
                <Text style={styles.text}>Veljavno od</Text>
                <TextInput
                    editable={false}
                    style={styles.input}
                    value={this.state.tenancyAgreement.validFrom}
                    underlineColorAndroid='rgba(0,0,0,0)'
                />
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
                    <TouchableOpacity>
                        <Image style={styles.image} source={this.state.tenancyAgreement.image !== null ?
                            { uri: this.state.tenancyAgreement.image } : require('../../images/tenancyImg.png')} />
                    </TouchableOpacity>
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
});