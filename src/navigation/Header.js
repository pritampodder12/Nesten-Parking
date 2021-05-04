import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon } from '@ui-kitten/components';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Constants } from '../utils/Constants';

const BackIcon = () => (
    <Icon style={styles.backIcon} fill={Constants.colors.label} name='arrow-back' />
);

export default function Header({ navigation, previous }) {
    const goBack = () => navigation.goBack();

    if (!!previous) return (
        <View style={styles.header}>
            <TouchableOpacity onPress={goBack} style={styles.iconContainer}>
                <BackIcon />
            </TouchableOpacity>
        </View>
    )
    else return null;
}
const styles = StyleSheet.create({
    header: { position: 'absolute', top: 0, left: 0 },
    backIcon: { height: Constants.headerHeight / 2 + 5, width: Constants.headerHeight / 3 + 5 },
    iconContainer: { padding: Constants.headerHeight / 4 }
})