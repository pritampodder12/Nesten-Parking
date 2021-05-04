import React, { useState } from 'react';
import { Text } from '@ui-kitten/components';
import { Image, Keyboard, KeyboardAvoidingView, StyleSheet, TextInput, TouchableHighlight, TouchableOpacity, View } from 'react-native';

import { Constants } from '../../utils/Constants';
import AuthDivider from '../../utils/components/AuthDivider';
import { useDispatch, useSelector } from 'react-redux';
import { Help } from '../../utils/Help';
import { fetchNearbyPlacepods } from '../../redux/actions';

export default function SearchBar({ camRef, visibleSheet, sheetRef }) {
    const currentLocation = useSelector(state => state.locationReducer.currentLocation)
    const [focused, setFocused] = useState(false);
    const [placName, setPlaceName] = useState('');
    const dispatch = useDispatch();
    const [history, setHistory] = useState([]);

    const handleItemPress = (latLong) => {
        Keyboard.dismiss();
        camRef.flyTo(latLong, 1000)
    }
    const handleSearch = async () => {
        if (!placName) return;
        if (visibleSheet) sheetRef.current.snapTo(2);
        let res = await Help.getLatLong(encodeURI(placName));
        if (res) {
            let latLong = res.geometry.coordinates;
            Keyboard.dismiss();
            dispatch(fetchNearbyPlacepods(latLong[1], latLong[0]))
            camRef.flyTo(latLong, 1000);

            let ht = history;
            if (ht.length == 3) ht.shift();
            ht.push({
                placName: res.place_name,
                latLong: res.geometry.coordinates
            });
            setHistory(ht);
        }
        setPlaceName('');
    }
    const onFocus = () => {
        if (visibleSheet) sheetRef.current.snapTo(2);
        setFocused(true);
    }
    return (
        <KeyboardAvoidingView keyboardVerticalOffset={20} behavior="position" style={styles.container}>
            <View style={{ ...styles.inputContainer, borderBottomLeftRadius: focused ? 0 : 5, borderBottomRightRadius: focused ? 0 : 5 }}>
                <TextInput placeholder="Find where to park" style={{ ...styles.text, flex: 1 }} onFocus={onFocus} onBlur={() => setFocused(false)}
                    value={placName}
                    onChangeText={(text) => setPlaceName(text)}
                />
                <TouchableOpacity onPress={handleSearch}>
                    <Image source={require('../../assets/icon/search.png')} style={styles.icon} />
                </TouchableOpacity>
            </View>

            {
                focused && <View style={styles.listContainer}>
                    <AuthDivider />
                    <View style={styles.listItem}>
                        <Image source={require('../../assets/icon/current_location.png')} style={styles.icon} />
                        <TouchableHighlight underlayColor="#DDDDDD" onPress={handleItemPress.bind(this, [currentLocation.longitude, currentLocation.latitude])} style={styles.listText}>
                            <Text style={styles.text}>Current location</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        {(history.length != 0) && <Image source={require('../../assets/icon/history.png')} style={{ ...styles.icon, marginTop: 10 }} />}
                        <View style={{ flex: 1 }}>
                            {
                                history.map((item, index) => (
                                    <TouchableHighlight key={index} underlayColor="#DDDDDD"
                                        onPress={handleItemPress.bind(this, item.latLong)}
                                        style={styles.listText}>
                                        <Text style={styles.text} numberOfLines={1}>{item.placName}</Text>
                                    </TouchableHighlight>
                                ))
                            }
                        </View>
                    </View>
                </View>
            }
        </KeyboardAvoidingView>
    )
}
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: Constants.screenSize.height * 0.1,
        left: 0, right: 0,
        marginHorizontal: Constants.screenSize.width * 0.08
    },
    inputContainer: {
        height: 50,
        backgroundColor: Constants.colors.white,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 10,
        paddingHorizontal: 15,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5
    },
    listContainer: {
        backgroundColor: Constants.colors.white,
        elevation: 10,
        marginTop: -1,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        paddingHorizontal: 15
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    listText: {
        flex: 1,
        marginLeft: 20,
        padding: 10
    },
    text: {
        fontFamily: 'Montserrat-Italic'
    },
    icon: {
        height: 22,
        width: 22,
        resizeMode: 'contain'
    }
})