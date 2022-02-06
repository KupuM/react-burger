import React, { FC } from "react";
import FeedItemStyles from "./feed-item.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { IOrder } from "../../utils/types";
import { useSelector } from "../../utils/hooks";
import { formattedDate, getOrderCost, getOrderIngredients, getOrderIngredientsIcons } from "../../utils/utils"
import { Link, useLocation } from "react-router-dom";
import IngredientsIconsList from "../ingredients-icons-list/ingredients-icons-list";

interface IFeedItemProps {
    orderData: IOrder;
};

const FeedItem: FC<IFeedItemProps> = ({ orderData }) => {
    const burgerIngredientsAll = useSelector((state) => state.burgerIngredients.burgerIngredientsData);
    const location = useLocation();

    const numberIconsToRender = 5;
    const orderIngredients = getOrderIngredients(orderData.ingredients, burgerIngredientsAll);
    const iconsList = getOrderIngredientsIcons(orderIngredients).length < numberIconsToRender ? getOrderIngredientsIcons(orderIngredients) : getOrderIngredientsIcons(orderIngredients).slice(0, numberIconsToRender);
    const numberOfHiddenIcons = getOrderIngredientsIcons(orderIngredients).length - numberIconsToRender;

    return (
        <Link
            to={{
                pathname: `/feed/${orderData._id}`,
                state: { background: location },
            }}
            className={FeedItemStyles.link}
        >
            <div className={`${FeedItemStyles.wrapper} p-6 mr-4 mb-4`}>
            <div className={FeedItemStyles.header}>
                <span className={`${FeedItemStyles.number} text text_type_digits-default`}>{orderData.number}</span>
                <span className={`${FeedItemStyles.date} text text_type_main-small text_color_inactive`}>
                    {formattedDate(orderData.createdAt)}
                </span>
            </div>
            <div className="text text_type_main-medium mt-6">{orderData.name}</div>
            <div className={`${FeedItemStyles.inner} mt-6`}>
                <IngredientsIconsList
                numberOfIndividualIcons={numberIconsToRender} 
                iconsList={iconsList}
                numberOfHiddenIcons={numberOfHiddenIcons}
                />
                <div className={`${FeedItemStyles.totalCost} text text_type_digits-default`}>
                    <span className="mr-1">{getOrderCost(orderIngredients)}</span> <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
        </Link>
    );
};

export default FeedItem;