import { IIngredientConstructorType } from "../../utils/types";
import { ADD_BURGER_CONSTRUCTOR_INGREDIENT, DELETE_BURGER_CONSTRUCTOR_INGREDIENT, DELETE_BURGER_CONSTRUCTOR_INGREDIENTS_LIST, UPDATE_BURGER_CONSTRUCTOR_INGREDIENTS_LIST } from "../constants/burgers";

export interface IAddBurgerConstructorIngredient {
    readonly type: typeof ADD_BURGER_CONSTRUCTOR_INGREDIENT;
    readonly payload: IIngredientConstructorType;
}

export interface IDeleteBurgerConstructorIngredient {
    readonly type: typeof DELETE_BURGER_CONSTRUCTOR_INGREDIENT;
    readonly payload: number;
}

export interface IUpdateBurgerConstructorIngredientList {
    readonly type: typeof UPDATE_BURGER_CONSTRUCTOR_INGREDIENTS_LIST;
    readonly payload: IIngredientConstructorType[];
}

export interface IDeleteBurgerConstructorIngredientList {
    readonly type: typeof DELETE_BURGER_CONSTRUCTOR_INGREDIENTS_LIST;
}

export type TBurgerConstructorActions = 
    | IAddBurgerConstructorIngredient
    | IDeleteBurgerConstructorIngredient
    | IUpdateBurgerConstructorIngredientList
    | IDeleteBurgerConstructorIngredientList;
    