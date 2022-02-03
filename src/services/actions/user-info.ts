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
import {
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_ERROR,
    AUTH_USER_REQUEST,
    AUTH_USER_SUCCESS,
    AUTH_USER_ERROR,
    PASSWORD_RESET_REQUEST,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_ERROR,
    SET_NEW_PASSWORD_REQUEST,
    SET_NEW_PASSWORD_SUCCESS,
    SET_NEW_PASSWORD_ERROR,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_ERROR,
    REFRESH_TOKEN_REQUEST,
    REFRESH_TOKEN_SUCCESS,
    REFRESH_TOKEN_ERROR,
    EDIT_USER_REQUEST,
    EDIT_USER_SUCCESS,
    EDIT_USER_ERROR,
    LOGOUT_USER_REQUEST,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_ERROR
} from "../constants/user-info";
import { IAuthUser, INewPasswordRequest, ISuccessMessageResponse, IUser, IUserData, TApplicationDispatch, TAppThunk } from "../../utils/types";

export interface IRegisterUserRequest {
    readonly type: typeof REGISTER_USER_REQUEST;
}

export interface IRegisterUserSuccess {
    readonly type: typeof REGISTER_USER_SUCCESS;
    readonly payload: IUserData;
}

export interface IRegisterUserError {
    readonly type: typeof REGISTER_USER_ERROR;
}

export interface IAuthUserRequest {
    readonly type: typeof AUTH_USER_REQUEST;
}

export interface IAuthUserSuccess {
    readonly type: typeof AUTH_USER_SUCCESS;
    readonly payload: IUserData;
}

export interface IAuthUserError {
    readonly type: typeof AUTH_USER_ERROR;
    readonly payload: ISuccessMessageResponse;
}

export interface IPasswordResetRequest {
    readonly type: typeof PASSWORD_RESET_REQUEST;
}

export interface IPasswordResetSuccess {
    readonly type: typeof PASSWORD_RESET_SUCCESS;
    readonly payload: ISuccessMessageResponse;
}

export interface IPasswordResetError {
    readonly type: typeof PASSWORD_RESET_ERROR;
}

export interface ISetNewPasswordRequest {
    readonly type: typeof SET_NEW_PASSWORD_REQUEST;
}

export interface ISetNewPasswordSuccess {
    readonly type: typeof SET_NEW_PASSWORD_SUCCESS;
    readonly payload: ISuccessMessageResponse;
}

export interface ISetNewPasswordError {
    readonly type: typeof SET_NEW_PASSWORD_ERROR;
}

export interface IGetUserRequest {
    readonly type: typeof GET_USER_REQUEST;
}

export interface IGetUserSuccess {
    readonly type: typeof GET_USER_SUCCESS;
    readonly payload: IUserData;
}

export interface IGetUserError {
    readonly type: typeof GET_USER_ERROR;
}

export interface IRefreshTokenRequest {
    readonly type: typeof REFRESH_TOKEN_REQUEST;
}

export interface IRefreshTokenSuccess {
    readonly type: typeof REFRESH_TOKEN_SUCCESS;
    readonly payload: IUserData;
}

export interface IRefreshTokenError {
    readonly type: typeof REFRESH_TOKEN_ERROR;
}

export interface IEditUserRequest {
    readonly type: typeof EDIT_USER_REQUEST;
}

export interface IEditUserSuccess {
    readonly type: typeof EDIT_USER_SUCCESS;
    readonly payload: IUserData;
}

export interface IEditUserError {
    readonly type: typeof EDIT_USER_ERROR;
}

export interface ILogoutUserRequest {
    readonly type: typeof LOGOUT_USER_REQUEST;
}

export interface ILogoutUserSuccess {
    readonly type: typeof LOGOUT_USER_SUCCESS;
    readonly payload: ISuccessMessageResponse;
}

export interface ILogoutUserError {
    readonly type: typeof LOGOUT_USER_ERROR;
}

export type TUserInfoActions = 
    | IRegisterUserRequest
    | IRegisterUserSuccess
    | IRegisterUserError
    | IAuthUserRequest
    | IAuthUserSuccess
    | IAuthUserError
    | IPasswordResetRequest
    | IPasswordResetSuccess
    | IPasswordResetError
    | ISetNewPasswordRequest
    | ISetNewPasswordSuccess
    | ISetNewPasswordError
    | IGetUserRequest
    | IGetUserSuccess
    | IGetUserError
    | IRefreshTokenRequest
    | IRefreshTokenSuccess
    | IRefreshTokenError
    | IEditUserRequest
    | IEditUserSuccess
    | IEditUserError
    | ILogoutUserRequest
    | ILogoutUserSuccess
    | ILogoutUserError;

export function registerUser(userData: IUser) {
    return function(dispatch: TApplicationDispatch) {
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

export function authUser(userData: IAuthUser) {
    return function(dispatch: TApplicationDispatch) {
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

export function passwordReset(email: string) {
    return function(dispatch: TApplicationDispatch) {
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

export function newPassword(userData: INewPasswordRequest) {
    return function(dispatch: TApplicationDispatch) {
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

export const getUser: TAppThunk = () => (dispatch) => {
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

export const refreshToken: TAppThunk = (afterRefresh) => (dispatch: TApplicationDispatch) => {
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

export function editUser(userData: IUser) {
  return async function(dispatch: TApplicationDispatch) {
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

export function logoutUser() {
    return async function(dispatch: TApplicationDispatch) {
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
