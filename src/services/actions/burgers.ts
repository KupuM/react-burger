import { IIngredientType, TApplicationDispatch } from "../../utils/types";
import { getBurgerData } from "../api-service";
import {
    GET_BURGER_INGREDIENTS_REQUEST,
    GET_BURGER_INGREDIENTS_SUCCESS,
    GET_BURGER_INGREDIENTS_ERROR,
    BURGER_INGREDIENT_COUNTER_INCREMENT,
    BURGER_INGREDIENT_COUNTER_DECREMENT,
} from "../constants/burgers";

export interface IGetBurgerIngredientsRequest {
    readonly type: typeof GET_BURGER_INGREDIENTS_REQUEST;
}

export interface IGetBurgerIngredientsSuccess {
    readonly type: typeof GET_BURGER_INGREDIENTS_SUCCESS;
    readonly payload: IIngredientType[];
}

export interface IGetBurgerIngredientsError {
    readonly type: typeof GET_BURGER_INGREDIENTS_ERROR;
}

export interface IBurgerIngredientCounterIncrement {
    readonly type: typeof BURGER_INGREDIENT_COUNTER_INCREMENT;
    readonly payload: {id: string, type: string};
}

export interface IBurgerIngredientCounterDecrement {
    readonly type: typeof BURGER_INGREDIENT_COUNTER_DECREMENT;
    readonly payload: {id: string};
}

export type TBurgerActions =
    | IGetBurgerIngredientsRequest
    | IGetBurgerIngredientsSuccess
    | IGetBurgerIngredientsError
    | IBurgerIngredientCounterIncrement
    | IBurgerIngredientCounterDecrement;

export function getBurgerIngredients() {
    return function(dispatch: TApplicationDispatch) {
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
