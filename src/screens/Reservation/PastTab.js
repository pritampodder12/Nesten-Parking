import React, { useEffect } from 'react';
import { SectionList, View } from 'react-native';
import { Text, Spinner } from '@ui-kitten/components';

import { styles } from './styles';
import ListItem from './ListItem';
import { Help } from '../../utils/Help';
import ListTitle from './ListTitle';
import { useDispatch, useSelector } from 'react-redux';
import { getPastBookings } from '../../redux/actions';

function PastTab(props) {
    const pastBookings = useSelector(state => state.placepodReducer.pastBookings);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPastBookings())
    }, [])

    const onEndReached = () => {
        if (!pastBookings.endReached) {
            dispatch(getPastBookings())
        }
    }
    const listEmptyComponent = () => {
        if (pastBookings.endReached) return (
            <Text category="h3" style={styles.noBookingsText}>No Reservations found!</Text>
        )
        else return null;
    }
    const footer = () => {
        if (!pastBookings.endReached) return (
            <View style={styles.footer}>
                <Spinner />
            </View>
        )
        else return null;
    }
    return (
        <SectionList sections={Help.groupArrayDateWise(pastBookings.data)} keyExtractor={item => item.reservation_id}
            onEndReached={onEndReached}
            ListEmptyComponent={listEmptyComponent}
            renderItem={
                ({ item }) => (
                    <ListItem
                        data={item}
                        type="past"
                        navigation={props.navigation}
                    />
                )
            }
            renderSectionHeader={({ section: { title } }) => (
                <ListTitle title={title} />
            )}
            ListFooterComponent={footer}
        />
    )

}
export default PastTab;