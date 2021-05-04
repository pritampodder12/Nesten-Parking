import React, { useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { Text } from '@ui-kitten/components'

import { Constants } from '../../utils/Constants';
import SizedBox from '../../utils/components/SizedBox';
import { useDispatch, useSelector } from 'react-redux';
import ListItem from './ListItem';
import { getEarnings } from '../../redux/actions';

function EarningsScreen({ navigation }) {
  const dispatch = useDispatch();
  const earnings = useSelector(state => state.placepodReducer.earnings);

  useEffect(() => {
    dispatch(getEarnings());
  }, []);

  const onEndReached = () => {
    if (!earnings.endReached) {
      dispatch(getEarnings());
    }
  }

  const headerContent = () => (
    <View style={{ height: Constants.screenSize.height * 0.4, justifyContent: 'flex-end', marginLeft: Constants.screenSize.width * 0.2, paddingVertical: 10 }}>
      <View>
        <View style={{ height: 50, width: 50, position: 'absolute', backgroundColor: Constants.colors.success, top: 0, left: -10 }} />
        <Text category="h1">My
          <Text category="h1">{"\n"}Earnings</Text>
        </Text>
      </View>
      <SizedBox height={5} />
      <Text category="s2" status="danger">Total {earnings.total} NIT</Text>
      <SizedBox height={Constants.screenSize.height * 0.1} />
    </View>
  )

  return (
    <FlatList ListHeaderComponent={headerContent}
      data={earnings.data} keyExtractor={(item, index) => index.toString()}
      onEndReached={onEndReached}
      renderItem={({ item }) => (
        <ListItem data={item} navigation={navigation} />
      )}
    />
  );
}
export default EarningsScreen;