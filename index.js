/**
 * @format
 */
import * as React from 'react';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {
  configureFonts,
  DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import {Provider as StoreProvider} from 'react-redux';

import {name as appName} from './app.json';
import store from './src/redux/store';
import {Config} from './src/utils/Config';

const theme = {
  ...DefaultTheme,
  fonts: configureFonts(Config.fontConfig),
};

export default function Main() {
  return (
    <StoreProvider store={store}>
      <PaperProvider theme={theme}>
        <App />
      </PaperProvider>
    </StoreProvider>
  );
}
AppRegistry.registerComponent(appName, () => Main);
