import { combineReducers } from "redux"
import burgerIngredients from "../reducers/burger-ingredients";
import burgerConstructor from "../reducers/burger-constructor";
import ingredientDetails from "../reducers/ingredient-details";
import orderDetails from "../reducers/order-details";

const rootReducer = combineReducers({
    burgerIngredients,
    burgerConstructor,
    ingredientDetails,
    orderDetails
});

export default rootReducer;
