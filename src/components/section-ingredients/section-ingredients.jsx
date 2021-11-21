import React from "react";
import sectionIngredientsStyles from "./section-ingredients.module.css";
import IngredientsItem from "../ingredients-item/ingredients-item";
import PropTypes from "prop-types";
import { ingredientsType, cartType } from "../../utils/types";

const SectionIngredients = (props) => {
    const { burgerData, title, type, onClickItem, cart } = props;
    
    // временное решение для отображения количества, убрать при появлении глобального state
    const ingredientsWithQuantity = (a, b, prop) => {
<<<<<<< HEAD
        let reduced = a.filter(aitem => !b.find(bitem => aitem[prop] === bitem[prop]))
=======
        var reduced = a.filter(aitem => !b.find(bitem => aitem[prop] === bitem[prop]))
>>>>>>> 4869cb788ebb085c3bb8db311816873b0f8f3102
        return reduced.concat(b).reverse();
    }
    const ingredients = ingredientsWithQuantity(burgerData, cart, '_id').filter((item) => item.type === type);
    
    return (
        <section className={sectionIngredientsStyles.wrapper}>
            <h3 className="text text_type_main-medium mb-6" id={type}>
                {title}
            </h3>
            <ul className={`${sectionIngredientsStyles.ingredients} mt-6 mb-0 pl-4 pr-2`}>
                {ingredients.map((item) => {
                    return (
                        <IngredientsItem
                            item={item}
                            key={item._id}
                            onClick={onClickItem}
                            quantity={item.quantity}
                        />
                    );
                })}
            </ul>
        </section>
    );
};

SectionIngredients.propTypes = {
    burgerData: PropTypes.arrayOf(ingredientsType).isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    onClickItem: PropTypes.func.isRequired,
    cart: PropTypes.arrayOf(cartType)
}

export default SectionIngredients;
