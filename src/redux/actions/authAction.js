import apiClient from '../../services/apiClient';
import { SET_USERDETAILS, SET_ISAUTHENTICATED, LOGOUT, LOGIN, SET_ISLOADING } from './actionTypes';
import { showMessage } from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Constants } from '../../utils/Constants';
import AWSEXCEPTIONS from '../../assets/json-files/aws-exceptions.json';

export const setUserdetails = (userdetails) => (dispatch) => {
  dispatch({
    type: SET_USERDETAILS,
    payload: userdetails
  })
}
export const setIsAuthenticated = (value) => (dispatch) => {
  dispatch({
    type: SET_ISAUTHENTICATED,
    payload: value
  })
}
export const logIn = (data) => async (dispatch, getState) => {
  dispatch({ type: SET_ISLOADING, payload: true });
  apiClient.postRequest('user/login', data).then(res => {
    AsyncStorage.setItem("idToken", JSON.stringify(res.idToken));
    AsyncStorage.setItem("refreshToken", JSON.stringify(res.refreshToken));
    dispatch({
      type: LOGIN, payload: {
        userdetails: res.userdetails,
        isAuthenticated: true
      }
    });
    dispatch({ type: SET_ISLOADING, payload: false });
  }).catch(err => {
    dispatch({ type: SET_ISLOADING, payload: false });
    if (err.response && err.response.status == 400 && err.response.data)
      showMessage({ type: "danger", message: `${AWSEXCEPTIONS[err.response.data]}` });
    else if (err.request)
      showMessage({ message: 'Unable to reach the server!', type: 'danger' });
    else
      showMessage({ message: 'Sorry! Something went wrong.', type: 'danger' });
  })
}
export const signUp = (data, navigation) => async (dispatch, getState) => {
  dispatch({ type: SET_ISLOADING, payload: true });
  apiClient.postRequest('user/register', data).then(res => {
    showMessage({
      message: "Success! Please varify email to continue.",
      type: "success"
    });
    navigation.navigate(Constants.routeNames.login);
    dispatch({ type: SET_ISLOADING, payload: false });
  }).catch(err => {
    dispatch({ type: SET_ISLOADING, payload: false });
    if (err.response && err.response.status == 400 && err.response.data)
      showMessage({ type: "danger", message: `${AWSEXCEPTIONS[err.response.data]}` });
    else if (err.request)
      showMessage({ message: 'Unable to reach the server!', type: 'danger' });
    else
      showMessage({ message: 'Sorry! Something went wrong.', type: 'danger' });
  })
}
export const updateProfile = (body, navigation) => (dispatch, getState) => {
  apiClient.postRequest('user/updateDetails', body).then(res => {
    let newDetails = getState().authReducer.userdetails;
    newDetails = { ...newDetails, ...res.userDetails };
    dispatch({
      type: SET_USERDETAILS,
      payload: newDetails
    });
    showMessage({
      message: res.message, type: 'success'
    });
    navigation.goBack();
  }).catch(err => showMessage({
    message: 'Update failed', type: 'danger'
  }))
}
export const logOut = () => (dispatch) => {
  AsyncStorage.multiRemove(['idToken', 'refreshToken']);
  dispatch({ type: LOGOUT });
}
export const setIsLoading = (loading) => (dispatch) => {
  dispatch({ type: SET_ISLOADING, payload: loading });
}
export const forgotPassword = (email, navigation) => (dispatch) => {
  dispatch({ type: SET_ISLOADING, payload: true });
  apiClient.postRequest('user/forgotPass', { userName: email }).then(res => {
    dispatch({ type: SET_ISLOADING, payload: false });
    showMessage({ type: "success", message: "A verification code has been send through EMAIL" });
    navigation.navigate(Constants.routeNames.confirm, { email });
  }).catch(err => {
    dispatch({ type: SET_ISLOADING, payload: false });
    if (err.response && err.response.status == 400 && err.response.data)
      showMessage({ type: "danger", message: `${AWSEXCEPTIONS[err.response.data]}` });
    else if (err.request)
      showMessage({ message: 'Unable to reach the server!', type: 'danger' });
    else
      showMessage({ message: 'Sorry! Something went wrong.', type: 'danger' });
  })
}
export const confirmPasswordVerification = (body, navigation) => (dispatch) => {
  dispatch({ type: SET_ISLOADING, payload: true });
  apiClient.postRequest('user/confirmPassword', body).then(res => {
    dispatch({ type: SET_ISLOADING, payload: false });
    showMessage({ type: "success", message: "Password changed successfully. Log in to continue." });
    navigation.navigate(Constants.routeNames.login);
  }).catch(err => {
    dispatch({ type: SET_ISLOADING, payload: false });
    if (err.response && err.response.status == 400 && err.response.data)
      showMessage({ type: "danger", message: `${AWSEXCEPTIONS[err.response.data]}` });
    else if (err.request)
      showMessage({ message: 'Unable to reach the server!', type: 'danger' });
    else
      showMessage({ message: 'Sorry! Something went wrong.', type: 'danger' });
  })
}