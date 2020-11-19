import React, {useState, useEffect} from 'react';
import {
  IconButton,
  Modal,
  Portal,
  Colors,
  Title,
  Headline,
  Divider,
} from 'react-native-paper';
import {View, StyleSheet} from 'react-native';

import apiService from '../services/ApiService';
import {showSnackbar} from '../redux/actions';
import {connect} from 'react-redux';

function BalanceModal(props) {
  const id = useState('5FLSigC9HGRKVhB9FiEo4Y3koPsNmBmLJbpXg2mp1hXcS59Y');
  const [balance, setBalance] = useState('12345');

  useEffect(() => {
    if (props.visible) {
      apiService.getBalance(id, (res, error) => {
        if (res) setBalance(res.balanceof);
        if (error) {
          props.showSnackbar('Failed to load Balance!');
        }
      });
    }
  }, [props.visible]);

  return (
    <Portal>
      <Modal
        visible={props.visible}
        onDismiss={props.toggleModal}
        contentContainerStyle={styles.modalContainer}>
        <View>
          <View style={styles.modalHeader}>
            <IconButton icon="close" onPress={props.toggleModal} />
          </View>
          <Divider />
          <View style={styles.modalBody}>
            <Title>Balance : </Title>
            <Headline style={{color: Colors.green400}}>{balance}</Headline>
          </View>
        </View>
      </Modal>
    </Portal>
  );
}
export default connect(null, {showSnackbar})(BalanceModal);

const styles = StyleSheet.create({
  modalContainer: {backgroundColor: 'white', margin: 30, borderRadius: 10},
  modalHeader: {
    alignItems: 'flex-end',
  },
  modalBody: {
    paddingHorizontal: 25,
    paddingVertical: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
