import 'react-native-gesture-handler';

import React, {Component} from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';

import AppNavigator from './navigation/AppNavigator';
import {Config} from './utils/Config';
import Loader from './components/Loader';
import Snackbar from './components/Snackbar';

MapboxGL.setAccessToken(Config.getMapKey());

class App extends Component {
  async componentDidMount() {
    const isGranted = await MapboxGL.requestAndroidLocationPermissions();
  }
  render() {
    return (
      <>
        <AppNavigator />
        <Snackbar />
        <Loader />
      </>
    );
  }
}
export default App;
