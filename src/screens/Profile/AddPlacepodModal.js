import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Layout, Button, Text, Input, Icon } from '@ui-kitten/components';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';

import { Constants } from '../../utils/Constants';
import { showSnackbar, registerPlacepod } from '../../redux/actions';

function AddPlacepodModal(props) {
    const [devEui, setDevEui] = useState('');
    const [name, setName] = useState('');
    const [lat, setLat] = useState('');
    const [long, setLong] = useState('');
    const [hourlyCost, setHourlyCost] = useState('');

    const setLatLong = () => {
        setLat(props.currentLocation.latitude.toString());
        setLong(props.currentLocation.longitude.toString());
    }
    const handleRegister = () => {
        props.toggleModal();
        if (!props.userdetails.address) return props.showSnackbar("Please Update your address!", "danger");
        if (!devEui || !lat || !long || !hourlyCost || !name) return props.showSnackbar("All fields are required!", "danger");
        if (isNaN(Number(hourlyCost))) return props.showSnackbar("Hourly Cost must be a number!", "danger");
        props.registerPlacepod({
            devEui, lat, long, name, hourly_cost: hourlyCost, owner_address: props.userdetails.address, owner_id: props.userdetails.uuid
        });
    }
    return (
        <Modal
            isVisible={props.visible}
            useNativeDriver={true}
            animationIn="slideInLeft"
            animationOut="slideOutLeft"
        >
            <Layout style={styles.modalContainer}>
                <Text category="h5">Register a New Placepod</Text>
                <Button appearance="ghost" style={styles.closeIcon} accessoryLeft={(props) => <Icon {...props} name="close" />} onPress={props.toggleModal} />
                <View style={styles.verticalSpace} />
                <Input label="Device ID" mode="outlined" value={devEui} onChangeText={(text) => setDevEui(text)} />
                <View style={styles.verticalSpace} />
                <Input label="Name" mode="outlined" value={name} onChangeText={(text) => setName(text)} />
                <View style={styles.verticalSpace} />
                <Input label="Hourly Cost(NIT)" mode="outlined" value={hourlyCost} onChangeText={(text) => setHourlyCost(text)} />
                <View style={styles.verticalSpace} />
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Input label="Latitude" mode="outlined" value={lat} onChangeText={(text) => setLat(text)} style={{width:'48%'}} />
                    <Input label="Longitude" mode="outlined" value={long} onChangeText={(text) => setLong(text)} style={{width:'48%'}} />
                </View>
                <View style={styles.verticalSpace} />
                <Button appearance="ghost" onPress={setLatLong}>
                    <Text>Use Current Location</Text>
                </Button>
                <View style={styles.verticalSpace} />
                <Button onPress={handleRegister}>
                    <Text style={{ color: Constants.colors.white }}>Register</Text>
                </Button>
            </Layout>
        </Modal>
    )
}
function mapStateToProps(state) {
    return {
        userdetails: state.authReducer.userdetails,
        currentLocation: state.locationReducer.currentLocation
    };
}
export default connect(mapStateToProps, { showSnackbar, registerPlacepod })(AddPlacepodModal);

const styles = StyleSheet.create({
    modalContainer: {
        borderRadius: 10,
        padding: 15,
    },
    closeIcon: { position: 'absolute', right: 0, top: 0 },
    verticalSpace: { marginVertical: 10 }
});