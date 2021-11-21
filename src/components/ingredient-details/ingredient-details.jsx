import React from "react";
import ingredientDetailsStyle from "./ingredient-details.module.css";
<<<<<<< HEAD
=======
import PropTypes from "prop-types";
>>>>>>> 4869cb788ebb085c3bb8db311816873b0f8f3102
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

<<<<<<< HEAD
    const ingredientPropsTemplate = ingredientPropsConstructor.map(({ title, measure, prop }, index) => {
        return (
            <div className={`${ingredientDetailsStyle.propItem} mr-5`} key={index}>
=======
    const ingredientPropsTemplate = ingredientPropsConstructor.map(({ title, measure, prop }) => {
        return (
            <div className={`${ingredientDetailsStyle.propItem} mr-5`}>
>>>>>>> 4869cb788ebb085c3bb8db311816873b0f8f3102
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
<<<<<<< HEAD
    ingredient: ingredientsType.isRequired,
=======
    ingredient: PropTypes.arrayOf(ingredientsType).isRequired,
>>>>>>> 4869cb788ebb085c3bb8db311816873b0f8f3102
}  

export default IngredientDetails;
