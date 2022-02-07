import React, { FC, useEffect } from "react";
import feedStyles from "./feed.module.css"
import FeedItem from "../../components/feed-item/feed-item";
import { useDispatch, useSelector } from "../../utils/hooks"
import { WS_CONNECTION_START, WS_CONNECTION_CLOSE } from "../../services/actions/websocket";
import { IOrder } from "../../utils/types";
import Spinner from "../../components/spinner/spinner";

const Feed: FC = () => {
    const dispatch = useDispatch();
    const {orders, total, totalToday} = useSelector(store => store.websocket);

    useEffect(() => {
        dispatch({ type: WS_CONNECTION_START});

        return () => {
            dispatch({ type: WS_CONNECTION_CLOSE});
        };
    }, []);

    if (!orders || !orders.length) {
        return <Spinner />
    }

    return (
        <main className={`${feedStyles.wrapper}`}>
            <section className={feedStyles.leftBlock}>
                <h2 className="text_type_main-large mt-10 mb-5">Лента заказов</h2>
                <div className={feedStyles.leftBlockWrapper}>
                    {orders.map((order: IOrder) => (
                        <FeedItem orderData={order} key={order._id} />
                    ))}
                </div>
            </section>
            <section className={`${feedStyles.rightBlockWrapper} mt-25`}>
                <div className={`${feedStyles.ordersListsWrapper} mb-15`}>
                    <div className={feedStyles.readyOrdersWrapper}>
                        <div className={`text text_type_main-medium mb-6`}>Готовы:</div>
                        <ul className={feedStyles.readyOrderslist}>
                            {orders
                                .filter((order: IOrder) => order.status === "done")
                                .map((order: IOrder, index: number) => {
                                    if (index >= 20) return null;
                                    return (
                                        <li
                                            className={`${feedStyles.readyOrdersListItems} text text_type_digits-default mb-2`}
                                            key={order._id}
                                        >
                                            {order.number}
                                        </li>
                                    );
                                })}
                        </ul>
                    </div>
                    <div className={feedStyles.inProgressOrdersWrapper}>
                        <div className="text text_type_main-medium  mb-6">В работе:</div>
                        <ul className={feedStyles.inProgressOrderslist}>
                            {orders
                                .filter((order: IOrder) => order.status === "pending")
                                .map((order: IOrder, index: number) => {
                                    if (index >= 20) return null;
                                    return (
                                        <li
                                            className={`${feedStyles.readyOrdersListItems} text text_type_digits-default mb-2`}
                                            key={order._id}
                                        >
                                            {order.number}
                                        </li>
                                    );
                                })}
                        </ul>
                    </div>
                </div>
                <div className="text text_type_main-medium mb-15">
                    Выполнено за всё время: <br />{" "}
                    <span className={`${feedStyles.number} text text_type_digits-large`}>{total}</span>
                </div>
                <div className="text text_type_main-medium">
                    Выполнено за сегодня: <br />{" "}
                    <span className={`${feedStyles.number} text text_type_digits-large`}>{totalToday}</span>
                </div>
            </section>
        </main>
    );
}

export default Feed;
