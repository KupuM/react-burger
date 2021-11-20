import React from "react";
import ingredientDetailsStyle from "./ingredient-details.module.css";
import PropTypes from "prop-types";
import { ingredientsType } from "../../utils/types";

const IngredientDetails = (props) => {
    const { image_large, name, calories, proteins, fat, carbohydrates } = props.ingredient;

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

    const ingredientPropsTemplate = ingredientPropsConstructor.map(({ title, measure, prop }) => {
        return (
            <div className={`${ingredientDetailsStyle.propItem} mr-5`}>
                <p className="text text_type_main-default text_color_inactive">
                    {title}, {measure}
                </p>
                <p className="text text_type_main-default text_color_inactive">{prop}</p>
            </div>
        );
    });

    return (
        <>
            <h3 className="text text_type_main-large">
                Детали ингредиента
            </h3>
            <div className={ingredientDetailsStyle.description}>
                <img className={ingredientDetailsStyle.img} src={image_large} alt={name} />
                <p className="text text_type_main-medium mt-4 mb-8">{name}</p>
                <ul className={`${ingredientDetailsStyle.propsList} mb-5`}>{ingredientPropsTemplate}</ul>
            </div>
        </>
    );
};

IngredientDetails.propTypes = {
    ingredient: PropTypes.arrayOf(ingredientsType).isRequired,
}  

export default IngredientDetails;
