import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";

import TabNavigator from './TabNavigator';
import AuthNavigator from './AuthNavigator';

function AppNavigator() {
  const isAuthenticated = useSelector(state => state.authReducer.isAuthenticated);

  useEffect(() => {
    return () => {
      LocationServicesDialogBox.stopListener();
    }
  }, []);

  return (
    <NavigationContainer>
      {
        isAuthenticated ?
          <TabNavigator /> : <AuthNavigator />
      }
    </NavigationContainer>
  );

}
export default AppNavigator;
