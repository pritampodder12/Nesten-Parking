import React from 'react';
import { Input, Text } from '@ui-kitten/components';
import { globalStyles } from '../globalStyles';

export default AuthInput = ({ label, type, value, onChangeText, secureTextEntry }) =>
    <Input
        label={() => <Text style={globalStyles.authInputLabel}>{label}</Text>}
        autoCapitalize="none"
        value={value}
        onChangeText={onChangeText}
        textStyle={globalStyles.authInput}
        secureTextEntry={secureTextEntry}
        style={{ borderRadius: 8 }}
    />