import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Constants } from '../utils/Constants';
import HomeScreen from '../screens/Home';
import ReservationScreen from '../screens/Reservation';
import EarningsScreen from '../screens/Earnings';
import ProfileScreen from '../screens/Profile';
import CheckReservationScreen from '../screens/CheckReservation';

import Header from './Header';
import TabContent from './TabContent';
import EditProfileScreen from '../screens/EditProfile.js';
import EarningDetailsScreen from '../screens/EarningDetails';
import ReservationDetailsScreen from '../screens/ReservationDetails';

const HomeStack = createStackNavigator();
const ReservationStack = createStackNavigator();
const EarningStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTab = () => (
    <HomeStack.Navigator screenOptions={{ header: (props) => <Header {...props} />, cardStyle: { backgroundColor: Constants.colors.inputBackground } }}>
        <HomeStack.Screen name={Constants.routeNames.home} component={HomeScreen} />
        <HomeStack.Screen name={Constants.routeNames.checkReservation} component={CheckReservationScreen} />
    </HomeStack.Navigator>
)
const ReservationTab = () => (
    <ReservationStack.Navigator screenOptions={{ header: (props) => <Header {...props} />, cardStyle: { backgroundColor: Constants.colors.inputBackground } }}>
        <ReservationStack.Screen name={Constants.routeNames.reservation} component={ReservationScreen} />
        <ReservationStack.Screen name={Constants.routeNames.reservationDetails} component={ReservationDetailsScreen} />
    </ReservationStack.Navigator>
)
const EarningTab = () => (
    <EarningStack.Navigator screenOptions={{ header: (props) => <Header {...props} />, cardStyle: { backgroundColor: Constants.colors.inputBackground } }}>
        <EarningStack.Screen name={Constants.routeNames.earnings} component={EarningsScreen} />
        <EarningStack.Screen name={Constants.routeNames.earningDetails} component={EarningDetailsScreen} />
    </EarningStack.Navigator>
)
const ProfileTab = () => (
    <ProfileStack.Navigator screenOptions={{ header: (props) => <Header {...props} />, cardStyle: { backgroundColor: Constants.colors.inputBackground } }}>
        <ProfileStack.Screen name={Constants.routeNames.profile} component={ProfileScreen} />
        <ProfileStack.Screen name={Constants.routeNames.editProfile} component={EditProfileScreen} />
    </ProfileStack.Navigator>
)

const TabNavigator = () => (
    <Tab.Navigator tabBar={(props) => <TabContent {...props} />} initialRouteName={Constants.routeNames.home} backBehavior="initialRoute">
        <Tab.Screen name={Constants.routeNames.home} component={HomeTab} />
        <Tab.Screen name={Constants.routeNames.reservation} component={ReservationTab} />
        <Tab.Screen name={Constants.routeNames.earnings} component={EarningTab} />
        <Tab.Screen name={Constants.routeNames.profile} component={ProfileTab} />
    </Tab.Navigator>
)
export default TabNavigator;