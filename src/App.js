import 'react-native-gesture-handler';

import React, {Component} from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import DropdownAlert from 'react-native-dropdownalert';
import {connect} from 'react-redux';

import AppNavigator from './navigation/AppNavigator';
import {Config} from './utils/Config';
import {setDropdownAlert} from './redux/actions';
import Loader from './components/Loader';

MapboxGL.setAccessToken(Config.getMapKey());

class App extends Component {
  async componentDidMount() {
    const isGranted = await MapboxGL.requestAndroidLocationPermissions();
  }
  render() {
    return (
      <>
        <AppNavigator />
        <DropdownAlert
          ref={(ref) => this.props.setDropdownAlert(ref)}
          closeInterval={6000}
        />
        <Loader visible={this.props.showLoader} />
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    showLoader: state.helperReducer.showLoader,
  };
}
export default connect(mapStateToProps, {setDropdownAlert})(App);
