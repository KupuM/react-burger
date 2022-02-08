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
    REFRESH_TOKEN_REQUEST,
    REFRESH_TOKEN_SUCCESS,
    REFRESH_TOKEN_ERROR,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_ERROR,
    EDIT_USER_REQUEST,
    EDIT_USER_SUCCESS,
    EDIT_USER_ERROR,
    LOGOUT_USER_REQUEST,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_ERROR,
} from "../constants/user-info";
import { TUserInfoActions } from "../actions/user-info";
import { ISuccessMessageResponse, IUserData } from "../../utils/types";

interface IUserInfoState  {
    registerUserRequest: boolean;
    registerUserSuccess: boolean;
    registerUserError: boolean;
    userData: IUserData;
    authUserRequest: boolean;
    authUserSuccess: boolean;
    authUserError: boolean;
    authUser: ISuccessMessageResponse;
    passwordResetRequest: boolean;
    passwordResetSuccess: boolean;
    passwordResetError: boolean;
    passwordReset: ISuccessMessageResponse;
    setNewPasswordRequest: boolean,
    setNewPasswordSuccess: boolean,
    setNewPasswordError: boolean,
    setNewPassword: ISuccessMessageResponse;
    refreshTokenRequest: boolean;
    refreshTokenSuccess: boolean;
    refreshTokenError: boolean;
    logoutUserRequest: boolean;
    logoutUserSuccess: boolean;
    logoutUserError: boolean;
    logoutUser: ISuccessMessageResponse;
    loggedIn: boolean;
    getUserRequest: boolean;
    getUserSuccess: boolean;
    getUserError: boolean;
    editUserRequest: boolean;
    editUserSuccess: boolean;
    editUserError: boolean;
};

const initialState: IUserInfoState = {
    registerUserRequest: false,
    registerUserSuccess: false,
    registerUserError: false,
    userData: {
        success: false,
        user: {
            email: "",
            name: "",
        },
    },
    authUserRequest: false,
    authUserSuccess: false,
    authUserError: false,
    authUser: {
        success: false,
        message: "",
    },
    passwordResetRequest: false,
    passwordResetSuccess: false,
    passwordResetError: false,
    passwordReset: {
        success: false,
        message: "",
    },
    setNewPasswordRequest: false,
    setNewPasswordSuccess: false,
    setNewPasswordError: false,
    setNewPassword: {
        success: false,
        message: "",
    },
    refreshTokenRequest: false,
    refreshTokenSuccess: false,
    refreshTokenError: false,
    logoutUserRequest: false,
    logoutUserSuccess: false,
    logoutUserError: false,
    logoutUser: {
        success: false,
        message: "",
    },
    loggedIn: false,
    getUserRequest: false,
    getUserSuccess: false,
    getUserError: false,
    editUserRequest: false,
    editUserSuccess: false,
    editUserError: false,
};

export const userInfo = (state = initialState, action: TUserInfoActions) => {
    switch (action.type) {
        case REGISTER_USER_REQUEST:
            return {
                ...state,
                registerUserRequest: true,
                registerUserSuccess: false,
                registerUserError: false,
                userData: initialState.userData,
            };
        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                registerUserRequest: false,
                registerUserSuccess: true,
                registerUserError: false,
                userData: action.payload,
                loggedIn: true,
            };
        case REGISTER_USER_ERROR:
            return {
                ...initialState,
                registerUserRequest: false,
                registerUserSuccess: false,
                registerUserError: true,
            };
        case AUTH_USER_REQUEST:
            return {
                ...state,
                authUserRequest: true,
                authUserSuccess: false,
                authUserError: false,
                userData: initialState.userData,
                authUser: initialState.authUser,
            };
        case AUTH_USER_SUCCESS:
            return {
                ...state,
                authUserRequest: false,
                authUserSuccess: true,
                authUserError: false,
                userData: action.payload,
                authUser: initialState.authUser,
                loggedIn: true,
            };
        case AUTH_USER_ERROR:
            return {
                ...initialState,
                authUserRequest: false,
                authUserSuccess: false,
                authUserError: true,
                userData: initialState.userData,
                authUser: action.payload,
            };
        case PASSWORD_RESET_REQUEST:
            return {
                ...state,
                passwordResetRequest: true,
                passwordResetSuccess: false,
                passwordResetError: false,
                passwordReset: initialState.passwordReset,
            };
        case PASSWORD_RESET_SUCCESS:
            return {
                ...state,
                passwordResetRequest: false,
                passwordResetSuccess: true,
                passwordResetError: false,
                passwordReset: action.payload,
            };
        case PASSWORD_RESET_ERROR:
            return {
                ...initialState,
                passwordResetRequest: false,
                passwordResetSuccess: false,
                passwordResetError: true,
                passwordReset: {
                    success: false,
                    message: "Ошибка сброса пароля",
                },
            };
        case SET_NEW_PASSWORD_REQUEST:
            return {
                ...state,
                setNewPasswordRequest: true,
                setNewPasswordSuccess: false,
                setNewPasswordError: false,
                setNewPassword: initialState.setNewPassword,
            };
        case SET_NEW_PASSWORD_SUCCESS:
            return {
                ...state,
                setNewPasswordRequest: false,
                setNewPasswordSuccess: true,
                setNewPasswordError: false,
                setNewPassword: action.payload,
            };
        case SET_NEW_PASSWORD_ERROR:
            return {
                ...initialState,
                setNewPasswordRequest: false,
                setNewPasswordSuccess: false,
                setNewPasswordError: true,
                setNewPassword: {
                    success: false,
                    message: "Ошибка установки пароля",
                },
            };
        case REFRESH_TOKEN_REQUEST:
            return {
                ...state,
                refreshTokenRequest: true,
                refreshTokenSuccess: false,
                refreshTokenError: false,
                userData: {
                    ...state.userData,
                    success: false,
                },
                authUser: initialState.authUser,
            };
        case REFRESH_TOKEN_SUCCESS:
            return {
                ...state,
                refreshTokenRequest: false,
                refreshTokenSuccess: true,
                refreshTokenError: false,
                userData: {
                    ...state.userData,
                    ...action.payload,
                },
                authUser: initialState.authUser,
            };
        case REFRESH_TOKEN_ERROR:
            return {
                ...initialState,
                refreshTokenRequest: false,
                refreshTokenSuccess: false,
                refreshTokenError: true,
                userData: {
                    ...state.userData,
                    success: false,
                },
                authUser: initialState.authUser,
            };
        case GET_USER_REQUEST:
            return {
                ...state,
                getUserRequest: true,
                getUserSuccess: false,
                getUserError: false,
                userData: state.userData,
            };
        case GET_USER_SUCCESS:
            return {
                ...state,
                getUserRequest: false,
                getUserSuccess: true,
                getUserError: false,
                userData: {
                    ...state.userData,
                    ...action.payload,
                },
                loggedIn: true,
            };
        case GET_USER_ERROR:
            return {
                ...state,
                getUserRequest: false,
                getUserSuccess: false,
                getUserError: true,
                userData: {
                    ...state.userData,
                    user: initialState.userData.user
                },
            };
        case EDIT_USER_REQUEST:
            return {
                ...state,
                editUserRequest: true,
                editUserSuccess: false,
                editUserError: false,
                userData: {
                    ...state.userData,
                },
            };
        case EDIT_USER_SUCCESS:
            return {
                ...state,
                editUserRequest: false,
                editUserSuccess: true,
                editUserError: false,
                userData: {
                    ...state.userData,
                    ...action.payload,
                },
            };
        case EDIT_USER_ERROR:
            return {
                ...state,
                editUserRequest: false,
                editUserSuccess: false,
                editUserError: true,
                userData: {
                    ...state.userData,
                    user: initialState.userData.user
                },
            };
        case LOGOUT_USER_REQUEST:
            return {
                ...state,
                logoutUserRequest: true,
                logoutUserSuccess: false,
                logoutUserError: false,
            };
        case LOGOUT_USER_SUCCESS:
            return {
                ...initialState,
                logoutUserRequest: false,
                logoutUserSuccess: true,
                logoutUserError: false,
                logoutUser: action.payload,
            };
        case LOGOUT_USER_ERROR:
            return {
                ...initialState,
                logoutUserRequest: false,
                logoutUserSuccess: false,
                logoutUserError: true,
            };
        default:
            return state;
    }
};
