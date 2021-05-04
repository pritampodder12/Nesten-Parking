import React, { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, ScrollView, View } from 'react-native';
import { Text } from '@ui-kitten/components';
import { useDispatch, useSelector } from 'react-redux';

import { Constants } from '../../utils/Constants';
import { forgotPassword, logIn, showSnackbar } from '../../redux/actions';
import PrimaryButton from '../../utils/components/PrimaryButton';
import AuthInput from '../../utils/components/AuthInput';
import SizedBox from '../../utils/components/SizedBox';
import LinkButton from '../../utils/components/LinkButton';
import { globalStyles } from '../../utils/globalStyles';
import AuthDivider from '../../utils/components/AuthDivider';
import { showMessage } from 'react-native-flash-message';
import { Help } from '../../utils/Help';

function ForgotPasswordScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const isLoading = useSelector(state => state.authReducer.isLoading);
    const dispatch = useDispatch();

    const handlePress = () => {
        Keyboard.dismiss();
        if (!Help.emailIsValid(email))
            return showMessage({ type: "danger", message: "Invalid Email" })
        dispatch(forgotPassword(email, navigation));
    }
    const handleAlreadyCode = () => {
        Keyboard.dismiss();
        if (!Help.emailIsValid(email))
            return showMessage({ type: "danger", message: "Invalid Email" })
        navigation.navigate(Constants.routeNames.confirm, { email });
    }
    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            <ScrollView contentContainerStyle={globalStyles.authContainer} keyboardShouldPersistTaps="handled">
                <LinkButton title="Log in" onPress={() => navigation.navigate(Constants.routeNames.login)} style={globalStyles.authLinkButton} disabled={isLoading} />
                <Text category="h2" style={globalStyles.authHeader}>Forgot password?</Text>
                <View style={{ marginVertical: Constants.screenSize.height * 0.05, justifyContent: 'space-evenly', height: Constants.screenSize.height * 0.2 }}>
                    <AuthInput onChangeText={(text) => setEmail(text)} value={email} type="text" label="EMAIL" />
                </View>
                <AuthDivider width="65%" />
                <SizedBox height={Constants.screenSize.height * 0.03} />
                <PrimaryButton title={isLoading ? "Verifying email..." : "Get Verification Code"} size="giant" status="primary" disabled={isLoading} onPress={handlePress} />
                <SizedBox height={Constants.screenSize.height * 0.03} />
                <LinkButton title="Already have verification code?" onPress={handleAlreadyCode} />
            </ScrollView>
        </KeyboardAvoidingView>
    )
}
export default ForgotPasswordScreen;