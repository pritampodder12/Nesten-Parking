import { showMessage } from 'react-native-flash-message';
import { SET_PLACEPODCOLLECTION, SHOW_LOADER, HIDE_LOADER, LOGOUT, SET_REGISTEREDPLACEPODS, SET_EARNINGS, SET_CANCLEBOOKINGS, SET_ONGOINGBOOKINGS, SET_UPCOMINGBOOKINGS, SET_PASTBOOKINGS } from './actionTypes';
import { Help } from '../../utils/Help';
import apiClient from '../../services/apiClient';

export const fetchNearbyPlacepods = (lat, long) => (dispatch, getState) => {
    let featureArray = getState().placepodReducer.placepodCollection.features;
    // dispatch({ type: SHOW_LOADER });
    apiClient.getRequest(`parking/location/${lat}/${long}`).then(res => {
        let array = [...featureArray, ...Help.createFeatureArray(res.data)];
        //removeing duplicates
        array = array.filter((placepod, index, self) =>
            index === self.findIndex((p) => (
                p.id === placepod.id
            )));
        dispatch({ type: SET_PLACEPODCOLLECTION, payload: array });
        // dispatch({ type: HIDE_LOADER });
    }).catch(err => {
        console.log(err)
        showMessage({
            type: 'danger',
            message: 'Failed to load Placepod Data!'
        });
        // dispatch({ type: HIDE_LOADER });
    })
}
export const updatePlacepods = () => (dispatch, getState) => {
    let featureArray = getState().placepodReducer.placepodCollection.features;
    apiClient.postRequest('parking/status', {
        device_ids: JSON.stringify(featureArray.map(item => item.id))
    }).then(res => {
        dispatch({ type: SET_PLACEPODCOLLECTION, payload: Help.createFeatureArray(res.data) });
    }).catch(err => {
        // showMessage({
        //     type: 'danger',
        //     message: 'Failed to update Placepod Data!'
        // })
    })
}
export const startBooking = (reservation_id) => (dispatch, getState) => {
    dispatch({ type: SHOW_LOADER });
    apiClient.postRequest('reservation/start', { reservation_id }).then(res => {
        // dispatch(resetBookingsData());
        // dispatch(getOngoingBookings());
        let ongoing = getState().placepodReducer.ongoingBookings;
        let data = ongoing.data;
        data = data.map(item =>
            item.reservation_id == reservation_id ? { ...item, status: "started" } : item
        );
        dispatch({type: SET_ONGOINGBOOKINGS, payload: {...ongoing, data: data}})
        showMessage({
            type: 'success',
            message: res.message
        });
        dispatch({ type: HIDE_LOADER });
    }).catch(err => {
        if (err.response && err.response.status == 400) showMessage({
            type: 'danger',
            message: err.response.data.message
        });
        else showMessage({
            type: 'danger',
            message: 'Unable to start. Try again later!'
        });
        dispatch({ type: HIDE_LOADER });
    })
}
export const cancleBooking = (reservation_id, type) => (dispatch, getState) => {
    dispatch({ type: SHOW_LOADER });
    apiClient.postRequest('reservation/end', { reservation_id }).then(res => {
        showMessage({
            type: 'success',
            message: res.message
        });
        // dispatch(resetBookingsData());
        const bk = type == "upcoming" ? getState().placepodReducer.upcomingBookings : getState().placepodReducer.ongoingBookings;
        const filteredBk = bk.data.filter(item => item.reservation_id !== reservation_id);
        type == "upcoming" ?
            dispatch({ type: SET_UPCOMINGBOOKINGS, payload: { ...bk, data: filteredBk } }) :
            dispatch({ type: SET_ONGOINGBOOKINGS, payload: { ...bk, data: filteredBk } });

        dispatch({
            type: SET_EARNINGS, payload: { data: [], total: '', endReached: false, slice: 0 }
        })
        // dispatch(getCancleBookings());
        // dispatch(getPastBookings());
        // dispatch(getOngoingBookings());
        // dispatch(getUpcomingBookings());
        dispatch(getEarnings());
        dispatch({ type: HIDE_LOADER });
    }).catch(err => {
        if (err.response && err.response.status == 400) showMessage({
            type: 'danger',
            message: err.response.data.message
        })
        else showMessage({
            type: 'danger',
            message: 'Unable to end reservation! Try again later'
        });
        dispatch({ type: HIDE_LOADER });
    })
}
export const registerPlacepod = (body) => (dispatch, getState) => {
    dispatch({ type: SHOW_LOADER });
    apiClient.postRequest('parking/registration', body).then(res => {
        let currentLocation = getState().locationReducer.currentLocation;
        dispatch({
            type: SET_REGISTEREDPLACEPODS, payload: {
                data: [],
                endReached: false,
                slice: 0
            }
        });
        dispatch(getRegisteredPlacepods());
        dispatch(fetchNearbyPlacepods(currentLocation.latitude, currentLocation.longitude));
        showMessage({
            type: 'success',
            message: res.message
        });
        dispatch({ type: HIDE_LOADER });

    }).catch(err => {
        if (err.response && (err.response.status == 404 || err.response.status == 400))
            showMessage({
                type: "danger",
                message: err.response.data.message
            });
        else if (err.response && err.response.status == 412) {
            showMessage({ message: "Session expired! Log In to continue." });
            dispatch({ type: LOGOUT });
        }
        else
            showMessage({
                type: "danger",
                message: "Unable to register! Try again later"
            })
        dispatch({ type: HIDE_LOADER });
    })
}
export const reservationIsAvailable = (body) => (dispatch) => {
    return new Promise((resolve, reject) => {
        apiClient.postRequest('reservation/check', body).then(res => {
            resolve(true);
        }).catch(err => {
            resolve(false);
        })
    })
}
export const deleteEscrow = (id) => (dispatch) => {
    apiClient.postRequest(`parking/delete_escrow/${id}`).then()
        .catch(err => console.log('Error while deleting escrow ', err.response))
}
export const checkPaymentAndReservePlacepod = (paymentData, reservationData) => (dispatch) => {
    return new Promise((resolve, reject) => {
        apiClient.postRequest('payment', paymentData).then(paymentRes => {
            apiClient.postRequest('reservation/new', reservationData)
                .then(reservationRes => {
                    dispatch({
                        type: SET_UPCOMINGBOOKINGS, payload: {
                            data: [], endReached: false, slice: 0
                        }
                    });
                    dispatch({
                        type: SET_ONGOINGBOOKINGS, payload: {
                            data: [], endReached: false, slice: 0
                        }
                    });
                    dispatch(getUpcomingBookings());
                    dispatch(getOngoingBookings());
                    resolve(true)
                })
                .catch(rErr => {
                    console.log('Reservation Error', rErr.response);
                    resolve(false)
                })
        }).catch(pErr => resolve(false));
    })
}
export const getRegisteredPlacepods = () => (dispatch, getState) => {
    let placepods = getState().placepodReducer.registeredPlacepods;
    apiClient.getRequest(`user/placepods/${placepods.slice}/${10}`).then(res => {
        if (res.data.length) {
            dispatch({
                type: SET_REGISTEREDPLACEPODS, payload: {
                    ...placepods,
                    data: [...placepods.data, ...res.data],
                    slice: placepods.slice + 1
                }
            });
        }
        else if (res && !res.data.length) dispatch({ type: SET_REGISTEREDPLACEPODS, payload: { ...placepods, endReached: true } });
    }).catch(error => {
        showMessage({
            message: "Failed to load placepods",
            error: "danger"
        })
    })
}
export const getEarnings = () => (dispatch, getState) => {
    let earnings = getState().placepodReducer.earnings;
    apiClient.getRequest(`earnings/my/${earnings.slice}/${10}`).then(res => {
        if (res && res.data.length) {
            dispatch({
                type: SET_EARNINGS, payload: {
                    ...earnings,
                    data: [...earnings.data, ...res.data],
                    total: res.totalearnings / 1e+18,
                    slice: earnings.slice + 1
                }
            });
        }
        else if (res && !res.data.length) {
            dispatch({ type: SET_EARNINGS, payload: { ...earnings, endReached: true } });
        }
    }).catch(error => {
        showMessage({
            message: "Failed to load earnings",
            error: "danger"
        })
    });
}
export const getCancleBookings = () => (dispatch, getState) => {
    let cancleBookings = getState().placepodReducer.cancleBookings;
    apiClient.getRequest(`reservation/mycanceledbookings/${cancleBookings.slice}/${10}`).then(res => {
        if (res && res.data.length) {
            dispatch({
                type: SET_CANCLEBOOKINGS, payload: {
                    data: [...cancleBookings.data, ...res.data],
                    slice: cancleBookings.slice + 1,
                    endReached: false
                }
            })
        }
        else if (res && !res.data.length) {
            dispatch({
                type: SET_CANCLEBOOKINGS, payload: {
                    ...cancleBookings,
                    endReached: true
                }
            })
        }
    }).catch(err => showMessage({
        message: "Failed to load data",
        type: "danger"
    }))
}
export const getPastBookings = () => (dispatch, getState) => {
    let pastBookings = getState().placepodReducer.pastBookings;
    apiClient.getRequest(`reservation/mypastbookings/${pastBookings.slice}/${10}`).then(res => {
        if (res && res.data.length) {
            dispatch({
                type: SET_PASTBOOKINGS, payload: {
                    data: [...pastBookings.data, ...res.data],
                    slice: pastBookings.slice + 1,
                    endReached: false
                }
            })
        }
        else if (res && !res.data.length) {
            dispatch({
                type: SET_PASTBOOKINGS, payload: {
                    ...pastBookings,
                    endReached: true
                }
            })
        }
    }).catch(err => showMessage({
        message: "Failed to load data",
        type: "danger"
    }))
}
export const getUpcomingBookings = () => (dispatch, getState) => {
    let upcomingBookings = getState().placepodReducer.upcomingBookings;
    apiClient.getRequest(`reservation/myupcomingbookings/${upcomingBookings.slice}/${10}`).then(res => {
        if (res && res.data.length) {
            dispatch({
                type: SET_UPCOMINGBOOKINGS, payload: {
                    data: [...upcomingBookings.data, ...res.data],
                    slice: upcomingBookings.slice + 1,
                    endReached: false
                }
            })
        }
        else if (res && !res.data.length) {
            dispatch({
                type: SET_UPCOMINGBOOKINGS, payload: {
                    ...upcomingBookings,
                    endReached: true
                }
            })
        }
    }).catch(err => showMessage({
        message: "Failed to load data",
        type: "danger"
    }))
}
export const getOngoingBookings = () => (dispatch, getState) => {
    let ongoingBookings = getState().placepodReducer.ongoingBookings;
    apiClient.getRequest(`reservation/myongoingbookings/${ongoingBookings.slice}/${10}`).then(res => {
        if (res && res.data.length) {
            dispatch({
                type: SET_ONGOINGBOOKINGS, payload: {
                    data: [...ongoingBookings.data, ...res.data],
                    slice: ongoingBookings.slice + 1,
                    endReached: false
                }
            })
        }
        else if (res && !res.data.length) {
            dispatch({
                type: SET_ONGOINGBOOKINGS, payload: {
                    ...ongoingBookings,
                    endReached: true
                }
            })
        }
    }).catch(err => showMessage({
        message: "Failed to load data",
        type: "danger"
    }))
}
export const resetBookingsData = () => (dispatch, getState) => {
    dispatch({
        type: SET_UPCOMINGBOOKINGS, payload: {
            data: [], endReached: false, slice: 0
        }
    });
    dispatch({
        type: SET_PASTBOOKINGS, payload: {
            data: [], endReached: false, slice: 0
        }
    });
    dispatch({
        type: SET_ONGOINGBOOKINGS, payload: {
            data: [], endReached: false, slice: 0
        }
    });
    dispatch({
        type: SET_CANCLEBOOKINGS, payload: {
            data: [], endReached: false, slice: 0
        }
    })
}