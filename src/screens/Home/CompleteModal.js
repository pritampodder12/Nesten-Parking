import React from 'react';
import { Text } from '@ui-kitten/components';
import { StyleSheet, Modal, View,Image } from 'react-native';
import Ripple from 'react-native-material-ripple';

import { Constants } from '../../utils/Constants';
import SizedBox from '../../utils/components/SizedBox';

function PaymentModal({ currentStatus, sheetRef, amount }) {
    return (
        <Modal visible={currentStatus == 'paymentComplete'}>
            <View style={styles.container}>
                <View style={styles.upperContainer}>
                    <Text category="h5">{amount}NIT</Text>
                    <Text category="h5">Transaction Completed</Text>
                    <SizedBox height={40} />
                    <Image source={require('../../assets/icon/mail.png')} style={styles.image} />
                    <SizedBox height={40} />
                    <Text style={{ textAlign: 'center' }}>
                        Your Reservation is successfully
                        {'\n'}completed. We will notify you
                        {'\n'}when there is any update.
                        {'\n'}Thank you!
                    </Text>
                </View>
                <View>
                    <Ripple style={{ borderRadius: 100, overflow: 'hidden' }} onPress={() => sheetRef.current.snapTo(2)}>
                        <View style={styles.buttonContainer}>
                            <Text category="h5" style={{ color: Constants.colors.white }}>Done</Text>
                        </View>
                    </Ripple>
                </View>
            </View>
        </Modal>
    )
}
export default PaymentModal;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: Constants.screenSize.width * 0.1,
        backgroundColor: Constants.colors.inputBackground
    },
    upperContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonContainer: {
        backgroundColor: Constants.colors.primary,
        width: '100%',
        padding: 18,
        borderRadius: 100,
        alignItems: 'center'
    },
    image: {
        height:90,width:90,
        resizeMode:"contain"
    }
})