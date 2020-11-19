import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {Button, IconButton, Provider} from 'react-native-paper';
import {View, StyleSheet, Image} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {connect} from 'react-redux';

import availableIcon from '../../assets/icon/available.png';
import busyIcon from '../../assets/icon/busy.png';
import BookingModal from '../../components/BookingModal';
import BalanceModal from '../../components/BalanceModal';
import {Constants} from '../../utils/Constants';
import {styles as globalStyles} from '../../utils/styles';
import apiService from '../../services/ApiService';
import {showSnackbar} from '../../redux/actions';

function HomeScreen(props) {
  const [centerLocation, setCenterLocation] = useState([12.550343, 55.665957]);
  const [visibleBalanceModal, setVisibleBalanceModal] = useState(false);
  const [visibleBookingModal, setvisibleBookingModal] = useState(false);
  const [images] = useState({
    available: availableIcon,
    busy: busyIcon,
  });
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <IconButton icon="wallet-outline" onPress={toggleBalanceModal} />
      ),
    });
  }, [props.navigation]);

  useEffect(() => {
    async function getLocation() {
      try {
        const location = await MapboxGL.locationManager;
        const data = {
          title: 'new_title',
          body: 'new_body',
          userId: 'userid',
        };
        // apiService.demoPostRequest(data, (response, error) => {
        //   console.log('Response from server', response);
        // });
        // apiService.demoGetRequest((res, err) => {
        //   console.log('res of get', res);
        // });
        await apiService.getBalance('1', (res, err) => {
          // props.showSnackbar('Failed to load data!');
        });
      } catch {}
    }
    getLocation();
  }, []);

  const toggleBalanceModal = () => setVisibleBalanceModal(!visibleBalanceModal);

  const toggleBookingModal = () => setvisibleBookingModal(!visibleBookingModal);

  const handleIconPress = ({features}) => {
    if (features[0].properties.icon == 'available') toggleBookingModal();
    else setCenterLocation(features[0].geometry.coordinates);
  };
  const centerMap = () => {
    setCenterLocation([12.550343, 55.665957]);
  };
  return (
    <Provider>
      <BalanceModal
        visible={visibleBalanceModal}
        toggleModal={toggleBalanceModal}
      />

      <BookingModal
        visible={visibleBookingModal}
        toggleModal={toggleBookingModal}
        navigation={props.navigation}
      />

      <View style={styles.fullSpace}>
        <MapboxGL.MapView
          style={styles.fullSpace}
          logoEnabled={false}
          attributionEnabled={false}>
          <MapboxGL.Camera
            zoomLevel={14}
            animationMode={'flyTo'}
            animationDuration={1000}
            centerCoordinate={centerLocation}
            minZoomLevel={10}
            maxZoomLevel={16}
            // followUserLocation
          />
          <MapboxGL.UserLocation />
          <MapboxGL.Images images={images} />
          <MapboxGL.ShapeSource
            id="customSource"
            shape={featureCollection}
            onPress={handleIconPress}>
            <MapboxGL.SymbolLayer id="customImage" style={mapStyles.icon} />
          </MapboxGL.ShapeSource>
        </MapboxGL.MapView>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          mode={'contained'}
          uppercase={false}
          dark={false}
          color={Constants.colors.white}
          style={{...globalStyles.roundButton, marginRight: 10}}
          onPress={centerMap}>
          <Image style={{height: 14, width: 14}} source={availableIcon} />
          {'  '}Available
        </Button>
        <Button
          mode="contained"
          uppercase={false}
          dark={false}
          color={Constants.colors.white}
          style={globalStyles.roundButton}
          onPress={centerMap}>
          <Image style={{height: 14, width: 14}} source={busyIcon} />
          {'  '}Busy
        </Button>
      </View>
    </Provider>
  );
}
function mapStateToProps(state) {
  return {
    dropdownRef: state.helperReducer.dropdownRef,
  };
}

export default connect(mapStateToProps, {showSnackbar})(HomeScreen);

const styles = StyleSheet.create({
  fullSpace: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'center',
  },
});

const mapStyles = {
  icon: {
    iconImage: ['get', 'icon'],
    iconSize: 0.6,
    iconAllowOverlap: true,
  },
};

const featureCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      id: '1',
      properties: {
        icon: 'available',
      },
      geometry: {
        type: 'Point',
        coordinates: [12.550343, 55.665957],
      },
    },
    {
      type: 'Feature',
      id: '2',
      properties: {
        icon: 'busy',
      },
      geometry: {
        type: 'Point',
        coordinates: [12.545665, 55.665957],
      },
    },
    {
      type: 'Feature',
      id: '3',
      properties: {
        icon: 'busy',
      },
      geometry: {
        type: 'Point',
        coordinates: [12.5465, 55.66857],
      },
    },
  ],
};
