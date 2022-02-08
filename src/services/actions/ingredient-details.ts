import { 
    ADD_INGREDIENT_DETAILS,
    DELETE_INGREDIENT_DETAILS
} from "../constants/burgers";

export interface IAddIngredientDetails {
    readonly type: typeof ADD_INGREDIENT_DETAILS;
    readonly payload: string;
}

export interface IDeleteIngredientDetails {
    readonly type: typeof DELETE_INGREDIENT_DETAILS;
}

export type TIngredientDetailsActions = IAddIngredientDetails | IDeleteIngredientDetails;