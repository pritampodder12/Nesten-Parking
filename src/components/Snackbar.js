import React, {useRef, useState} from 'react';
import {Snackbar as PaperSnackbar} from 'react-native-paper';
import {connect} from 'react-redux';
import {hideSnackbar} from '../redux/actions';
import {Constants} from '../utils/Constants';

function Snackbar(props) {
  const [visibleSnakbar, setVisibleSnakbar] = useState(false);
  const onToggleSnackBar = () => setVisibleSnakbar(!visibleSnakbar);

  return (
    <PaperSnackbar
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
    visible: state.helperReducer.visibleSnackbar,
    message: state.helperReducer.snackbarMessage,
  };
}

export default connect(mapStateToProps, {hideSnackbar})(Snackbar);
