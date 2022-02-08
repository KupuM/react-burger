import React, { FC, useEffect, useState } from "react";
import ordersHistoryStyles from "./orders-history.module.css"
import { WS_CONNECTION_CLOSE, WS_CONNECTION_START_WITH_TOKEN } from "../../services/actions/websocket";
import { useDispatch, useSelector } from "../../utils/hooks";
import { IOrder } from "../../utils/types";
import FeedItem from "../feed-item/feed-item";
import Spinner from "../../components/spinner/spinner";

const OrdersHistory: FC = () => {
    const [isOrdersUpdated, setIsOrdersUpdated] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: WS_CONNECTION_START_WITH_TOKEN});
        setIsOrdersUpdated(true);
        return () => {
            dispatch({ type: WS_CONNECTION_CLOSE})
        }
    }, []);

    const {orders} = useSelector(store => store.websocket);
    const ordersReverse = orders.reverse();

    return (
        <>
            {isOrdersUpdated && ordersReverse ? (
                <div className={ordersHistoryStyles.wrapper}>
                {ordersReverse.map((order: IOrder) => (
                    <FeedItem orderData={order} key={order._id} />
                ))}
            </div>
            ) : (
                <Spinner />
            )}
        </>
    );
}

export default OrdersHistory;
