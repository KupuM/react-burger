import React, { FC, useEffect } from "react";
import ordersHistoryStyles from "./orders-history.module.css"
import { WS_CONNECTION_CLOSE, WS_CONNECTION_START_WITH_TOKEN } from "../../services/actions/websocket";
import { useDispatch, useSelector } from "../../utils/hooks";
import { IOrder } from "../../utils/types";
import FeedItem from "../feed-item/feed-item";
import Spinner from "../../components/spinner/spinner";

const OrdersHistory: FC  = () => {
    const dispatch = useDispatch();
    const orders = useSelector(store => store.websocket.orders);

    useEffect(() => {
        dispatch({ type: WS_CONNECTION_START_WITH_TOKEN});

        return () => {
            dispatch({ type: WS_CONNECTION_CLOSE})
        }
    }, []);

    return (
        <>
            {!orders ? <Spinner /> : (
                <div className={ordersHistoryStyles.wrapper}>
                {orders.reverse().map((order: IOrder) => (
                    <FeedItem orderData={order} key={order._id} />
                ))}
            </div>
            )}

        </>
    );
}

export default OrdersHistory;
