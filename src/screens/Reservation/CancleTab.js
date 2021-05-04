import React, { useEffect } from 'react';
import { SectionList, View } from 'react-native';
import { Text, Spinner } from '@ui-kitten/components';

import { styles } from './styles';
import ListItem from './ListItem';
import { Help } from '../../utils/Help';
import ListTitle from './ListTitle';
import { useDispatch, useSelector } from 'react-redux';
import { getCancleBookings } from '../../redux/actions';

function CancleTab(props) {
    const cancleBookings = useSelector(state => state.placepodReducer.cancleBookings);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCancleBookings());
    }, [])

    const onEndReached = () => {
        if (!cancleBookings.endReached) {
            dispatch(getCancleBookings());
        }
    }
    const listEmptyComponent = () => {
        if (cancleBookings.endReached) return (
            <Text category="h3" style={styles.noBookingsText}>No Reservations found!</Text>
        )
        else return null;
    }
    const footer = () => {
        if (!cancleBookings.endReached) return (
            <View style={styles.footer}>
                <Spinner />
            </View>
        )
        else return null;
    }
    return (
        <SectionList sections={Help.groupArrayDateWise(cancleBookings.data)} keyExtractor={item => item.reservation_id}
            onEndReached={onEndReached}
            ListEmptyComponent={listEmptyComponent}
            renderItem={
                ({ item }) => (
                    <ListItem
                        data={item}
                        type="cancle"
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
export default CancleTab;