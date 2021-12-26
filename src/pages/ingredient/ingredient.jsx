import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import { getBurgerIngredients } from "../../services/actions/burgers";
import ingredientStyles from "./ingredient.module.css";

const Ingredient = (props) => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getBurgerIngredients());
    }, []);

    return (
        <div className={ingredientStyles.wrapper}>
            <IngredientDetails />
        </div> 
    );
}

export default Ingredient;
