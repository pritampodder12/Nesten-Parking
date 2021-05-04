import React, { useState } from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { ScrollView, TouchableHighlight, View } from 'react-native';

import OngoingTab from './OngoingTab';
import UpcomingTab from './UpcomingTab';
import PastTab from './PastTab';
import CancleTab from './CancleTab';
import { Constants } from '../../utils/Constants';
import SizedBox from '../../utils/components/SizedBox';
import { useDispatch } from 'react-redux';
import { resetBookingsData } from '../../redux/actions';

const Tabs = ['Ongoing', 'Upcoming', 'Past', 'Cancelled'];

function ReservationScreen(props) {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const dispatch = useDispatch();

  const handleTabPress = (index) => {
    dispatch(resetBookingsData());
    setCurrentTabIndex(index);
  }

  return (
    <ScrollView>
      <Layout level="1" style={{ height: Constants.screenSize.height * 0.315, justifyContent: 'flex-end', alignItems: 'center', paddingVertical: 10, marginBottom: 15 }}>
        <View>
          <View style={{ height: 50, width: 50, position: 'absolute', backgroundColor: Constants.colors.success, top: 0, left: -10 }} />
          <Text category="h1">Reservations
          </Text>
        </View>
        <SizedBox height={30} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '80%' }}>
          {
            Tabs.map((el, index) => (
              <TouchableHighlight underlayColor="#DDDDDD" onPress={handleTabPress.bind(this, index)} key={index} style={{ padding: 10 }} disabled={index == currentTabIndex}>
                <Text category={index == currentTabIndex ? "s2" : "s1"}>{el}</Text>
              </TouchableHighlight>
            ))
          }
        </View>
      </Layout>
      <View style={{ flex: 1 }}>
        {
          currentTabIndex == 0 ? <OngoingTab navigation={props.navigation} /> :
            currentTabIndex == 1 ? <UpcomingTab navigation={props.navigation} /> :
              currentTabIndex == 2 ? <PastTab navigation={props.navigation} /> : <CancleTab navigation={props.navigation} />
        }
      </View>
    </ScrollView>

  );
}
export default ReservationScreen;