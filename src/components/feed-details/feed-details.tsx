import React, { useEffect, FC, useCallback } from "react";
import feedDetailsStyle from "./feed-details.module.css";
import { useRouteMatch, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "../../utils/hooks";
import { IIngredientType, IOrder, LocationState } from "../../utils/types";
import Spinner from "../spinner/spinner";
import { WS_CONNECTION_CLOSE, WS_CONNECTION_START, WS_CONNECTION_START_WITH_TOKEN } from "../../services/actions/websocket";
import { formattedDate, getOrderCost, getOrderIngredients } from "../../utils/utils";
import FeedItemIngredientIcon from "../feed-item-ingredient-icon/feed-item-ingredient-icon";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

interface IQuantityAndPrice {
    count: number | string;
    size: 'default' | 'medium';
}

const QuantityAndPrice: FC<IQuantityAndPrice> = ({count}) => {
    return (
        <span className={`text text_type_digits-default ${feedDetailsStyle.price}`}>
            {count}<CurrencyIcon type="primary" />
        </span>
    );
};

interface IDetailIngredientsItem {
    item: IIngredientType;
    quantity: number;
}

const DetailIngredientsItem: FC<IDetailIngredientsItem> = ({item, quantity}) => {
    const ingredientQuantity = item.type === "bun" ? 2 : quantity;
    return (
      <div className={feedDetailsStyle.ingredientWrapper}>
        <div className={feedDetailsStyle.ingredientInfo}>
          <FeedItemIngredientIcon image={item.image_mobile} />
          <p className="text text_type_main-default ml-4">{item.name}</p>
        </div>
        <QuantityAndPrice count={`${ingredientQuantity} x ${item.price}`} size="default" />
      </div>
    );
};

interface MatchParams {
    orderId: string;
}

const FeedDetails = () => {
    const dispatch = useDispatch();
    const {state, pathname} = useLocation<LocationState>();
    const { params: {orderId}  } = useRouteMatch<MatchParams>();
    const background = state && state.background;

    useEffect(() => {
        if (pathname.indexOf("feed") !== -1 && !background) {
            dispatch({
                type: WS_CONNECTION_START,
            });
        } else {
            if (!background) {
                dispatch({
                    type: WS_CONNECTION_START_WITH_TOKEN,
                });
            }
        }
        return () => {
            dispatch({ type: WS_CONNECTION_CLOSE})
        }
    }, [dispatch, pathname, background]);

    const quantity = useCallback(
        (id: string, ingredients) => {
            return ingredients.reduce((sum: number, item: string) => (item === id ? sum + 1 : sum), 0);
        }, []
    );

    const burgerIngredientsAll = useSelector((state) => state.burgerIngredients.burgerIngredientsData);
    const orders = useSelector(store => store.websocket.orders);
    if (!orders || orders.length === 0) {
        return <Spinner />;
    }
    const getOrderDetails = (orderId: string) => orders.find((item: IOrder) => item._id === orderId)!;
    const { number, name, status, createdAt, ingredients } = getOrderDetails(orderId);
    const detailIngredients = getOrderIngredients(ingredients, burgerIngredientsAll);
    const filteredDetailIngredients = detailIngredients.filter(item => ingredients.includes(item._id));
    const uniqueIngredients = Array.from(new Set(filteredDetailIngredients));

    return (
        <div className={!background ? feedDetailsStyle.wrapper : undefined}>
            <p className="text text_type_digits-default mt-3 mb-10">#{number}</p>
            <p className={`${feedDetailsStyle.name} text text_type_main-medium mb-3`}>{name}</p>
            <p className={`${feedDetailsStyle.status} ${status === "done" && feedDetailsStyle.done} text text_type_main-small mb-15`}>
                {status}
            </p>
            <div className={`${feedDetailsStyle.ingredients}`}>
                <h3 className={`${feedDetailsStyle.title} text text_type_main-medium mb-6`}>Состав:</h3>
                <div className={`${feedDetailsStyle.listWrapper} custom-scroll`}>
                    {uniqueIngredients.map((item: IIngredientType) => (
                        <DetailIngredientsItem key={item._id} item={item} quantity={quantity(item._id, ingredients)} />
                    ))}
                </div>
            </div>
            <div className={feedDetailsStyle.orderInfo}>
                <p className="text text_type_main-default text_color_inactive">{formattedDate(createdAt)}</p>
                <span className={`text text_type_digits-default ${feedDetailsStyle.price}`}>
                    {getOrderCost(detailIngredients)}<CurrencyIcon type="primary" />
                </span>
            </div>
        </div>
    );
};

export default FeedDetails;
