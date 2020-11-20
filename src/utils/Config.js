import {configureFonts, DefaultTheme} from 'react-native-paper';
import {Constants} from './Constants';

export class Config {
  static fontConfig = {
    default: {
      regular: {
        fontFamily: 'Poppins-Regular',
        fontWeight: 'normal',
      },
      medium: {
        fontFamily: 'Poppins-Medium',
        fontWeight: 'normal',
      },
      light: {
        fontFamily: 'Poppins-Light',
        fontWeight: 'normal',
      },
      thin: {
        fontFamily: 'Poppins-Thin',
        fontWeight: 'normal',
      },
    },
  };
  static appTheme = {
    ...DefaultTheme,
    fonts: configureFonts(this.fontConfig),
    colors: {
      ...DefaultTheme.colors,
      primary: Constants.colors.primary,
      accent: '#f1c40f',
    },
  };
  static getAppTheme() {
    return this.appTheme;
  }
  static getMapKey() {
    return 'pk.eyJ1IjoibmVzdGVuIiwiYSI6ImNrOGc3cWx4aDAxdm8zZW95NWEyM3Nib24ifQ.Yx4yz2QGy7MoeevZA9xMmA';
  }
}
