import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { Input, Text } from '@ui-kitten/components';
import { Constants } from '../../utils/Constants';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile, showSnackbar } from '../../redux/actions';

export default function EditProfileScreen({ navigation }) {
    const userdetails = useSelector(state => state.authReducer.userdetails);
    const [userName, setUserName] = useState(userdetails.username);
    const [email, setEmail] = useState(userdetails.email);
    const [address, setAddress] = useState(userdetails.address);
    const dispatch = useDispatch();

    const handleSubmit = () => {
        if (!(/^0x[a-fA-F0-9]{40}$/.test(address))) return dispatch(showSnackbar("Invalid Address", "danger"));
        dispatch(updateProfile({ address, email, userName }, navigation));
    }
    return <ScrollView contentContainerStyle={styles.container}>
        <Image source={require('../../assets/images/oval.png')} style={styles.oval} />
        <View style={styles.headerContainer}>
            <View style={styles.headerLeft}>
                <Text category="h1" style={{ marginLeft: Constants.screenSize.width / 5 }}>Your{'\n'}Profile</Text>

                <ImageBackground style={styles.imageContainer} imageStyle={{ borderRadius: 1000 }}
                    source={{
                        uri: 'https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTl8fGxhZHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80'
                    }}>
                    <TouchableOpacity onPress={handleSubmit} style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center', borderRadius: 1000 }}>
                        <Text category="h1" style={{ color: Constants.colors.white }}>Edit</Text>
                    </TouchableOpacity>
                </ImageBackground>

            </View>
        </View>
        <View style={styles.inputContainer}>
            <Input textStyle={styles.inputText}
                style={styles.input}
                disabled={true}
                label={() => <Text style={styles.label}>Username</Text>}
                value={userName} onChangeText={(text) => setUserName(text)} />
            <Input textStyle={styles.inputText}
                disabled={true}
                style={styles.input}
                label={() => <Text style={styles.label}>Email</Text>}
                value={email} onChangeText={(text) => setEmail(text)} />
            <Input textStyle={styles.inputText}
                style={styles.input}
                multiline={true}
                label={() => <Text style={styles.label}>WalletAddress</Text>}
                value={address} onChangeText={(text) => setAddress(text)}
                numberOfLines={3}
                maxLength={42} />
        </View>
    </ScrollView>
}
const styles = StyleSheet.create({
    container: { flexGrow: 1 },
    headerContainer: {
        justifyContent: 'flex-end'
    },
    oval: {
        height: Constants.screenSize.height / 1.8,
        width: Constants.screenSize.height / 1.8,
        resizeMode: "contain",
        position: 'absolute',
        marginTop: 20,
        right: -Constants.screenSize.width / 3
    },
    headerLeft: {
        marginLeft: -20,
        paddingTop: Constants.screenSize.height * 0.14
    },
    imageContainer: {
        height: Constants.screenSize.width / 1.6, width: Constants.screenSize.width / 1.6,
    },
    inputContainer: {
        paddingHorizontal: Constants.screenSize.width * 0.12,
        justifyContent: 'flex-end',
        marginTop: 20
    },
    label: {
        fontSize: 13,
        marginBottom: 10
    },
    input: {
        backgroundColor: Constants.colors.white,
        borderColor: '#0000000D',
        marginBottom: 20
    },
    inputText: {
        paddingVertical: 2
    }
})