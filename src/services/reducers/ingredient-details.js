import { 
    ADD_INGERDIENT_DETAILS,
    DELETE_INGERDIENT_DETAILS
} from "../actions/index";

const initialState= {
    _id: "",
};

const ingredientDetails = (state = initialState, action) => {
    switch(action.type) {
        case ADD_INGERDIENT_DETAILS:
            return {...state, _id: action.payload};
        case DELETE_INGERDIENT_DETAILS:
            return {...initialState};
        default:
            return state;
    }
}

export default ingredientDetails;
