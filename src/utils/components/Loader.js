import React from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Layout, Text, Spinner } from '@ui-kitten/components';
import Modal from 'react-native-modal';

function Loader(props) {
  return (
    <Modal isVisible={props.visible} useNativeDriver={true} animationInTiming={1} animationOutTiming={1}>
      <Layout style={styles.container}>
        <Spinner size="large" />
        <Text>Please wait...</Text>
      </Layout>
    </Modal>
  );
}
function mapStateToProps(state) {
  return {
    visible: state.uiReducer.visibleLoader,
  };
}
export default connect(mapStateToProps)(Loader);

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
