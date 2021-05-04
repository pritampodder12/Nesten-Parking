import React from 'react';
import { View } from 'react-native';
import { Constants } from '../Constants';
export default function AuthDivider({ height = 2, width = '100%' }) {
    return <View style={{ height, width, backgroundColor: Constants.colors.divider,alignSelf:'center' }} />
}