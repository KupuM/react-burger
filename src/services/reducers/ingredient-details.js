import { 
    ADD_INGREDIENT_DETAILS,
    DELETE_INGREDIENT_DETAILS
} from "../actions/burgers";

const initialState= {
    _id: "",
};

const ingredientDetails = (state = initialState, action) => {
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
