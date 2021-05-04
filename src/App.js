import 'react-native-gesture-handler';

import React, { useEffect } from 'react';
import MapboxGL, { Logger } from '@react-native-mapbox-gl/maps';
import { Provider as StoreProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import FlashMessage from "react-native-flash-message";
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { LogBox } from 'react-native';

import { default as theme } from '../theme.json';
import AppNavigator from './navigation/AppNavigator';
import { Config } from './utils/Config';
import persist from './redux/store';
import Loader from './utils/components/Loader.js';
import { requestLocationPermissionAndGetCurrentLocation,setIsLoading } from './redux/actions';

MapboxGL.setAccessToken(Config.getMapKey());

const persistStore = persist();

function App() {
  useEffect(() => {
    persistStore.store.dispatch(requestLocationPermissionAndGetCurrentLocation());
    persistStore.store.dispatch(setIsLoading(false));
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

    Logger.setLogCallback(log => {
      const { message } = log;
      if (
        message.match('Request failed due to a permanent error: Canceled') ||
        message.match('Request failed due to a permanent error: Socket Closed')
      ) {
        return true;
      }
      return false;
    });

  }, []);

  return (
    <StoreProvider store={persistStore.store}>
      <PersistGate loading={null} persistor={persistStore.persistor}>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
          <AppNavigator />
          <Loader />
          <FlashMessage position="bottom" duration={5000} icon="auto" titleStyle={{ fontFamily: 'Montserrat-Regular' }} />
        </ApplicationProvider>
      </PersistGate>
    </StoreProvider>
  );
}
export default App;
