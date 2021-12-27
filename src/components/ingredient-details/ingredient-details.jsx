import React from "react";
import ingredientDetailsStyle from "./ingredient-details.module.css";
import { useRouteMatch, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "../spinner/spinner";

const IngredientDetails = () => {
    const { params: {ingredientId} } = useRouteMatch();
    const location = useLocation();
    const background = location.state && location.state.background;

    const getIngredient = (id) => burgerIngredientsData.find((item) => item._id === id); 
    const burgerIngredientsData = useSelector((state) => state.burgerIngredients.burgerIngredientsData);
    //const getIngredient = (id) => burgerIngredientsData.find((item) => item._id === id); 


    if (burgerIngredientsData.length === 0) return <Spinner />;
    
    const { image_large, name, calories, proteins, fat, carbohydrates } = getIngredient(ingredientId);

    const ingredientPropsConstructor = [
        {
            prop: calories,
            title: "Калории",
            measure: "ккал",
        },
        {
            prop: proteins,
            title: "Белки",
            measure: "г",
        },
        {
            prop: fat,
            title: "Жиры",
            measure: "г",
        },
        {
            prop: carbohydrates,
            title: "Углеводы",
            measure: "г",
        },
    ];

    const ingredientPropsTemplate = ingredientPropsConstructor.map(({ title, measure, prop }, index) => {
        return (
            <div className={`${ingredientDetailsStyle.propItem} mr-5`} key={index}>
                <p className="text text_type_main-default text_color_inactive">
                    {title}, {measure}
                </p>
                <p className="text text_type_main-default text_color_inactive">{prop}</p>
            </div>
        );
    }); 

    return (
        <div className={!background && ingredientDetailsStyle.wrapper}>
            <h3 className="text text_type_main-large">
                Детали ингредиента
            </h3>
            <div className={ingredientDetailsStyle.description}>
                <img className={ingredientDetailsStyle.img} src={image_large} alt={name} />
                <p className="text text_type_main-medium mt-4 mb-8">{name}</p>
                <ul className={`${ingredientDetailsStyle.propsList} mb-5`}>{ingredientPropsTemplate}</ul>
            </div>
        </div>
    );
};

export default IngredientDetails;
