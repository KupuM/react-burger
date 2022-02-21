import { 
    ADD_BURGER_CONSTRUCTOR_INGREDIENT,
    DELETE_BURGER_CONSTRUCTOR_INGREDIENT,
    UPDATE_BURGER_CONSTRUCTOR_INGREDIENTS_LIST,
    DELETE_BURGER_CONSTRUCTOR_INGREDIENTS_LIST
} from "../constants/burgers";
import { IIngredientType } from "../../utils/types";
import { TBurgerConstructorActions } from "../actions/burger-constructor";

type TBurgerConstructorState = {
    buns: IIngredientType[],
    otherIngredients: IIngredientType[]
}

export const initialState: TBurgerConstructorState = {
    buns: [],
    otherIngredients: []
};

const burgerConstructor = (state = initialState, action: TBurgerConstructorActions) => {
    switch(action.type) {
        case ADD_BURGER_CONSTRUCTOR_INGREDIENT:
            if (action.payload.type === "bun") {
                return {
                    buns: [...initialState.buns, action.payload, action.payload],
                    otherIngredients: [...state.otherIngredients]
                }
            } else {
                return {
                    buns: [...state.buns],
                    otherIngredients: [...state.otherIngredients, action.payload]
                }
            }
        case DELETE_BURGER_CONSTRUCTOR_INGREDIENT:
            return {
                buns: [...state.buns],
                otherIngredients: [
                    ...state.otherIngredients.slice(0, action.payload),
                    ...state.otherIngredients.slice(action.payload + 1)
                ]
            }
        case UPDATE_BURGER_CONSTRUCTOR_INGREDIENTS_LIST:
            return {
                buns: [...state.buns],
                otherIngredients: [...action.payload]
            }
        case DELETE_BURGER_CONSTRUCTOR_INGREDIENTS_LIST:
            return {
                buns: initialState.buns,
                otherIngredients: initialState.otherIngredients
            }
        default:
            return state;
    }
}

export default burgerConstructor;
