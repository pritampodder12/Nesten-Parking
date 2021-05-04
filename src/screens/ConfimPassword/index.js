import React, { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, ScrollView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Constants } from '../../utils/Constants';
import { confirmPasswordVerification } from '../../redux/actions';
import PrimaryButton from '../../utils/components/PrimaryButton';
import AuthInput from '../../utils/components/AuthInput';
import SizedBox from '../../utils/components/SizedBox';
import LinkButton from '../../utils/components/LinkButton';
import { globalStyles } from '../../utils/globalStyles';
import AuthDivider from '../../utils/components/AuthDivider';
import { showMessage } from 'react-native-flash-message';
import { Help } from '../../utils/Help';

function ConfirmPasswordScreen({ navigation, route }) {
    const [verificationCode, setVerificationCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const isLoading = useSelector(state => state.authReducer.isLoading);
    const dispatch = useDispatch();

    const handleReset = () => {
        Keyboard.dismiss();
        if (!verificationCode || !newPassword || !confirmPassword)
            return showMessage({ type: "danger", message: "All fields are require!" })
        if (!Help.passwordIsValid(newPassword))
            return showMessage({ type: "danger", message: "Your new password doesn't satisfy password policy.\nPlease modify your password." })
        if (confirmPassword != newPassword)
            return showMessage({ type: "danger", message: "Password doesn't match!" });
        dispatch(confirmPasswordVerification({ verificationCode, newPassword, userName: route.params.email }, navigation));
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            <ScrollView contentContainerStyle={globalStyles.authContainer} keyboardShouldPersistTaps="handled">
                <LinkButton title="Log in" onPress={() => navigation.navigate(Constants.routeNames.login)} style={globalStyles.authLinkButton} disabled={isLoading} />
                {/* <Text category="h2" style={globalStyles.authHeader}>Forgot password?</Text> */}
                <View style={{ marginVertical: Constants.screenSize.height * 0.05, justifyContent: 'space-evenly', height: Constants.screenSize.height * 0.4 }}>
                    <AuthInput onChangeText={(text) => setVerificationCode(text)} value={verificationCode} type="text" label="Verification Code" />
                    <AuthInput onChangeText={(text) => setNewPassword(text)} value={newPassword} type="text" label="New Password" secureTextEntry />
                    <AuthInput onChangeText={(text) => setConfirmPassword(text)} value={confirmPassword} type="text" label="Confirm Password" secureTextEntry />
                </View>
                <AuthDivider width="65%" />
                <SizedBox height={Constants.screenSize.height * 0.03} />
                <PrimaryButton title={isLoading ? "Resetting..." : "Reset"} size="giant" status="primary" onPress={handleReset} disabled={isLoading} />
            </ScrollView>
        </KeyboardAvoidingView>
    )
}
export default ConfirmPasswordScreen;