import React, { useState } from 'react';
import { Keyboard, ScrollView, KeyboardAvoidingView, View } from 'react-native';
import { Text } from '@ui-kitten/components';
import { useSelector, useDispatch } from 'react-redux';

import { Constants } from '../../utils/Constants';
import PrimaryButton from '../../utils/components/PrimaryButton';
import AuthInput from '../../utils/components/AuthInput';
import SizedBox from '../../utils/components/SizedBox';
import LinkButton from '../../utils/components/LinkButton';
import { showSnackbar, signUp } from '../../redux/actions';
import { globalStyles } from '../../utils/globalStyles';
import AuthDivider from '../../utils/components/AuthDivider';
import { Help } from '../../utils/Help';

function SignupScreen(props) {
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const isLoading = useSelector(state => state.authReducer.isLoading);
    const dispatch = useDispatch();

    const handlePress = async () => {
        Keyboard.dismiss();
        if (!email || !userName || !password || !address) return dispatch(showSnackbar("All fields are required!", "danger"));
        if (!(/^0x[a-fA-F0-9]{40}$/.test(address))) return dispatch(showSnackbar("Invalid Address", "danger"));
        if (!Help.emailIsValid) return dispatch(showSnackbar("Invalid Email", "danger"));
        if (!Help.passwordIsValid) return dispatch(showSnackbar("Invalid Password", "danger"));
        dispatch(signUp({ email, userName, password, address }, props.navigation));
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            <ScrollView contentContainerStyle={globalStyles.authContainer} keyboardShouldPersistTaps="handled">
                <LinkButton title="Login" onPress={() => props.navigation.navigate(Constants.routeNames.login)} style={globalStyles.authLinkButton} disabled={isLoading} />
                <Text category="h2" style={globalStyles.authHeader}>Sign up.</Text>
                <View style={{ marginVertical: Constants.screenSize.height * 0.05, justifyContent: 'space-evenly', height: Constants.screenSize.height * 0.4 }}>
                    <AuthInput onChangeText onChangeText={(text) => setUserName(text)} value={userName} type="text" label="USERNAME" />
                    <AuthInput onChangeText={(text) => setEmail(text)} value={email} label="EMAIL" />
                    <AuthInput onChangeText={(text) => setAddress(text)} value={address} label="WALLET ADDRESS" />
                    <AuthInput onChangeText={(text) => setPassword(text)} value={password} type="password" label="PASSWORD" secureTextEntry />
                </View>
                <AuthDivider width="65%" />
                <SizedBox height={Constants.screenSize.height * 0.03} />
                <PrimaryButton title={isLoading ? "Signing up..." : "Sign up"} size="giant" status="primary" disabled={isLoading} onPress={handlePress} />
            </ScrollView>
        </KeyboardAvoidingView>
    )
}
export default SignupScreen;