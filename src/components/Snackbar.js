import React from 'react';
import {Snackbar as PaperSnackbar} from 'react-native-paper';
import {connect} from 'react-redux';
import {hideSnackbar} from '../redux/actions';
import {Constants} from '../utils/Constants';

function Snackbar(props) {
  return (
    <PaperSnackbar
      theme={{colors: {accent: Constants.colors.primary}}}
      style={{backgroundColor: Constants.colors.deepGrey}}
      visible={props.visible}
      onDismiss={props.hideSnackbar}
      action={{
        label: 'OK',
        onPress: props.hideSnackbar,
      }}>
      {props.message}
    </PaperSnackbar>
  );
}
function mapStateToProps(state) {
  return {
    visible: state.uiReducer.visibleSnackbar,
    message: state.uiReducer.snackbarMessage,
  };
}

export default connect(mapStateToProps, {hideSnackbar})(Snackbar);
