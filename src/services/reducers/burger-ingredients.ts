import { 
    GET_BURGER_INGREDIENTS_REQUEST, 
    GET_BURGER_INGREDIENTS_SUCCESS,
    GET_BURGER_INGREDIENTS_ERROR,
    BURGER_INGREDIENT_COUNTER_INCREMENT,
    BURGER_INGREDIENT_COUNTER_DECREMENT,
    BURGER_INGREDIENT_COUNTER_RESET,
} from "../constants/burgers";
import { TBurgerActions } from "../actions/burgers"
import { IIngredientType } from "../../utils/types";

type burgerIngredientsState = {
    burgerIngredientsRequest: boolean,
    burgerIngredientsSuccess: boolean,
    burgerIngredientsError: boolean,
    burgerIngredientsData: IIngredientType[];
};

export const initialState: burgerIngredientsState = {
    burgerIngredientsRequest: false,
    burgerIngredientsSuccess: false,
    burgerIngredientsError: false,
    burgerIngredientsData: []
};

const burgerIngredients = (state = initialState, action: TBurgerActions) => {
    let ingredient: IIngredientType, newBurgerIngredientsData: IIngredientType[];
    switch (action.type) {
        case GET_BURGER_INGREDIENTS_REQUEST:
            return {
                ...state, 
                burgerIngredientsRequest: true,
                burgerIngredientsSuccess: false,
                burgerIngredientsError: false,
            }
        case GET_BURGER_INGREDIENTS_SUCCESS:
            return {
                ...state,
                burgerIngredientsRequest: false, 
                burgerIngredientsSuccess: true,
                burgerIngredientsError: false,
                burgerIngredientsData: action.payload
            }
        case GET_BURGER_INGREDIENTS_ERROR:
            return {
                ...initialState,
                burgerIngredientsRequest: false, 
                burgerIngredientsSuccess: false,
                burgerIngredientsError: true
            }
        case BURGER_INGREDIENT_COUNTER_INCREMENT:
            ingredient = state.burgerIngredientsData.find(item => item._id === action.payload.id)!;
            ingredient['counter'] = (ingredient['counter']) || 0;
            newBurgerIngredientsData = state.burgerIngredientsData
                .map((item: IIngredientType) => {
                        if (item.type === "bun" && item._id === action.payload.id) {
                            return {...ingredient, counter: 2}
                        } else if (item.type === "bun" && action.payload.type === "bun" && item._id !== action.payload.id) {
                            return {...item, counter: 0}
                        } else if (item.type !== "bun" && item._id === action.payload.id) {
                            return {...ingredient, counter: ingredient.counter! + 1}
                        } else {
                            return item
                        }
                    }
                );
            return {
                ...state,
                burgerIngredientsData: [
                    ...newBurgerIngredientsData,
                ]
            }
        case BURGER_INGREDIENT_COUNTER_DECREMENT:
            ingredient = state.burgerIngredientsData.find(item => item._id === action.payload.id)!;
            newBurgerIngredientsData = state.burgerIngredientsData
                .map(item => (
                    item._id === action.payload.id ? {...ingredient, counter: ingredient.counter! - 1} : item)
                );
            return {
                ...state,
                burgerIngredientsData: [
                    ...newBurgerIngredientsData,
                ]
            }
        case BURGER_INGREDIENT_COUNTER_RESET:
            newBurgerIngredientsData = state.burgerIngredientsData
                .map(item => ({...item, counter: 0}));
            return {
                ...state,
                burgerIngredientsData: [
                    ...newBurgerIngredientsData,
                ]
            }
        default:
            return state;
    }
}

export default burgerIngredients;
