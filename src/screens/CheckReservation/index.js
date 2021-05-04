import React, { useEffect, useState } from 'react';
import { Text, Layout, Card } from '@ui-kitten/components';
import { FlatList, StyleSheet } from 'react-native';

import apiClient from '../../services/apiClient';
import { Help } from '../../utils/Help';
import { Constants } from '../../utils/Constants';

function CheckReservationScreen(props) {
    const [data, setData] = useState({});
    useEffect(() => {
        if (props.route.params && props.route.params.device_id) {
            apiClient.getRequest(`reservation/check/${props.route.params.device_id}`)
                .then(res => {
                    setData(res.data);
                }).catch(err => {

                })
        }
    }, [props.route]);

    if (!data.length) return (
        <Text category="h3" style={{ alignSelf: 'center', paddingTop: Constants.headerHeight }}>No Reservation found</Text>
    )
    return (
        <Layout level="4" style={{ height: '100%', paddingTop: Constants.headerHeight }}>
            <FlatList data={data} keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <Card style={{ margin: 10 }} disabled>
                        {
                            Object.keys(item).map((key, index) => (
                                <Layout key={index.toString()} style={styles.detailGroup}>
                                    <Text >{key.replace('_', ' ').toUpperCase()}</Text>
                                    {key.includes('time') ? <Text style={styles.text}>{Help.formatDateTime(new Date(item[key]))}</Text>
                                        : <Text style={styles.text}>{item[key] ? item[key].toString() : '--'}</Text>}
                                </Layout>
                            ))
                        }
                    </Card>
                )}
            />
        </Layout>
    )
}
export default CheckReservationScreen;

const styles = StyleSheet.create({
    text: { color: Constants.colors.greyText, maxWidth: '40%' },
    detailGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
})