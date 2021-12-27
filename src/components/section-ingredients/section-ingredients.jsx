import React from "react";
import sectionIngredientsStyles from "./section-ingredients.module.css";
import IngredientsItem from "../ingredients-item/ingredients-item";
import PropTypes from "prop-types";
import { ingredientsType } from "../../utils/types";

const SectionIngredients = (props) => {
    const { burgerData, title, type } = props;
    const ingredients = burgerData.filter((item) => item.type === type);
    
    return (
        <>
            <h3 className="text text_type_main-medium mb-6" id={type}>
                {title}
            </h3>
            <ul className={`${sectionIngredientsStyles.ingredients} mt-6 mb-0 pl-4 pr-2`}>
                {ingredients.map((item) => {
                    return (
                        <IngredientsItem
                            item={item}
                            key={item._id}
                            quantity={item.counter}
                        />
                    );
                })}
            </ul>
        </>
    );
};

SectionIngredients.propTypes = {
    burgerData: PropTypes.arrayOf(ingredientsType).isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
}

export default SectionIngredients;
