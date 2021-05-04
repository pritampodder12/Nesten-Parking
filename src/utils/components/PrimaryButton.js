import React from 'react';
import { Button, Text } from '@ui-kitten/components';
import { globalStyles } from '../globalStyles';
import Ripple from 'react-native-material-ripple';

export default PrimaryButton = ({ title, size, onPress, status, style = {}, disabled = false }) => (
    <Ripple onPress={onPress} disabled={disabled}>
        <Button size={size} status={status} disabled={disabled}
            style={{ ...globalStyles.primaryButton, ...style }}>
            <Text category="c2">{title}</Text>
        </Button>
    </Ripple>
)