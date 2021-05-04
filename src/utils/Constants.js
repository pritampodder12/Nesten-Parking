import { Dimensions } from 'react-native';

// export const baseURL = 'http://192.168.0.106:4000/';
// export const baseURL = 'http://103.82.158.139:4000/';
// export const baseURL = 'http://192.168.29.203:4000/';
export const baseURL = 'http://64.227.103.175:4000/';

export class Constants {
  static routeNames = {
    homeDrawer: 'Drawer',
    home: 'Home',
    reservation:'Reservation',
    reservationDetails: 'Reservation Details',
    earnings: 'My Earnings',
    earningDetails: 'Earning Details',
    login: 'Log In',
    registration: 'Registration',
    placepods: 'Placepods',
    profile: 'Profile',
    checkReservation: 'Check Reservation',
    bookingModal: 'Booking Modal',
    editProfile: 'Edit Profile',
    forgot: 'Forgot Password',
    confirm: 'Confirm Password'
  };
  static colors = {
    primary: '#45496B',
    success: '#3BEEE0',
    info: '#5351FB',
    warning: '#484848',
    danger: '#FB5151',
    label: '#484848',
    disableLabel: '#979797',
    active: '#F6F6F6',
    inputBackground: '#FBFBFB',
    black: '#222B45',
    white: '#FFFFFF',
    divider: '#F1F5F8',
    green: '#025296',
    grey: '#E0E0E0',
    greyText: '#9E9E9E',
    red: '#EF5350',
    deepGrey: '#323232',
    pageBackground: '#F5F5F5',
    blue: '#274899',
    snackbarDefaultColor: '#313131',
    backdropColor: 'rgba(0, 0, 0, 0.5)',
    activeTab: '#8C1C15'
  };
  static screenSize = Dimensions.get('window');
  static mainFont = 'Montserrat-Regular';
  static headerHeight = this.screenSize.height / 10;
  static tabBarHeight = this.screenSize.height / 13;
}
