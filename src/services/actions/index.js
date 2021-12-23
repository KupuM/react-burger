import { getBurgerData, getOrderData } from "../api-service";

export const ADD_BURGER_CONSTRUCTOR_INGREDIENT = 'ADD_BURGER_CONSTRUCTOR_INGREDIENT';
export const DELETE_BURGER_CONSTRUCTOR_INGREDIENT = 'DELETE_BURGER_CONSTRUCTOR_INGREDIENT';
export const UPDATE_BURGER_CONSTRUCTOR_INGREDIENTS_LIST = 'UPDATE_BURGER_CONSTRUCTOR_INGREDIENTS_LIST';


export const ADD_INGREDIENT_DETAILS = 'ADD_INGREDIENT_DETAILS';
export const DELETE_INGREDIENT_DETAILS = 'DELETE_INGREDIENT_DETAILS';

export const UPDATE_ORDER_DETAILS = 'UPDATE_ORDER_DETAILS';

export const GET_BURGER_INGREDIENTS_REQUEST = 'GET_BURGER_INGREDIENTS_REQUEST';
export const GET_BURGER_INGREDIENTS_SUCCESS = 'GET_BURGER_INGREDIENTS_SUCCESS';
export const GET_BURGER_INGREDIENTS_ERROR = 'GET_BURGER_INGREDIENTS_ERROR';
export const BURGER_INGREDIENT_COUNTER_INCREMENT = 'BURGER_INGREDIENT_COUNTER_INCREMENT';
export const BURGER_INGREDIENT_COUNTER_DECREMENT = 'BURGER_INGREDIENT_COUNTER_DECREMENT';

export function getBurgerIngredients() {
    return function(dispatch) {
        dispatch({type: GET_BURGER_INGREDIENTS_REQUEST});
        getBurgerData().then(res => {
            if (res && res.success) {
                dispatch({
                    type: GET_BURGER_INGREDIENTS_SUCCESS,
                    payload: res.data
                })
            } else {
                dispatch({type: GET_BURGER_INGREDIENTS_ERROR})
            }
        })
    }
}

export const UPDATE_ORDER_DETAILS_REQUEST = 'UPDATE_ORDER_DETAILS_REQUEST';
export const UPDATE_ORDER_DETAILS_SUCCESS = 'UPDATE_ORDER_DETAILS_SUCCESS';
export const UPDATE_ORDER_DETAILS_ERROR = 'UPDATE_ORDER_DETAILS_ERROR';

export function updateOrderDetails(ingredients) {
    return function(dispatch) {
        dispatch({type: UPDATE_ORDER_DETAILS_REQUEST});
        getOrderData(ingredients).then(res => {
            if (res && res.success) {
                dispatch({
                    type: UPDATE_ORDER_DETAILS_SUCCESS,
                    payload: res
                })
            } else {
                dispatch({type: UPDATE_ORDER_DETAILS_ERROR});
            }
        })
    }
}