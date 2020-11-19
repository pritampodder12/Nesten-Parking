import {Colors} from 'react-native-paper';
import {Dimensions} from 'react-native';

export class Constants {
  static routeNames = {
    drawer: 'Drawer',
    home: 'Home',
    bookings: 'Bookings',
    payment: 'Payment',
  };
  static colors = {
    primary: Colors.green400,
    green: Colors.green400,
    grey: Colors.grey300,
    greyText: Colors.grey600,
    black: Colors.black,
    red: Colors.red400,
    deepGrey: '#323232',
    white: Colors.white,
  };
  static screenSize = Dimensions.get('window');
  static mainFont = 'Poppins-Regular';
}
