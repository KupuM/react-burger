import { 
    ADD_INGREDIENT_DETAILS,
    DELETE_INGREDIENT_DETAILS
} from "../constants/burgers";
import { TIngredientDetailsActions } from "../actions/ingredient-details";

interface IIngredientDetailsState {
    _id: string;
};

const initialState: IIngredientDetailsState = {
    _id: "",
};

const ingredientDetails = (state = initialState, action: TIngredientDetailsActions) => {
    switch(action.type) {
        case ADD_INGREDIENT_DETAILS:
            return {...state, _id: action.payload};
        case DELETE_INGREDIENT_DETAILS:
            return {...initialState};
        default:
            return state;
    }
}

export default ingredientDetails;
