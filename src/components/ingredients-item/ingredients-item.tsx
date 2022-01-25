import React, {FC} from "react";
import ingredientsItemStyles from "./ingredients-item.module.css";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";
import { IIngredientType } from "../../utils/models";

interface IIngredientsItemProps {
    item: IIngredientType;
    quantity?: number;
}

const IngredientsItem: FC<IIngredientsItemProps> = (props) => {
    const {
        item: { image, name, price, _id },
        quantity,
    } = props;
    const [{opacity}, dragRef] = useDrag({
        type: "ingredients",
        item: props.item,
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.7 : 1
        })
    });
    const location = useLocation();

    return (
        <Link
            to={{
                pathname: `/ingredients/${_id}`,
                state: { background: location },
            }}
            className={ingredientsItemStyles.link}
        >
            <li className={ingredientsItemStyles.item} style={{ opacity }}>
                {quantity && quantity > 0 ? (
                    <div className={ingredientsItemStyles.count}>
                        <Counter count={quantity} size="default" />
                    </div>
                ) : null}
                <div className={ingredientsItemStyles.dragBlock} ref={dragRef}>
                    <img className={`${ingredientsItemStyles.image} mb-1 ml-4 mr-4`} src={image} alt={name} />
                    <div className={`${ingredientsItemStyles.price} mb-1`}>
                        <p className="text text_type_digits-default mr-2">{price}</p>
                        <CurrencyIcon type="primary" />
                    </div>
                    <p className={`${ingredientsItemStyles.name} text text_type_main-default`}>{name}</p>
                </div>
            </li>
        </Link>
    );
};

export default IngredientsItem;
