import React from 'react';
import { Text } from '@ui-kitten/components';
import Ripple from 'react-native-material-ripple';
import { globalStyles } from '../globalStyles';
export default function LinkButton({ title, onPress = null, style = {}, disabled }) {
    return (
        <Ripple style={{ ...globalStyles.linkButton, ...style }} onPress={onPress} disabled={disabled}>
            <Text category="c1">{title}</Text>
        </Ripple>
    )
}