import React, { useEffect } from 'react';
import { Text, Layout, Spinner, Button } from '@ui-kitten/components';
import { StyleSheet, Modal, Linking, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { checkPaymentAndReservePlacepod } from '../../redux/actions';
const screenSize = Dimensions.get('window');

function PaymentModal({ currentStatus, setCurrentStatus, amount, escrow, date, duration, device_id,sheetRef }) {
    const dispatch = useDispatch();
    const userdetails = useSelector(state => state.authReducer.userdetails)
    const closeWithoutPay = () => {
        setCurrentStatus('confirmView');
        sheetRef.current.snapTo(2);
    }

    useEffect(() => {
        if (currentStatus == 'paying') {
            let dt = new Date(date);
            let paymentData = {
                fromadd: userdetails.address,
                amount: amount,
                escrow_id: escrow.id
            };
            let reservationData = {
                reservationtimestamp: dt.toISOString(),
                duration: duration,
                placepod_id: device_id,
                escrow_id: escrow.id
            }
            const interval = setInterval(async () => {
                const completed = await dispatch(checkPaymentAndReservePlacepod(paymentData, reservationData));
                if (completed) {
                    setCurrentStatus('paymentComplete');
                }
                else {
                    console.log('Payment not complete! Calling api again');
                }
            }, 3000);

            return () => clearInterval(interval);
        }
    })

    useEffect(() => {
        Linking.canOpenURL(`nitwalletapp://web.nitwallet.io`).then((supported => {
            if (supported) {
                Linking.openURL(`nitwalletapp://web.nitwallet.io/send/${escrow.address}/${amount}/com.rn_parking`);
            }
        }))
    }, [])

    return (
        <Modal visible={currentStatus == 'paying'}>
            <Layout style={styles.container}>
                <Layout style={styles.innerView} level="3">
                    <Text category="h6">Paying to: </Text>
                    <Text>{escrow.address}</Text>
                    <Text status="success">{amount} NIT</Text>
                    <Spinner />
                    <Text>Processing...</Text>
                    <Text>Checking Payment...</Text>
                    <Text>Please do not press back or exit</Text>
                    {/* <Button size="small" appearance="outline" style={{ alignSelf: 'flex-end', marginTop: 20 }} onPress={closeWithoutPay}>Cancle Payment</Button> */}
                </Layout>
            </Layout>
        </Modal>
    )
}
export default PaymentModal;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    innerView: {
        justifyContent: 'center',
        padding: 20,
        margin: 10,
        marginTop: screenSize.height * 0.1,
        elevation: 1
    }
})