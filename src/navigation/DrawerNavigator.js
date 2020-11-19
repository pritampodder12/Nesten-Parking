import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from '../screens/Home/HomeScreen';
import MyBookingScreen from '../screens/MyBookings/MyBookingScreen';
import {Constants} from '../utils/Constants';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => (
  <Drawer.Navigator
    screenOptions={{
      headerShown: true,
      headerTitleStyle: {fontFamily: Constants.mainFont},
      // headerTintColor: Constants.colors.green,
    }}>
    <Drawer.Screen
      name={Constants.routeNames.home}
      component={HomeScreen}
      options={{
        headerTitle: 'Parking Sensors',
        drawerIcon: ({focused, color, size}) => (
          <Icon name="home-outline" color={color} size={size} />
        ),
      }}
    />
    <Drawer.Screen
      name={Constants.routeNames.bookings}
      component={MyBookingScreen}
      options={{
        headerTitle: 'Your Bookings',
        drawerIcon: ({focused, color, size}) => (
          <Icon name="book-outline" color={color} size={size} />
        ),
      }}
    />
  </Drawer.Navigator>
);
export default DrawerNavigator;
