import {
    getRegisterUserData,
    getAuthUserData,
    getPasswordReset,
    setNewPassword,
    getNewToken,
    getUserData,
    editUserData,
    logoutUserData,
} from "../api-service";
import { setCookie, deleteCookie } from "../../utils/cookie";

export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_ERROR = 'REGISTER_USER_ERROR';

export function registerUser(userData) {
    return function(dispatch) {
        dispatch({type: REGISTER_USER_REQUEST});
        getRegisterUserData(userData).then(res => {
            if (res && res.success) {
                dispatch({
                    type: REGISTER_USER_SUCCESS,
                    payload: res
                })
               localStorage.setItem('refreshToken', res.refreshToken);
               setCookie('accessToken', res.accessToken, { expires: 1200 });
            } else {
                dispatch({type: REGISTER_USER_ERROR});
            }
        })
    }
}

export const AUTH_USER_REQUEST = 'AUTH_USER_REQUEST';
export const AUTH_USER_SUCCESS = 'AUTH_USER_SUCCESS';
export const AUTH_USER_ERROR = 'AUTH_USER_ERROR';

export function authUser(userData) {
    return function(dispatch) {
        dispatch({type: AUTH_USER_REQUEST});
        getAuthUserData(userData).then(res => {
            if (res && res.success) {
                localStorage.setItem('refreshToken', res.refreshToken);
                setCookie('accessToken', res.accessToken, { expires: 1200 });
                dispatch({
                    type: AUTH_USER_SUCCESS,
                    payload: res
                })            
            } else {
                dispatch({
                    type: AUTH_USER_ERROR,
                    payload: res
                });
            }
        })
    }
}

export const PASSWORD_RESET_REQUEST = 'PASSWORD_RESET_REQUEST';
export const PASSWORD_RESET_SUCCESS = 'PASSWORD_RESET_SUCCESS';
export const PASSWORD_RESET_ERROR = 'PASSWORD_RESET_ERROR';

export function passwordReset(email) {
    return function(dispatch) {
        dispatch({type: PASSWORD_RESET_REQUEST});
        getPasswordReset(email).then(res => {
            if (res && res.success) {
                dispatch({
                    type: PASSWORD_RESET_SUCCESS,
                    payload: res
                })
            } else {
                dispatch({type: PASSWORD_RESET_ERROR});
            }
        })
    }
}

export const SET_NEW_PASSWORD_REQUEST = 'SET_NEW_PASSWORD_REQUEST';
export const SET_NEW_PASSWORD_SUCCESS = 'SET_NEW_PASSWORD_SUCCESS';
export const SET_NEW_PASSWORD_ERROR = 'SET_NEW_PASSWORD_ERROR';

export function newPassword(userData) {
    return function(dispatch) {
        dispatch({type: SET_NEW_PASSWORD_REQUEST});
        setNewPassword(userData).then(res => {
            if (res && res.success) {
                dispatch({
                    type: SET_NEW_PASSWORD_SUCCESS,
                    payload: res
                })
            } else {
                dispatch({type: SET_NEW_PASSWORD_ERROR});
            }
        })
    }
}

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_ERROR = 'GET_USER_ERROR';

export const getUser = () => (dispatch) => {
    dispatch({type: GET_USER_REQUEST});
    getUserData()
    .then(res => {
        if (res) {
            if (!res.success) throw res;
            dispatch({
                type: GET_USER_SUCCESS,
                payload: res
            })
        } else {
            dispatch({type: GET_USER_ERROR});
        }
    })
    .catch((res) => {
        if (res.message === "jwt expired") {
            dispatch(refreshToken(getUser()))
        }
    })
}

export const REFRESH_TOKEN_REQUEST = 'REFRESH_TOKEN_REQUEST';
export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_ERROR = 'REFRESH_TOKEN_ERROR';

export const refreshToken = (afterRefresh) => (dispatch) => {
    dispatch({type: REFRESH_TOKEN_REQUEST});
    getNewToken().then(res => {
        if (res && res.success) {
            dispatch({
                type: REFRESH_TOKEN_SUCCESS,
                payload: res
            })
            setCookie('accessToken', res.accessToken, { expires: 31536000 });
            localStorage.setItem('refreshToken', res.refreshToken);
            if (afterRefresh) dispatch(afterRefresh);
        } else {
            dispatch({type: REFRESH_TOKEN_ERROR});
        }
    })
}

export const EDIT_USER_REQUEST = 'EDIT_USER_REQUEST';
export const EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS';
export const EDIT_USER_ERROR = 'EDIT_USER_ERROR';

export function editUser(userData) {
  return async function(dispatch) {
    dispatch({type: EDIT_USER_REQUEST});
    editUserData(userData).then(res => {
        if (res && res.success) {
            dispatch({
                type: EDIT_USER_SUCCESS,
                payload: res
            });
        } else {
            dispatch({type: EDIT_USER_ERROR});
        }
    })
  }
}

export const LOGOUT_USER_REQUEST = 'LOGOUT_USER_REQUEST';
export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS';
export const LOGOUT_USER_ERROR = 'LOGOUT_USER_ERROR';

export function logoutUser() {
    return async function(dispatch) {
        dispatch({type: LOGOUT_USER_REQUEST});
        logoutUserData().then(res => {
            if (res && res.success) {
                dispatch({
                    type: LOGOUT_USER_SUCCESS,
                    payload: res
                });
                deleteCookie('accessToken');
                localStorage.removeItem('refreshToken');
            } else {
                dispatch({type: LOGOUT_USER_ERROR});
            }
        })
    }
}
