import * as types from '../../services/constants/user-info';
import { userInfo, initialState } from './user-info';

const userDataTest = {
    success: true,
    accessToken: 'Bearer eyJ',
    refreshToken: '91ea27',
    user: {
      email: 'test@ya.ru',
      name: 'Тесть'
    }
}

describe('userInfo reducer', () => {
    it('should return the initinal state', () => {
        expect(
            userInfo(undefined, {} as any)
        ).toEqual(initialState)
    });

    it('should handle REGISTER_USER_REQUEST', () => {
        expect(
            userInfo(initialState, {
                type: types.REGISTER_USER_REQUEST,
            })
        ).toEqual({...initialState, registerUserRequest: true});
    });

    it('should handle REGISTER_USER_SUCCESS', () => {
        expect(
            userInfo(initialState, {
                type: types.REGISTER_USER_SUCCESS,
                payload: userDataTest
            })
        ).toEqual({...initialState, registerUserSuccess: true, loggedIn: true, userData: userDataTest});
    });

    it('should handle REGISTER_USER_ERROR', () => {
        expect(
            userInfo(initialState, {
                type: types.REGISTER_USER_ERROR,
            })
        ).toEqual({...initialState, registerUserError: true});
    });

    it('should handle AUTH_USER_REQUEST', () => {
        expect(
            userInfo(initialState, {
                type: types.AUTH_USER_REQUEST,
            })
        ).toEqual({...initialState, authUserRequest: true});
    });

    it('should handle AUTH_USER_SUCCESS', () => {
        expect(
            userInfo(initialState, {
                type: types.AUTH_USER_SUCCESS,
                payload: userDataTest
            })
        ).toEqual({...initialState, authUserSuccess: true, loggedIn: true, userData: userDataTest});
    });

    it('should handle AUTH_USER_ERROR', () => {
        expect(
            userInfo(initialState, {
                type: types.AUTH_USER_ERROR,
                payload: {
                    success: true,
                    message: ''
                }
            })
        ).toEqual({...initialState, authUserError: true, authUser: {success: true, message: ''}});
    });

    it('should handle PASSWORD_RESET_REQUEST', () => {
        expect(
            userInfo(initialState, {
                type: types.PASSWORD_RESET_REQUEST,
            })
        ).toEqual({...initialState, passwordResetRequest: true});
    });

    it('should handle PASSWORD_RESET_SUCCESS', () => {
        expect(
            userInfo(initialState, {
                type: types.PASSWORD_RESET_SUCCESS,
                payload: {
                    success: false,
                    message: "",
                }
            })
        ).toEqual({...initialState, passwordResetSuccess: true, passwordReset: {success: false, message: ""}});
    });

    it('should handle PASSWORD_RESET_ERROR', () => {
        expect(
            userInfo(initialState, {
                type: types.PASSWORD_RESET_ERROR,
            })
        ).toEqual({...initialState, passwordResetError: true, passwordReset: {success: false, message: "Ошибка сброса пароля"}});
    });

    it('should handle SET_NEW_PASSWORD_REQUEST', () => {
        expect(
            userInfo(initialState, {
                type: types.SET_NEW_PASSWORD_REQUEST,
            })
        ).toEqual({...initialState, setNewPasswordRequest: true});
    });

    it('should handle SET_NEW_PASSWORD_SUCCESS', () => {
        expect(
            userInfo(initialState, {
                type: types.SET_NEW_PASSWORD_SUCCESS,
                payload: {
                    success: true,
                    message: "",
                },
            })
        ).toEqual({...initialState, setNewPasswordSuccess: true, setNewPassword: {success: true, message: ""}});
    });

    it('should handle SET_NEW_PASSWORD_ERROR', () => {
        expect(
            userInfo(initialState, {
                type: types.SET_NEW_PASSWORD_ERROR,
            })
        ).toEqual({...initialState, setNewPasswordError: true, setNewPassword: {success: false, message: "Ошибка установки пароля"}});
    });

    it('should handle REFRESH_TOKEN_REQUEST', () => {
        expect(
            userInfo(initialState, {
                type: types.REFRESH_TOKEN_REQUEST,
            })
        ).toEqual({...initialState, refreshTokenRequest: true});
    });

    it('should handle REFRESH_TOKEN_SUCCESS', () => {
        expect(
            userInfo(initialState, {
                type: types.REFRESH_TOKEN_SUCCESS,
                payload: userDataTest,
            })
        ).toEqual({...initialState, refreshTokenSuccess: true, userData: userDataTest});
    });

    it('should handle REFRESH_TOKEN_ERROR', () => {
        expect(
            userInfo(initialState, {
                type: types.REFRESH_TOKEN_ERROR,
            })
        ).toEqual({...initialState, refreshTokenError: true});
    });

    it('should handle GET_USER_REQUEST', () => {
        expect(
            userInfo(initialState, {
                type: types.GET_USER_REQUEST,
            })
        ).toEqual({...initialState, getUserRequest: true});
    });

    it('should handle GET_USER_SUCCESS', () => {
        expect(
            userInfo(initialState, {
                type: types.GET_USER_SUCCESS,
                payload: userDataTest,
            })
        ).toEqual({...initialState, getUserSuccess: true, loggedIn: true, userData: userDataTest});
    });

    it('should handle GET_USER_ERROR', () => {
        expect(
            userInfo(initialState, {
                type: types.GET_USER_ERROR,
            })
        ).toEqual({...initialState, getUserError: true});
    });

    it('should handle EDIT_USER_REQUEST', () => {
        expect(
            userInfo(initialState, {
                type: types.EDIT_USER_REQUEST,
            })
        ).toEqual({...initialState, editUserRequest: true});
    });

    it('should handle EDIT_USER_SUCCESS', () => {
        expect(
            userInfo(initialState, {
                type: types.EDIT_USER_SUCCESS,
                payload: userDataTest,
            })
        ).toEqual({...initialState, editUserSuccess: true, userData: userDataTest});
    });

    it('should handle EDIT_USER_ERROR', () => {
        expect(
            userInfo(initialState, {
                type: types.EDIT_USER_ERROR,
            })
        ).toEqual({...initialState, editUserError: true});
    });

    it('should handle LOGOUT_USER_REQUEST', () => {
        expect(
            userInfo(initialState, {
                type: types.LOGOUT_USER_REQUEST,
            })
        ).toEqual({...initialState, logoutUserRequest: true});
    });

    it('should handle LOGOUT_USER_SUCCESS', () => {
        expect(
            userInfo(initialState, {
                type: types.LOGOUT_USER_SUCCESS,
                payload: {success: true, message: ""},
            })
        ).toEqual({...initialState, logoutUserSuccess: true, logoutUser: {success: true, message: ""}});
    });

    it('should handle LOGOUT_USER_ERROR', () => {
        expect(
            userInfo(initialState, {
                type: types.LOGOUT_USER_ERROR,
            })
        ).toEqual({...initialState, logoutUserError: true});
    });

});