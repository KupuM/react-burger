import React from "react";
import ingredientsItemStyles from "./ingredients-item.module.css";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const IngredientsItem = (props) => {
    const {
        item: { image, name, price, _id },
        onClick,
        quantity,
    } = props;

    const handleClickItem = () => {
        onClick('modalIngredient', _id);
    };

    return (
        <li className={ingredientsItemStyles.item} onClick={handleClickItem}>
            {quantity && (
                <div className={ingredientsItemStyles.count}>
                    <Counter count={quantity} size="default" />
                </div>
            )}
            <img
                className={`${ingredientsItemStyles.image} mb-1 ml-4 mr-4`}
                src={image}
                alt={name}
            />
            <div className={`${ingredientsItemStyles.price} mb-1`}>
                <p className="text text_type_digits-default mr-2">
                    {price}
                </p>
                <CurrencyIcon type="primary" />
            </div>
            <p className={`${ingredientsItemStyles.name} text text_type_main-default`}>
                {name}
            </p>
        </li>
    );
};

IngredientsItem.propTypes = {
    item: PropTypes.shape({
        image: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        _id: PropTypes.string.isRequired
      }),
    onClick: PropTypes.func.isRequired,
    quantity: PropTypes.number
}

export default IngredientsItem;
