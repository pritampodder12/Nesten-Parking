import MapboxGL from '@react-native-mapbox-gl/maps';
import { BackHandler, DeviceEventEmitter, Alert } from 'react-native';
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import Geolocation from '@react-native-community/geolocation';

import { SET_GPS_ENABLED, SET_CURRENT_LOCATION } from './actionTypes';

export const requestLocationPermissionAndGetCurrentLocation = () => (dispatch) => {
  MapboxGL.requestAndroidLocationPermissions().then((isGranted) => {
    if (isGranted) {
      LocationServicesDialogBox.checkLocationServicesIsEnabled({
        message: "This app wants to change your device settings:<br/><br/>Use GPS for location<br/>",
        ok: "YES",
        cancel: "NO",
        enableHighAccuracy: true,
        showDialog: true,
        openLocationServices: true,
        preventOutSideTouch: true,
        preventBackClick: true,
        providerListener: true
      }).then((success) => {
        dispatch({ type: SET_GPS_ENABLED, payload: true })
        DeviceEventEmitter.addListener('locationProviderStatusChange', (status) => {
          dispatch({ type: SET_GPS_ENABLED, payload: status.enabled })
        });
        Geolocation.getCurrentPosition(position => {
          const currentLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
          dispatch({ type: SET_CURRENT_LOCATION, payload: currentLocation })
        }, error => {
          console.log('Error while getting user location!', error);
          BackHandler.exitApp()
        }, {
          enableHighAccuracy: false,
          timeout: 20000,
          maximumAge: 10000
        }
        );
      }).catch((error) => {
        BackHandler.exitApp();
      });
    }
    else {
      Alert.alert(
        "Location Permission Denied",
        "Please allow location permission to use this app",
        [
          {
            text: "OK",
            onPress: () => BackHandler.exitApp(),
            style: "cancel"
          }
        ],
        { cancelable: false }
      );
    }
  });
}