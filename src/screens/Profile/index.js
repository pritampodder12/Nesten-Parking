import React, { useEffect, useState } from 'react';
import { Button, Text, Avatar, Icon } from '@ui-kitten/components';
import { StyleSheet, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Constants } from '../../utils/Constants';
import { logOut, getRegisteredPlacepods } from '../../redux/actions';
import SizedBox from '../../utils/components/SizedBox';
import ListItem from './ListItem';
import AddPlacepodModal from './AddPlacepodModal';
import { Help } from '../../utils/Help';

function ProfileScreen({ navigation }) {
    const userdetails = useSelector(state => state.authReducer.userdetails);
    const placepods = useSelector(state => state.placepodReducer.registeredPlacepods);
    const dispatch = useDispatch();
    const [visibleModal, setVisibleModal] = useState(false);

    const handleLogout = () => dispatch(logOut());
    const toggleModal = () => setVisibleModal(!visibleModal)
    useEffect(() => {
        dispatch(getRegisteredPlacepods());
    }, []);
    const onEndReached = () => {
        if (!placepods.endReached)
            dispatch(getRegisteredPlacepods());
    }

    const ListHeaderComponent = () => <View style={styles.container}>
        <SizedBox height={60} />
        <View style={styles.profileHeader}>
            <View style={{ position: 'absolute', left: -30, height: 40, width: 51, backgroundColor: Constants.colors.success }} />
            <TouchableOpacity activeOpacity={1} onPress={() => { navigation.navigate(Constants.routeNames.editProfile) }}>
                <Avatar size="giant" source={{
                    uri: 'https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTl8fGxhZHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80'
                }} />
            </TouchableOpacity>
            <View style={{ flex: 1 }} />
            <Text category="h1" style={styles.h1Text}>{userdetails.username}
                <Text category="s1">{'\n'}{placepods.data.length} spaces registered</Text>
            </Text>
            <View style={{ flex: 1 }} />
            <Button appearance="ghost" onPress={handleLogout}
                accessoryLeft={(props) => <Icon {...props} name="power-outline" />} />
            <View style={{ flex: 1 }} />
        </View>
        <SizedBox height={20} />
        <View style={styles.detailsContainer}>
            <Text category="s2">Email
            <Text category="s1">{'\n' + userdetails.email}</Text>
            </Text>
            <SizedBox height={15} />
            <Text category="s2">Wallet Address
            <Text category="s1">{'\n' + userdetails.address}</Text>
            </Text>
        </View>
        <SizedBox height={50} />
        <View style={styles.placepodHeaderContainer}>
            <View style={{ position: 'absolute', left: 0, top: 0, height: Help.normalize(40), width: Help.normalize(200), backgroundColor: Constants.colors.success }} />
            <Text category="h1" style={styles.h1Text}>My Parking
        <Text category="h1" style={styles.h1Text}>{'\n'}Spaces</Text>
            </Text>
            <Button style={styles.plusButton} onPress={() => setVisibleModal(true)}
                accessoryLeft={(props) => <Icon {...props} name="plus" />} />
        </View>
    </View>
    return (
        <>
            <FlatList ListHeaderComponent={ListHeaderComponent} data={placepods.data} keyExtractor={(iten, index) => index.toString()}
                onEndReached={onEndReached}
                renderItem={({ item }) => (
                    <ListItem data={item} />
                )}
            />
            <AddPlacepodModal visible={visibleModal} toggleModal={toggleModal} />
        </>
    )
}
export default ProfileScreen;

const styles = StyleSheet.create({
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 30
    },
    container: {
        flex: 1
    },
    detailsContainer: {
        marginLeft: 50,
        marginRight: 30
    },
    placepodHeaderContainer: {
        marginLeft: 30,
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'
    },
    plusButton: {
        height: 35, width: 35, borderRadius: 35, elevation: 9
    },
    h1Text: {
        fontSize: Help.normalize(32)
    }
});