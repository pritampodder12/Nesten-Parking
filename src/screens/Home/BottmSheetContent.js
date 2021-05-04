import React, { useEffect, useState } from 'react';
import { Text, Icon } from '@ui-kitten/components';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { useDispatch } from 'react-redux';
import { showMessage } from 'react-native-flash-message';
import moment from 'moment';

import { Constants } from '../../utils/Constants';
import { reservationIsAvailable, deleteEscrow } from '../../redux/actions';
import apiClient from '../../services/apiClient';
import { Help } from '../../utils/Help';
import PaymentModal from './PaymentModal';
import CompleteModal from './CompleteModal';

const initialDate = moment().set("minute", 0).set("second", 0);

export default function BottomSheetContent({ device_id, hourly_cost, sheetRef, visible }) {
  const [state, setState] = useState({
    date: initialDate,
    duration: 1,
    currentStatus: 'initialView',
    escrow: {},
    currentPlaceName: ''
  });
  const dispatch = useDispatch();
  useEffect(() => {
    if (!visible) {
      if (state.escrow.id && state.currentStatus != 'paymentComplete')
        dispatch(deleteEscrow(state.escrow.id));

      setState({
        date: initialDate,
        duration: 1,
        currentStatus: 'initialView',
        escrow: {},
        currentPlaceName: ''
      });
    }
  }, [visible])

  const handleChange = (st, type) => {
    if (st == 'date') {
      let dt = moment(state.date);
      dt = type == 'increment' ? moment(dt).add(1, 'days') : moment(dt).subtract(1, 'days');
      setState({ ...state, date: dt });
    }
    else if (st == 'duration')
      setState({ ...state, duration: type == 'increment' ? state.duration + 1 : state.duration - 1 });
    else if (st == 'time') {
      let dt = moment(state.date);
      dt = type == 'increment' ? moment(dt).add(10, 'minutes') : moment(dt).subtract(10, 'minutes');
      setState({ ...state, date: dt });
    }
  }

  const handleNext = async () => {
    let dt = new Date(state.date);
    if (new Date(dt) < new Date().getTime()) return showMessage({ message: 'Reservation is not available for given time', type: 'danger' })
    setState({ ...state, currentStatus: 'loading' });
    let valid = await dispatch(reservationIsAvailable({
      reservationtimestamp: dt.toISOString(),
      duration: state.duration,
      placepod_id: device_id
    }));
    if (!valid) {
      showMessage({ message: 'Reservation is not available for given time', type: 'danger' });
      setState({ ...state, currentStatus: 'initialView' });
      return;
    }
    apiClient.getRequest(`parking/deviceid/${device_id}`).then(async res => {
      let place = await Help.getPlaceName(res.data[0].lat, res.data[0].long);
      setState({ ...state, currentStatus: 'confirmView', currentPlaceName: place, escrow: res.escrow });
    })
  }

  const handleConfirm = () => setState({ ...state, currentStatus: 'paying' });
  const handleRefresh = () => setState({ date: initialDate, duration: 1, currentStatus: 'initialView', escrow: {}, currentPlaceName: '' })
  // console.log(state)
  const InitialView = () => (<>
    <TouchableOpacity onPress={handleRefresh} style={{ alignSelf: 'flex-end', marginRight: 20, marginTop: 10 }}>
      <Icon name="refresh-outline" style={{ height: 20, width: 20 }} fill={Constants.colors.white} />
    </TouchableOpacity>
    <View style={{ flex: 1, justifyContent: 'space-evenly' }}>
      <Text category="h1" style={styles.heading}>{hourly_cost}
        <Text style={{ color: Constants.colors.white }}>  /hr</Text>
      </Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity onPress={handleChange.bind(this, 'date', 'increment')}>
            <Icon name="arrow-ios-upward-outline" style={styles.arrowIcon} fill={Constants.colors.white} />
          </TouchableOpacity>
          <Text category="h2" style={styles.selectText}>{Help.formatDate(state.date)}</Text>
          <TouchableOpacity onPress={handleChange.bind(this, 'date', 'decrement')} disabled={Help.isToday(state.date)}>
            <Icon name="arrow-ios-downward-outline" style={styles.arrowIcon} fill={Constants.colors.white} />
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity onPress={handleChange.bind(this, 'time', 'increment')}>
            <Icon name="arrow-ios-upward-outline" style={styles.arrowIcon} fill={Constants.colors.white} />
          </TouchableOpacity>
          <Text category="h2" style={styles.selectText}>{state.date.format("HH:mm")}</Text>
          <TouchableOpacity onPress={handleChange.bind(this, 'time', 'decrement')}>
            <Icon name="arrow-ios-downward-outline" style={styles.arrowIcon} fill={Constants.colors.white} />
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity onPress={handleChange.bind(this, 'duration', 'increment')} disabled={state.duration == 4}>
            <Icon name="arrow-ios-upward-outline" style={styles.arrowIcon} fill={Constants.colors.white} />
          </TouchableOpacity>
          <Text category="h2" style={styles.selectText}>{state.duration}Hour</Text>
          <TouchableOpacity onPress={handleChange.bind(this, 'duration', 'decrement')} disabled={state.duration == 1}>
            <Icon name="arrow-ios-downward-outline" style={styles.arrowIcon} fill={Constants.colors.white} />
          </TouchableOpacity>
        </View>
      </View>
      <Ripple style={{ borderRadius: 100, overflow: 'hidden', marginHorizontal: Help.normalizeHeight(36) }} onPress={handleNext}>
        <View style={styles.buttonContainer}>
          <Text category="h5" style={{ color: Constants.colors.white }}>{state.currentStatus == 'loading' ? 'Varifying date..' : 'Next'}</Text>
        </View>
      </Ripple>
    </View>
  </>
  )
  const ConfirmView = () => (
    <View style={{ flex: 1, justifyContent: 'space-around' }}>
      <View style={{ width: '90%', backgroundColor: Constants.colors.white, padding: Help.normalizeHeight(10), borderRadius: 20, alignSelf: 'center', alignItems: 'center' }}>
        <Text category="h1">{Math.round((hourly_cost * state.duration) * 100000) / 100000}
          <Text> NIT</Text>
        </Text>
      </View>

      <View>
        <Text category="s2" style={{ color: Constants.colors.white }}>Parking Space Name</Text>
        <Text category="s1" style={{ color: Constants.colors.white }}>{device_id}</Text>
      </View>

      <View>
        <Text category="s2" style={{ color: Constants.colors.white }}>Date, Duration, Time</Text>
        <Text category="s1" style={{ color: Constants.colors.white }}>{`${state.date.format("MM/DD(ddd)")}, ${state.duration}hour, ${state.date.format("HH:mm")} - ${moment(state.date).add(state.duration, "hours").format("HH:mm")}`}</Text>
      </View>

      <View>
        <Text category="s2" style={{ color: Constants.colors.white }}>Address</Text>
        <Text category="s1" style={{ color: Constants.colors.white }}>{state.currentPlaceName}</Text>
      </View>

      <View>
        <Text category="s2" style={{ color: Constants.colors.white }}>Paying to</Text>
        <Text category="s1" style={{ color: Constants.colors.white }}>{state.escrow.address}</Text>
      </View>
      <Ripple style={{ borderRadius: 100, overflow: 'hidden', marginHorizontal: 20 }} onPress={handleConfirm}>
        <View style={styles.buttonContainer}>
          <Text category="h5" style={{ color: Constants.colors.white }}>Confirm</Text>
        </View>
      </Ripple>
    </View>
  )
  return (
    <>
      <View style={{ ...styles.container, paddingHorizontal: state.currentStatus == 'confirmView' ? 16 : 0 }}>
        {(state.currentStatus == 'initialView' || state.currentStatus == 'loading') && <InitialView />}
        {(state.currentStatus == 'confirmView' || state.currentStatus == 'paying') && <ConfirmView />}
      </View>
      {state.currentStatus == 'paying' && <PaymentModal currentStatus={state.currentStatus} setCurrentStatus={(status) => setState({ ...state, currentStatus: status })}
        sheetRef={sheetRef}
        escrow={state.escrow}
        amount={hourly_cost * state.duration}
        date={state.date}
        duration={state.duration}
        device_id={device_id}
      />}
      {
        state.currentStatus == 'paymentComplete' && <CompleteModal amount={hourly_cost * state.duration} sheetRef={sheetRef} currentStatus={state.currentStatus} />
      }
    </>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: Constants.colors.primary,
    paddingHorizontal: 16,
    paddingTop:Help.normalizeHeight(10),
    height: '100%'
  },
  heading: { color: Constants.colors.white, alignSelf: 'center' },
  arrowIcon: {
    width: 40,
    height: 40
  },
  buttonContainer: {
    backgroundColor: Constants.colors.success, padding: Help.normalizeHeight(18), borderRadius: 100, alignItems: 'center'
  },
  selectText: { color: Constants.colors.white, fontSize: Help.normalize(32) }
})