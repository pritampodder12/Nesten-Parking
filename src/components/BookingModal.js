import React, {useState} from 'react';
import {
  Modal,
  Portal,
  Text,
  Button,
  Menu,
  Divider,
  Subheading,
  Paragraph,
  TouchableRipple,
} from 'react-native-paper';
import {connect} from 'react-redux';
import {View, StyleSheet, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Help} from '../utils/Help';
import {Constants} from '../utils/Constants';
import apiService from '../services/ApiService';
import {toggleLoader, showSnackbar} from '../redux/actions';

function BookingModal(props) {
  const [visibleMenu, setVisibleMenu] = useState(false);
  const [selectedHourSlot, setSelectedHourSlot] = useState('01.00-02.00');

  const toggleMenu = () => setVisibleMenu(!visibleMenu);

  const handleConfirm = () => {
    props.toggleLoader();
    apiService.bookHourlySlot(
      {
        slots: selectedHourSlot,
      },
      (res, err) => {
        if (err) props.showSnackbar('Book Failed!');
        props.toggleLoader();
        props.navigation.navigate('Payment');
        props.toggleModal();
      },
    );
  };

  const handleMenuItemPress = (index) => {
    setSelectedHourSlot(Help.formatHourString(index));
    toggleMenu();
  };

  return (
    <Portal>
      <Modal
        visible={props.visible}
        onDismiss={props.toggleModal}
        contentContainerStyle={styles.modalContainer}>
        <View>
          <View style={styles.modalHeader}>
            <Text style={styles.modalHeaderText}>BOOK AVAILABLE SLOT</Text>
          </View>
          <Divider />
          <View style={styles.modalBody}>
            <TouchableRipple
              onPress={toggleMenu}
              rippleColor="rgba(0, 0, 0, .32)"
              style={styles.dropDownContainer}>
              <View style={styles.flexDirectionRow}>
                <Subheading style={{fontWeight: 'bold'}}>
                  Select Slot :
                </Subheading>
                <View style={{flex: 1}}></View>
                <View style={styles.flexDirectionRow}>
                  <Paragraph>{selectedHourSlot}</Paragraph>
                  <Icon
                    name="menu-down"
                    color={Constants.colors.black}
                    size={20}
                  />
                </View>
              </View>
            </TouchableRipple>

            <View style={styles.buttonContainer}>
              <Button
                mode="contained"
                uppercase={false}
                color={Constants.colors.grey}
                onPress={props.toggleModal}>
                Cancle
              </Button>
              <Button
                mode="contained"
                uppercase={false}
                color={Constants.colors.green}
                dark={true}
                onPress={handleConfirm}>
                Confirm Booking
              </Button>
            </View>
          </View>
        </View>
        <Menu
          visible={visibleMenu}
          onDismiss={toggleMenu}
          anchor={{
            x: Constants.screenSize.width - 50,
            y: Constants.screenSize.height / 2 + 30,
          }}>
          <ScrollView style={{height: Constants.screenSize.height / 4}}>
            {Array(24)
              .fill(0)
              .map((item, index) => (
                <Menu.Item
                  key={index}
                  onPress={handleMenuItemPress.bind(this, index)}
                  title={Help.formatHourString(index)}
                />
              ))}
          </ScrollView>
        </Menu>
      </Modal>
    </Portal>
  );
}

export default connect(null, {toggleLoader, showSnackbar})(BookingModal);

const styles = StyleSheet.create({
  modalContainer: {backgroundColor: 'white', margin: 30, borderRadius: 10},
  modalHeader: {
    paddingTop: 30,
    paddingBottom: 20,
    paddingLeft: 15,
  },
  modalHeaderText: {
    fontSize: 17,
    color: Constants.colors.red,
  },
  modalBody: {
    paddingVertical: 20,
  },
  flexDirectionRow: {
    flexDirection: 'row',
  },
  dropDownContainer: {
    marginBottom: 20,
    padding: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
});
