import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {View, StyleSheet} from 'react-native';
import {Drawer, Divider, Avatar, Title} from 'react-native-paper';
import {Constants} from '../utils/Constants';
import {DrawerContentScrollView} from '@react-navigation/drawer';

function DrawerContent(props) {
  const handlePress = (routeName) => {
    props.navigation.navigate(routeName);
  };
  return (
    <DrawerContentScrollView>
      <Divider />
      <View
        style={{
          flexDirection: 'row',
          marginVertical: 15,
          marginLeft: 15,
          alignItems: 'center',
        }}>
        <Avatar.Image
          style={{backgroundColor: Constants.colors.grey}}
          source={{
            uri: 'https://static.thenounproject.com/png/17241-200.png',
          }}
          size={50}
        />
        <View style={{marginLeft: 10}}>
          <Title>Hello, John</Title>
        </View>
      </View>
      <Divider />
      <Drawer.Item
        label={Constants.routeNames.home}
        active={
          props.state.routes[props.state.index].name ===
          Constants.routeNames.home
        }
        onPress={handlePress.bind(this, Constants.routeNames.home)}
        icon={({color, size}) => (
          <Icon name="car-connected" color={color} size={size} />
        )}
      />
      <Divider />
      <Drawer.Item
        label={Constants.routeNames.bookings}
        active={
          props.state.routes[props.state.index].name ===
          Constants.routeNames.bookings
        }
        onPress={handlePress.bind(this, Constants.routeNames.bookings)}
        icon={({color, size}) => (
          <Icon name="book-outline" color={color} size={size} />
        )}
      />
      <Divider />
    </DrawerContentScrollView>
  );
}
export default DrawerContent;

const styles = StyleSheet.create({});
