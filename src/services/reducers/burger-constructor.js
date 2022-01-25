import { 
    ADD_BURGER_CONSTRUCTOR_INGREDIENT,
    DELETE_BURGER_CONSTRUCTOR_INGREDIENT,
    UPDATE_BURGER_CONSTRUCTOR_INGREDIENTS_LIST,
    DELETE_BURGER_CONSTRUCTOR_INGREDIENTS_LIST
} from "../actions/burgers";

const initialState = {
    buns: [],
    otherIngredients: []
};

const burgerConstructor = (state = initialState, action) => {
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
            if (action.payload.type === "bun") {
                return {
                    buns: [
                        ...state.buns.slice(0, action.payload),
                        ...state.buns.slice(action.payload + 1)
                    ],
                    otherIngredients: [...state.otherIngredients]
                }
            }
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
