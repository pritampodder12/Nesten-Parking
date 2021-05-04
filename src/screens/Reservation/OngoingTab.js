import React, { useEffect } from 'react';
import { SectionList, View } from 'react-native';
import { Text, Spinner } from '@ui-kitten/components';

import { styles } from './styles';
import ListItem from './ListItem';
import { Help } from '../../utils/Help';
import ListTitle from './ListTitle';
import { useDispatch, useSelector } from 'react-redux';
import { getOngoingBookings } from '../../redux/actions';

function OngoingTab(props) {
    const ongoingBookings = useSelector(state => state.placepodReducer.ongoingBookings);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOngoingBookings());
    }, [])

    const onEndReached = () => {
        if (!ongoingBookings.endReached) {
            dispatch(getOngoingBookings());
        }
    }
    const listEmptyComponent = () => {
        if (ongoingBookings.endReached) return (
            <Text category="h3" style={styles.noBookingsText}>No Reservations found!</Text>
        )
        else return null;
    }
    const footer = () => {
        if (!ongoingBookings.endReached) return (
            <View style={styles.footer}>
                <Spinner />
            </View>
        )
        else return null;
    }
    return (
        <SectionList sections={Help.groupArrayDateWise(ongoingBookings.data)} keyExtractor={item => item.reservation_id}
            onEndReached={onEndReached}
            ListEmptyComponent={listEmptyComponent}
            renderItem={
                ({ item }) => (
                    <ListItem
                        data={item}
                        type="ongoing"
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
export default OngoingTab;