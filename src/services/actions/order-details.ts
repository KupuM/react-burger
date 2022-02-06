import { 
    UPDATE_ORDER_DETAILS_ERROR,
    UPDATE_ORDER_DETAILS_REQUEST,
    UPDATE_ORDER_DETAILS_SUCCESS,
    DELETE_BURGER_CONSTRUCTOR_INGREDIENTS_LIST,
} from "../constants/burgers";

import { IIngredientType, IOrderDetailsData, TApplicationDispatch } from "../../utils/types";
import { getOrderData } from "../api-service";

export interface IUpdateOrderDetailsRequest {
    readonly type: typeof UPDATE_ORDER_DETAILS_REQUEST;
}

export interface IUpdateOrderDetailsSuccess {
    readonly type: typeof UPDATE_ORDER_DETAILS_SUCCESS;
    readonly payload: IOrderDetailsData;
}

export interface IUpdateOrderDetailsError {
    readonly type: typeof UPDATE_ORDER_DETAILS_ERROR;
}

export interface IDeleteBurgerConstructorIngredientsList{
    readonly type: typeof DELETE_BURGER_CONSTRUCTOR_INGREDIENTS_LIST;
}

export type TOrderDetailsActions = 
    | IUpdateOrderDetailsRequest
    | IUpdateOrderDetailsSuccess
    | IUpdateOrderDetailsError;

export function updateOrderDetails(ingredients: IIngredientType[]) {
    return function(dispatch: TApplicationDispatch) {
        dispatch({type: UPDATE_ORDER_DETAILS_REQUEST});
        getOrderData(ingredients).then(res => {
            if (res && res.success) {
                dispatch({
                    type: UPDATE_ORDER_DETAILS_SUCCESS,
                    payload: res
                });
                dispatch({
                    type: DELETE_BURGER_CONSTRUCTOR_INGREDIENTS_LIST,
                });
            } else {
                dispatch({type: UPDATE_ORDER_DETAILS_ERROR});
            }
        })
    }
}
