import 'react-native-gesture-handler';

import React, {Component} from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {Provider as PaperProvider} from 'react-native-paper';
import {Provider as StoreProvider} from 'react-redux';

import AppNavigator from './navigation/AppNavigator';
import {Config} from './utils/Config';
import store from './redux/store';
import Loader from './components/Loader';
import Snackbar from './components/Snackbar';

MapboxGL.setAccessToken(Config.getMapKey());

class App extends Component {
  async componentDidMount() {
    const isGranted = await MapboxGL.requestAndroidLocationPermissions();
  }
  render() {
    return (
      <StoreProvider store={store}>
        <PaperProvider theme={Config.getAppTheme()}>
          <AppNavigator />
          <Snackbar />
          <Loader />
        </PaperProvider>
      </StoreProvider>
    );
  }
}
export default App;
