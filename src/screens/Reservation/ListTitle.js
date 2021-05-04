import React from 'react';
import { Text } from '@ui-kitten/components';
import { View } from 'react-native';

export default function ListTitle({ title }) {
    return <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 30 }}>
        <View style={{ flex: 1, height: 1, backgroundColor: '#D6D6D6' }} />
        <View>
            <Text category="s2" style={{ textAlign: 'center' }}>{title}</Text>
        </View>
        <View style={{ flex: 1, height: 1, backgroundColor: '#D6D6D6' }} />
    </View>

}