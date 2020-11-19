import React, {Component} from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import DrawerNavigator from './DrawerNavigator';
import PaymentScreen from '../screens/Payment/PaymentScreen';
import {Constants} from '../utils/Constants';

const Stack = createStackNavigator();
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Constants.colors.green,
    // background: Constants.colors.grey,
    // card: '#272727',
    text: Constants.colors.green,
  },
};
class AppNavigator extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            ...TransitionPresets.SlideFromRightIOS,
            headerTitleStyle: {fontFamily: Constants.mainFont},
          }}>
          <Stack.Screen
            name={Constants.routeNames.drawer}
            component={DrawerNavigator}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={Constants.routeNames.payment}
            component={PaymentScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default AppNavigator;
