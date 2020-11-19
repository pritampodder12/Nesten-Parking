import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Button,
  Card,
  Subheading,
  Text,
  Switch,
  Menu,
  TouchableRipple,
  Snackbar,
} from 'react-native-paper';
import {connect} from 'react-redux';

import {styles as globalStyles} from '../../utils/styles';
import {Constants} from '../../utils/Constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Help} from '../../utils/Help';
import apiService from '../../services/ApiService';
import {
  toggleLoader,
  showDropdownAlert,
  showSnackbar,
} from '../../redux/actions';

function MyBookingScreen(props) {
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [visibleMenu, setVisibleMenu] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState('1');

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  const handleSettle = () => {
    let body = {
      customer: '5FLSigC9HGRKVhB9FiEo4Y3koPsNmBmLJbpXg2mp1hXcS59Y',
      sensor_id: selectedMenuItem,
      spot_owner: '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty',
      space_used: isSwitchOn,
    };
    props.toggleLoader();
    apiService.settleDeposition(body, (res, err) => {
      if (res) props.showDropdownAlert('success', 'Settled', 'Thank You!');
      if (err) props.showSnackbar('Failed to Settle!');
      props.toggleLoader();
      props.navigation.reset({
        index: 0,
        routes: [{name: 'Drawer'}],
      });
    });
  };
  const toggleMenu = () => setVisibleMenu(!visibleMenu);
  const handleMenuItemPress = (index) => {
    setSelectedMenuItem(index);
    toggleMenu();
  };
  return (
    <View style={styles.container}>
      <Card style={{margin: 10}}>
        <Card.Content>
          <View style={styles.cardContent}>
            <View style={styles.detailGroup}>
              <Subheading>Owner</Subheading>
              <Text style={styles.text}>5FHneW46</Text>
            </View>
            <View style={styles.detailGroup}>
              <Subheading>Space Used</Subheading>
              <Switch
                color={Constants.colors.green}
                value={isSwitchOn}
                style={styles.switch}
                onValueChange={onToggleSwitch}
              />
            </View>
            <TouchableRipple style={styles.dropdownButton} onPress={toggleMenu}>
              <View style={styles.dropdownGroup}>
                <Subheading>Space ID</Subheading>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.text}>{selectedMenuItem}</Text>
                  <Icon
                    name="menu-down"
                    color={Constants.colors.black}
                    size={25}
                    style={styles.arrowIcon}
                  />
                </View>
              </View>
            </TouchableRipple>
            <Button
              mode="contained"
              uppercase={false}
              color={Constants.colors.green}
              dark={true}
              style={globalStyles.roundButton}
              onPress={handleSettle}>
              Settle
            </Button>
          </View>
        </Card.Content>
      </Card>
      <Menu
        visible={visibleMenu}
        onDismiss={toggleMenu}
        anchor={{
          x: Constants.screenSize.width - 50,
          y: Constants.screenSize.height / 5 + 30,
        }}>
        <Menu.Item onPress={handleMenuItemPress.bind(this, '1')} title="1" />
        <Menu.Item onPress={handleMenuItemPress.bind(this, '2')} title="2" />
        <Menu.Item onPress={handleMenuItemPress.bind(this, '3')} title="3" />
        <Menu.Item onPress={handleMenuItemPress.bind(this, '4')} title="4" />
      </Menu>
    </View>
  );
}
export default connect(null, {toggleLoader, showSnackbar, showDropdownAlert})(
  MyBookingScreen,
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  detailGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  dropdownButton: {
    marginBottom: 15,
  },
  dropdownGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  switch: {
    marginRight: -10,
  },
  text: {color: Constants.colors.greyText},
  arrowIcon: {
    marginTop: -3,
    marginRight: -5,
    marginLeft: 10,
  },
});
