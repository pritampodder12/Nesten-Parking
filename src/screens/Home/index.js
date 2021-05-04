import React, { useEffect, useState } from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { StyleSheet, Image, View, Keyboard } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import BottomSheet from 'reanimated-bottom-sheet'

import availableIcon from '../../assets/icon/available.png';
import busyIcon from '../../assets/icon/busy.png';
import { Constants } from '../../utils/Constants';
import { logOut, fetchNearbyPlacepods, updatePlacepods } from '../../redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage } from 'react-native-flash-message';
import BottomSheetContent from './BottmSheetContent';
import BottomSheetHeader from './BottomSheetHeader';
import SearchBar from './SearchBar';
import { Help } from '../../utils/Help';

function HomeScreen(props) {
  const [pointAnnotation, setPointAnnotation] = useState([]);
  const [mapRef, setMapRef] = useState();
  const [camRef, setCamRef] = useState();
  const sheetRef = React.useRef(null);
  const [currentDevice, setCurrentDevice] = useState({ id: '', status: '', hourly_cost: '' });
  const [visibleSheet, setVisibleSheet] = useState(false);
  const [images] = useState({
    available: availableIcon,
    busy: busyIcon,
  });

  useEffect(() => {
    AsyncStorage.getItem("idToken").then(token => {
      if (jwtDecode(token).exp * 1000 < new Date().getTime()) {
        showMessage({ message: "Session expired! Log In to continue.", backgroundColor: Constants.colors.snackbarDefaultColor });
        props.logOut();
      }
      else props.fetchNearbyPlacepods(props.currentLocation.latitude, props.currentLocation.longitude);
    })
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      props.updatePlacepods();
    }, 10000);
    return () => clearInterval(interval);
  });

  // const handleZoom = async (type) => {
  //   let zoom = await mapRef.getZoom();
  //   type == 'plus' ? camRef.zoomTo(zoom + 1, 500) : camRef.zoomTo(zoom - 1, 500);
  // }
  // const handleCenterMap = () => {
  //   camRef.flyTo([props.currentLocation.longitude, props.currentLocation.latitude], 1000);
  // }

  // const handleMapLongPress = (e) => {
  //   props.fetchNearbyPlacepods(e.geometry.coordinates[1], e.geometry.coordinates[0]);
  //   setPointAnnotation([{ coordinates: e.geometry.coordinates }]);
  // }
  const handleMapPress = () => {
    Keyboard.dismiss();
    if (visibleSheet) sheetRef.current.snapTo(2);
  }

  const handleIconPress = ({ features }) => {
    Keyboard.dismiss();
    if (!visibleSheet) {
      setCurrentDevice({ id: features[0].id, status: features[0].properties.icon, hourly_cost: features[0].properties.hourly_cost });
      setVisibleSheet(true);
      sheetRef.current.snapTo(0);
    } else sheetRef.current.snapTo(2);
  };
  useEffect(() => {
    if (!!props.route.params && !!props.route.params.flyTo) {
      async function fly() {
        await camRef.flyTo(props.route.params.flyTo, 1000);
        props.fetchNearbyPlacepods(props.route.params.flyTo[1], props.route.params.flyTo[0])
      }
      fly();
    }
  }, [props.route]);

  return (
    <Layout style={styles.fullSpace}>
      <MapboxGL.MapView
        style={styles.fullSpace}
        styleURL={MapboxGL.StyleURL.Light}
        logoEnabled={false}
        attributionEnabled={false}
        ref={(c) => setMapRef(c)}
        onPress={handleMapPress}
        compassEnabled={false}
      // onLongPress={handleMapLongPress}
      >
        <MapboxGL.Camera
          zoomLevel={15}
          animationMode={'moveTo'}
          animationDuration={1000}
          minZoomLevel={1}
          maxZoomLevel={20}
          centerCoordinate={[props.currentLocation.longitude, props.currentLocation.latitude]}
          ref={(c) => setCamRef(c)}
        />
        <MapboxGL.UserLocation />
        <MapboxGL.Images images={images} />
        <MapboxGL.ShapeSource
          id="customSource"
          shape={props.placepodCollection}
          onPress={handleIconPress}>
          <MapboxGL.SymbolLayer id="customImage" style={mapStyles.icon} />
        </MapboxGL.ShapeSource>
        {/* {
            pointAnnotation.map((point, index) => (
              <MapboxGL.PointAnnotation
                key={index}
                id={index.toString()}
                coordinate={point.coordinates}>
              </MapboxGL.PointAnnotation>)
            )
          } */}
      </MapboxGL.MapView>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[Help.normalizeHeight(550), Help.normalizeHeight(300), 0]}
        renderHeader={() => <BottomSheetHeader status={currentDevice.status} />}
        renderContent={() => <BottomSheetContent visible={visibleSheet} sheetRef={sheetRef} device_id={currentDevice.id} hourly_cost={currentDevice.hourly_cost} />}
        initialSnap={2}
        onCloseEnd={() => setVisibleSheet(false)}
      />
      <SearchBar camRef={camRef} visibleSheet={visibleSheet} sheetRef={sheetRef} />
      <View style={styles.buttonContainer}>
        <View style={{ flexDirection: 'row', margin: 20, alignItems: 'center' }}>
          <Image style={{ height: 30, width: 30, resizeMode: 'contain' }} source={availableIcon} />
          <Text>   Vacant</Text>
        </View>
        <View style={{ flexDirection: 'row', marginLeft: 20, alignItems: 'center' }}>
          <Image style={{ height: 30, width: 30, resizeMode: 'contain' }} source={busyIcon} />
          <Text>   Occupied</Text>
        </View>
      </View>
      {/* <Layout style={styles.navigationButtonContainer}>
        <Layout style={{ backgroundColor: 'transparent' }}>
          <Button accessoryLeft={Constants.icons.plus} status="basic" size="small" style={{ marginBottom: 6, backgroundColor: 'white' }} onPress={handleZoom.bind(this, 'plus')} />
          <Button accessoryLeft={Constants.icons.minus} status="basic" size="small" style={{ backgroundColor: 'white' }} onPress={handleZoom.bind(this, 'minus')} />
          <Button
              accessoryLeft={() => <Icon name="crosshairs-gps" size={25} />}
              onPress={handleCenterMap} status="basic" style={{ height: 60, width: 60, borderRadius: 50, backgroundColor: 'white' }} />
        </Layout>
      </Layout> */}
    </Layout>
  );
}
function mapStateToProps(state) {
  return {
    currentLocation: state.locationReducer.currentLocation,
    placepodCollection: state.placepodReducer.placepodCollection
  };
}
export default connect(mapStateToProps, { logOut, fetchNearbyPlacepods, updatePlacepods })(HomeScreen);

const styles = StyleSheet.create({
  fullSpace: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    left: 0
  },
  navigationButtonContainer: {
    position: 'absolute',
    right: 30,
    bottom: 20,
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', backgroundColor: 'transparent'
  }
});

const mapStyles = {
  icon: {
    iconImage: ['get', 'icon'],
    iconSize: 0.6,
    iconAllowOverlap: true,
  },
};