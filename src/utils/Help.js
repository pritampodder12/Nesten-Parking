import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { Linking, Dimensions, PixelRatio } from 'react-native';
import { baseURL } from './Constants';
import { Config } from './Config';
import moment from 'moment';
import _ from 'lodash';

export class Help {
  static formatDateTime(dt) {
    var months_arr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var date = new Date(Date.parse(dt));
    var year = date.getFullYear();
    var month = months_arr[date.getMonth()];
    var day = date.getDate();
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var fulldate = day + ' ' + month + ' ' + year + ' ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return fulldate;
  }
  static formatDate(dt) {
    if (moment(dt).isSame(moment(), 'day'))
      return 'Today'
    else
      return moment(dt).format("MMM Do");
  }
  static isToday(date) {
    return moment(date).isSame(moment(), 'day');
  }
  static isTomorrow(date) {
    return moment().add(1, 'days').isSame(moment(date), 'day');
  }
  static isYesterday(date) {
    return moment().add(-1, 'days').isSame(moment(date), 'day');
  }
  static minuteDifference(date1, date2) {
    var diff = Math.abs(new Date(date1) - new Date(date2));
    var minutes = Math.floor((diff / 1000) / 60);
    return minutes;
  }
  static createFeatureArray = (dataArray) => {
    let array = dataArray.map(item => {
      return {
        type: 'Feature',
        id: item.device_id,
        properties: {
          icon: item.presence ? 'busy' : 'available',
          hourly_cost: item.hourly_cost
        },
        geometry: {
          type: 'Point',
          coordinates: [
            item.long,
            item.lat
          ]
        },
      }
    });
    return array;
  }
  static navigateOnMap = (origin, destination) => {
    let url = `https://www.google.com/maps/dir/?api=1&origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}`;
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        console.log('Can\'t handle url: ' + url);
      } else {
        return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
  }
  static getValidToken = () => {
    return new Promise(async (resolve, reject) => {
      let token = JSON.parse(await AsyncStorage.getItem("idToken"));
      if (token && jwtDecode(token).exp * 1000 < new Date().getTime()) {
        let rToken = JSON.parse(await AsyncStorage.getItem("refreshToken"));
        let userdetails = JSON.parse(JSON.parse(await AsyncStorage.getItem('persist:root')).authReducer).userdetails;
        let config = {
          headers: {
            'x-nesteen-refresh': rToken,
          }
        }
        let data = {
          'userName': userdetails.username
        }
        axios.post(baseURL + 'user/refreshSession', data, config).then(res => {
          AsyncStorage.setItem("idToken", JSON.stringify(res.data.idToken));
          AsyncStorage.setItem("refreshToken", JSON.stringify(res.data.refreshToken));
          console.log('token refreshed')
          resolve(res.data.idToken);
        }).catch(err => {
          console.log('error while refreshing token!');
        })
      }
      else {
        resolve(token);
      }
    })
  }
  static getPlaceName = (lat, long) => {
    return new Promise((resolve, reject) => {
      axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${long},${lat}.json?access_token=${Config.getMapKey()}`)
        .then(({ data }) => {
          resolve(data.features[0].place_name);
        }).catch(err => {
          resolve('Unknown')
        })
    })
  }
  static getLatLong = (placeName) => {
    return new Promise((resolve, reject) => {
      axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${placeName}.json?access_token=${Config.getMapKey()}`)
        .then(({ data }) => {
          resolve(data.features[0]);
        }).catch(err => {
          resolve(null);
        })
    })
  }
  static groupArrayDateWise(array) {
    var grouped = _.mapValues(_.groupBy(array, function (item) {
      return moment(item.start_time).format("Do MMM YYYY")
    }));
    var arr = Object.keys(grouped).map(key => {
      return {
        title: this.isYesterday(grouped[key][0].start_time) ? 'Yesterday' :
          this.isToday(grouped[key][0].start_time) ? 'Today' :
            this.isTomorrow(grouped[key][0].start_time) ? 'Tomorrow' :
              key,
        data: grouped[key]
      }
    })
    return arr;
  }
  static normalize(size) {
    const scale = (Dimensions.get('window').width) / 400;
    const newSize = size * scale
    if (Platform.OS === 'ios') {
      return Math.round(PixelRatio.roundToNearestPixel(newSize))
    } else {
      return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
    }
  }
  static normalizeHeight(size) {
    const scale = (Dimensions.get('window').height) / 800;
    const newSize = size * scale
    if (Platform.OS === 'ios') {
      return Math.round(PixelRatio.roundToNearestPixel(newSize))
    } else {
      return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
    }
  }
  static emailIsValid(email) {
    return !!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
  }
  static passwordIsValid(password) {
    return !!/^(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/.test(password)
  }
}
