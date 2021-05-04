import React, { useEffect } from 'react';
import { SectionList,View } from 'react-native';
import { Text,Spinner } from '@ui-kitten/components';

import { styles } from './styles';
import ListItem from './ListItem';
import { Help } from '../../utils/Help';
import ListTitle from './ListTitle';
import { useDispatch, useSelector } from 'react-redux';
import { getUpcomingBookings } from '../../redux/actions';

function UpcomingTab(props) {
    const upcomingBookings = useSelector(state => state.placepodReducer.upcomingBookings);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUpcomingBookings());
    }, [])

    const onEndReached = () => {
        if (!upcomingBookings.endReached) {
            dispatch(getUpcomingBookings());
        }
    }
    const listEmptyComponent = () => {
        if (upcomingBookings.endReached) return (
            <Text category="h3" style={styles.noBookingsText}>No Reservations found!</Text>
        )
        else return null;
    }
    const footer = () => {
        if (!upcomingBookings.endReached) return (
            <View style={styles.footer}>
                <Spinner />
            </View>
        )
        else return null;
    }
    return (
        <SectionList sections={Help.groupArrayDateWise(upcomingBookings.data)} keyExtractor={item => item.reservation_id}
            onEndReached={onEndReached}
            ListEmptyComponent={listEmptyComponent}
            renderItem={
                ({ item }) => (
                    <ListItem
                        data={item}
                        type="upcoming"
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
export default UpcomingTab;