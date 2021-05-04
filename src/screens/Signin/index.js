import React, { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, ScrollView, View } from 'react-native';
import { Text } from '@ui-kitten/components';
import { useDispatch, useSelector } from 'react-redux';
import { showMessage } from 'react-native-flash-message';

import { Constants } from '../../utils/Constants';
import { logIn, showSnackbar } from '../../redux/actions';
import PrimaryButton from '../../utils/components/PrimaryButton';
import AuthInput from '../../utils/components/AuthInput';
import SizedBox from '../../utils/components/SizedBox';
import LinkButton from '../../utils/components/LinkButton';
import { globalStyles } from '../../utils/globalStyles';
import AuthDivider from '../../utils/components/AuthDivider';

function SigninScreen(props) {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const isLoading = useSelector(state => state.authReducer.isLoading);
    const dispatch = useDispatch();

    const handlePress = () => {
        Keyboard.dismiss();
        if (!userName || !password)
            return showMessage({ type: "danger", message: "All fields are require!" })
        dispatch(logIn({ userName, password }));
    }
    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            <ScrollView contentContainerStyle={globalStyles.authContainer} keyboardShouldPersistTaps="handled">
                <LinkButton title="Register" onPress={() => props.navigation.navigate(Constants.routeNames.registration)} style={globalStyles.authLinkButton} disabled={isLoading} />
                <Text category="h2" style={globalStyles.authHeader}>Sign in.</Text>
                <View style={{ marginVertical: Constants.screenSize.height * 0.05, justifyContent: 'space-evenly', height: Constants.screenSize.height * 0.4 }}>
                    <AuthInput onChangeText={(text) => setUserName(text)} value={userName} type="text" label="USERNAME" />
                    <AuthInput onChangeText={(text) => setPassword(text)} value={password} type="password" label="PASSWORD" secureTextEntry />
                    <LinkButton title="Forgot Password?" onPress={() => { props.navigation.navigate(Constants.routeNames.forgot) }} disabled={isLoading} />
                </View>
                <AuthDivider width="65%" />
                <SizedBox height={Constants.screenSize.height * 0.03} />
                <PrimaryButton title={isLoading ? "Signing in..." : "Sign in"} size="giant" status="primary" disabled={isLoading} onPress={handlePress} />
            </ScrollView>
        </KeyboardAvoidingView>
    )
}
export default SigninScreen;