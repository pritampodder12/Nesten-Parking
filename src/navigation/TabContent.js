import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';

import { Constants } from '../utils/Constants';

export default function TabContent({ state, descriptors, navigation }) {
    const focusedOptions = descriptors[state.routes[state.index].key].options;

    if (focusedOptions.tabBarVisible === false) {
        return null;
    }

    return (
        <View style={{ flexDirection: 'row' }}>
            {state.routes.map((route, index) => {
                const isFocused = state.index === index;
                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        key={index}
                        disabled={isFocused}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={styles.tabContainer}
                    >
                        {
                            index == 0 && !isFocused && <Image source={require('../assets/icon/home.png')} style={styles.image} />
                        }
                        {
                            index == 0 && isFocused && <Image source={require('../assets/icon/home_active.png')} style={styles.image} />
                        }
                        {
                            index == 1 && !isFocused && <Image source={require('../assets/icon/reservation.png')} style={styles.image} />
                        }
                        {
                            index == 1 && isFocused && <Image source={require('../assets/icon/reservation_active.png')} style={styles.image} />
                        }
                        {
                            index == 2 && !isFocused && <Image source={require('../assets/icon/earnings.png')} style={styles.image} />
                        }
                        {
                            index == 2 && isFocused && <Image source={require('../assets/icon/earnings_active.png')} style={styles.image} />
                        }
                        {
                            index == 3 && !isFocused && <Image source={require('../assets/icon/profile.png')} style={styles.image} />
                        }
                        {
                            index == 3 && isFocused && <Image source={require('../assets/icon/profile_active.png')} style={styles.image} />
                        }
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}
const styles = StyleSheet.create({
    tabContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        height: Constants.tabBarHeight, width: Constants.screenSize.width / 4
    }
})