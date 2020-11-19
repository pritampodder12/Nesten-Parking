import React, {useState} from 'react';
import {StyleSheet, ActivityIndicator} from 'react-native';

import {Modal, Portal, Text} from 'react-native-paper';
import {Constants} from '../utils/Constants';

function Loader(props) {
  return (
    <Portal>
      <Modal
        visible={props.visible}
        dismissable={false}
        contentContainerStyle={styles.container}>
        <ActivityIndicator size="large" color={Constants.colors.primary} />
        <Text>Please wait...</Text>
      </Modal>
    </Portal>
  );
}
export default Loader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: 200,
    alignSelf: 'center',
    paddingVertical: 25,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 5,
    elevation: 5,
  },
});
