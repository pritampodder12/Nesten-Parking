import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  Button,
  Card,
  Text,
  Subheading,
  Menu,
  TouchableRipple,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';

import {styles as globalStyles} from '../../utils/styles';
import {Constants} from '../../utils/Constants';
import apiService from '../../services/ApiService';
import {toggleLoader, showSnackbar} from '../../redux/actions';

function PaymentScreen(props) {
  const [owner] = useState('5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty');
  const [visibleMenu, setVisibleMenu] = useState(false);
  const [selectedSpaceId, setSelectedSpaceId] = useState('1');

  const toggleMenu = () => setVisibleMenu(!visibleMenu);
  const handleMenuItemPress = (index) => {
    setSelectedSpaceId(index);
    toggleMenu();
  };
  const handleConfirm = () => {
    props.toggleLoader();
    let body = {
      customer: '5FLSigC9HGRKVhB9FiEo4Y3koPsNmBmLJbpXg2mp1hXcS59Y',
      sensor_id: selectedSpaceId,
      spot_owner: '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty',
    };
    setTimeout(() => {
      apiService.depositSensor(body, (res, err) => {
        if (res) props.showSnackbar('Payment Completed!');
        if (err) props.showSnackbar('Unable to procced! Try again later.');
        props.toggleLoader();
        props.navigation.reset({
          index: 0,
          routes: [{name: 'Drawer'}],
        });
      });
    }, 5000);
  };
  return (
    <View style={styles.container}>
      <Card>
        <Card.Content>
          <View style={styles.cardContent}>
            <View style={styles.formGroup}>
              <Subheading>Owner</Subheading>
              <Text style={styles.text}>{owner.substr(0, 8)}...</Text>
            </View>
            <View style={styles.formGroup}>
              <Subheading>Ammount</Subheading>
              <Text style={styles.text}>20</Text>
            </View>
            <View style={styles.formGroup}>
              <Subheading>Space ID</Subheading>
              <Menu
                visible={visibleMenu}
                onDismiss={toggleMenu}
                anchor={
                  <TouchableRipple
                    onPress={toggleMenu}
                    style={styles.dropdownButton}>
                    <View style={styles.dropdown}>
                      <Text style={styles.text}>{selectedSpaceId}</Text>
                      <Icon
                        name="menu-down"
                        color={Constants.colors.black}
                        size={25}
                        style={styles.arrowIcon}
                      />
                    </View>
                  </TouchableRipple>
                }>
                {Array(3)
                  .fill(0)
                  .map((item, index) => (
                    <Menu.Item
                      key={index + 1}
                      onPress={handleMenuItemPress.bind(this, index + 1)}
                      title={index + 1}
                    />
                  ))}

                <Menu.Item
                  onPress={handleMenuItemPress.bind(this, '4')}
                  title="4"
                />
              </Menu>
            </View>
            <View style={styles.buttonContainer}>
              <Button
                mode="contained"
                uppercase={false}
                color={Constants.colors.green}
                dark={true}
                style={globalStyles.roundButton}
                onPress={handleConfirm}>
                Confirm And Pay
              </Button>
            </View>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
}
export default connect(null, {toggleLoader, showSnackbar})(PaymentScreen);

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  formGroup: {
    width: '50%',
    marginBottom: 15,
  },
  dropdownButton: {paddingRight: 10, paddingLeft: 3, paddingVertical: 5},
  buttonContainer: {
    width: '100%',
  },
  text: {color: Constants.colors.greyText},
  arrowIcon: {
    marginTop: -3,
  },
});
