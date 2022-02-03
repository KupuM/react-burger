import { Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { TBurgerConstructorActions } from "../services/actions/burger-constructor";
import { TBurgerActions } from "../services/actions/burgers";
import { TIngredientDetailsActions } from "../services/actions/ingredient-details";
import { TOrderDetailsActions } from "../services/actions/order-details";
import { TUserInfoActions } from "../services/actions/user-info";
import { store } from "../services/store";

export type TRootState = ReturnType<typeof store.getState>;

// Типизация всех экшенов приложения
type TApplicationActions = 
    | TBurgerConstructorActions
    | TBurgerActions
    | TIngredientDetailsActions
    | TOrderDetailsActions
    | TUserInfoActions;

// Типизация thunk'ов в нашем приложении
export type TAppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, TRootState, TApplicationActions>
>;

// Типизация метода dispatch для проверки на валидность отправляемого экшена
export type TApplicationDispatch = typeof store.dispatch; 

export interface IIngredientType {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
    counter?: number;
    dragId?: string;
}

export interface IIngredientConstructorType extends IIngredientType {
    dragId: string;
}

export interface IUser {
    email: string,
    password: string,
    name: string,
}

export interface IAuthUser {
    email: string,
    password: string,
}

export interface IUserData {
    success: boolean;
    user: IUser;
}

export interface ILoginRequest {
    accessToken: string;
    refreshToken: string;
    success: boolean;
    user: IAuthUser;
}

export interface INewPasswordRequest {
    password: string; 
    token: string;
}

export interface ISuccessMessageResponse {
    password: string; 
    message?: string;
}

export interface IOrderDetailsData {
    success: boolean, 
    name: string, 
    order: {
        number: string
    }
}

export interface INavbarItem {
    title: string;
    icon: JSX.Element;
    iconActive: JSX.Element;
    link: string;
    isStrictMatch?: boolean;
}

export interface LocationState {
    background?: {
        pathname?: string;
    };
}