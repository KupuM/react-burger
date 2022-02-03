import { combineReducers } from "redux"
import burgerIngredients from "./burger-ingredients";
import burgerConstructor from "./burger-constructor";
import ingredientDetails from "./ingredient-details";
import orderDetails from "./order-details";
import { userInfo } from "./user-info";

const rootReducer = combineReducers({
    burgerIngredients,
    burgerConstructor,
    ingredientDetails,
    orderDetails,
    userInfo,
});

export default rootReducer;
