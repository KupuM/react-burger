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

export const getBurgerData = async () => {
    try {
        const res = await fetch(API_URL + INGREDIENTS);
        return await res.json();
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getOrderData = async (ingredients: IIngredientType[]) => {
    try {
        const res = await fetch(API_URL + ORDERS, {
            method: 'POST',
            mode: 'cors',
            //@ts-ignore
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'authorization': getCookie('accessToken')
            },
            body: JSON.stringify({
                ingredients: ingredients,
            })
        });
        return await res.json();
    } catch (error) {
        console.log(error);
        throw error;
    }
};


export const getRegisterUserData = async ({email, password, name}: IUser) => {
    try {
        const res = await fetch(API_URL + REGISTRATION_USER, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                email: email, 
                password: password, 
                name: name,
            })
        });
        return await res.json();
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getAuthUserData = async ({email, password}: {email: string; password: string;}) => {
    try {
        const res = await fetch(API_URL + LOGIN_USER, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                email: email, 
                password: password,
            })
        });
        return await res.json();
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getPasswordReset = async (email: string) => {
    try {
        const res = await fetch(API_URL + PASSWORD_RESET, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                email: email, 
            })
        });
        return await res.json();
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const setNewPassword = async ({password, token}: INewPasswordRequest) => {
    try {
        const res = await fetch(API_URL + SET_NEW_PASSWORD, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                password: password,
                token: token,
            })
        });
        return await res.json();
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getNewToken = async () => {
    try {
        const res = await fetch(API_URL + TOKEN_REFRESH, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                token: localStorage.getItem('refreshToken'),
            })
        });
        return await res.json();
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getUserData = async () => {
    try {
        const res = await fetch(API_URL + AUTH_USER, {
            method: 'GET',
            mode: 'cors',
            //@ts-ignore
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'authorization': getCookie('accessToken')
            }
        });
        return await res.json();
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const editUserData = async (userData: IUser) => {
    try {
        const res = await fetch(API_URL + AUTH_USER, {
            method: 'PATCH',
            mode: 'cors',
            //@ts-ignore
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'authorization': getCookie('accessToken')
            },
            body: JSON.stringify(userData)
        });
        return await res.json();
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const logoutUserData = async () => {
    try {
        const res = await fetch(API_URL + LOGOUT_USER, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                token: localStorage.getItem('refreshToken'),
            })
        })
        return await res.json();
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const postOrderData = async (ingredientsIds: string[]) => {
    try {
        const res = await fetch(API_URL + ORDERS, {
            method: 'POST',
            mode: 'cors',
            //@ts-ignore
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'authorization': getCookie('accessToken')
            },
            body: JSON.stringify({
                ingredients: ingredientsIds,
            })
        });
        return await res.json();
    } catch (error) {
        console.log(error);
        throw error;
    }
};
