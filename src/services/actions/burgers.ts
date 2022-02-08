import { IIngredientType, TApplicationDispatch } from "../../utils/types";
import { checkResponse } from "../../utils/utils";
import { getBurgerData } from "../api-service";
import {
    GET_BURGER_INGREDIENTS_REQUEST,
    GET_BURGER_INGREDIENTS_SUCCESS,
    GET_BURGER_INGREDIENTS_ERROR,
    BURGER_INGREDIENT_COUNTER_INCREMENT,
    BURGER_INGREDIENT_COUNTER_DECREMENT,
    BURGER_INGREDIENT_COUNTER_RESET
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

export interface IBurgerIngredientCounterReset {
    readonly type: typeof BURGER_INGREDIENT_COUNTER_RESET;
}

export type TBurgerActions =
    | IGetBurgerIngredientsRequest
    | IGetBurgerIngredientsSuccess
    | IGetBurgerIngredientsError
    | IBurgerIngredientCounterIncrement
    | IBurgerIngredientCounterDecrement
    | IBurgerIngredientCounterReset;

export function getBurgerIngredients() {
    return function (dispatch: TApplicationDispatch) {
        dispatch({ type: GET_BURGER_INGREDIENTS_REQUEST });
        getBurgerData()
            .then(checkResponse)
            .then((res) => {
                dispatch({
                    type: GET_BURGER_INGREDIENTS_SUCCESS,
                    payload: res.data,
                });
            })
            .catch(() => {
                dispatch({
                    type: GET_BURGER_INGREDIENTS_ERROR,
                });
            });
    };
}
