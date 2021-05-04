import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { Constants } from '../../utils/Constants';

export default function BottomSheetHeader({ status }) {

    return (
        <View>
            <View style={{ position: 'absolute', left: 0, right: 0, height: '50%', backgroundColor: Constants.colors.primary, bottom: -4, borderTopRightRadius: 20, borderTopLeftRadius: 20 }} />
            {
                status == 'available' ?
                    <Image source={require('../../assets/icon/available_active.png')} style={styles.image} /> :
                    <View style={{ ...styles.icon, backgroundColor: Constants.colors.danger, }}>
                        <Icon name="ban" size={50} color={Constants.colors.white} />
                    </View>
            }
        </View>)
}
const styles = StyleSheet.create({
    icon: {
        height: 90, width: 90, justifyContent: 'center', alignItems: 'center', borderRadius: 100, borderColor: Constants.colors.white, borderWidth: 4,
        alignSelf: 'center'
    },
    image: {
        height:90,width:90,alignSelf:'center',resizeMode:'contain'
    }
})