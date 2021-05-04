import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SigninScreen from '../screens/Signin';
import SignupScreen from '../screens/Signup';
import ForgotPasswordScreen from '../screens/ForgotPassword';
import ConfirmPasswordScreen from '../screens/ConfimPassword';
import { Constants } from '../utils/Constants';

const Stack = createStackNavigator();

export default function AuthNavigator() {
    return (
        <Stack.Navigator screenOptions={{ cardStyle: { backgroundColor: Constants.colors.white } }} >
            <Stack.Screen name={Constants.routeNames.login} component={SigninScreen} options={{ headerShown: false }} />
            <Stack.Screen name={Constants.routeNames.registration} component={SignupScreen} options={{ headerShown: false }} />
            <Stack.Screen name={Constants.routeNames.forgot} component={ForgotPasswordScreen} options={{ headerShown: false }} />
            <Stack.Screen name={Constants.routeNames.confirm} component={ConfirmPasswordScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}