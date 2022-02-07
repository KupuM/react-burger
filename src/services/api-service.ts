import {
    API_URL,
    INGREDIENTS,
    ORDERS,
    REGISTRATION_USER,
    LOGIN_USER,
    PASSWORD_RESET,
    SET_NEW_PASSWORD,
    TOKEN_REFRESH,
    AUTH_USER,
    LOGOUT_USER,
} from "../utils/constants";
import { getCookie } from "../utils/cookie";
import { IIngredientType, INewPasswordRequest, IUser } from "../utils/types";

export const getBurgerData = () => {
    return fetch(API_URL + INGREDIENTS);
};

export const getOrderData = (ingredients: IIngredientType[]) => {
    return fetch(API_URL + ORDERS, {
        method: "POST",
        mode: "cors",
        //@ts-ignore
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            authorization: getCookie("accessToken"),
        },
        body: JSON.stringify({
            ingredients: ingredients,
        }),
    });
};

export const getRegisterUserData = ({ email, password, name }: IUser) => {
    return fetch(API_URL + REGISTRATION_USER, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            email: email,
            password: password,
            name: name,
        }),
    });
};

export const getAuthUserData = ({ email, password }: { email: string; password: string }) => {
    return fetch(API_URL + LOGIN_USER, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    });
};

export const getPasswordReset = (email: string) => {
    return fetch(API_URL + PASSWORD_RESET, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            email: email,
        }),
    });
};

export const setNewPassword = ({ password, token }: INewPasswordRequest) => {
    return fetch(API_URL + SET_NEW_PASSWORD, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            password: password,
            token: token,
        }),
    });
};

export const getNewToken = () => {
    return fetch(API_URL + TOKEN_REFRESH, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            token: localStorage.getItem("refreshToken"),
        }),
    });
};

export const getUserData = () => {
    return fetch(API_URL + AUTH_USER, {
        method: "GET",
        mode: "cors",
        //@ts-ignore
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            authorization: getCookie("accessToken"),
        },
    });
};

export const editUserData = (userData: IUser) => {
    return fetch(API_URL + AUTH_USER, {
        method: "PATCH",
        mode: "cors",
        //@ts-ignore
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            authorization: getCookie("accessToken"),
        },
        body: JSON.stringify(userData),
    });
};

export const logoutUserData = async () => {
    return fetch(API_URL + LOGOUT_USER, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            token: localStorage.getItem("refreshToken"),
        }),
    });
};

export const postOrderData = async (ingredientsIds: string[]) => {
    return fetch(API_URL + ORDERS, {
        method: "POST",
        mode: "cors",
        //@ts-ignore
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            authorization: getCookie("accessToken"),
        },
        body: JSON.stringify({
            ingredients: ingredientsIds,
        }),
    });
};
