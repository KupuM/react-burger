import React, { FC } from "react";
import orderDetailsStyles from "./order-details.module.css";
import done from "../../images/done.png";
import Spinner from "../spinner/spinner";
import ErrorIndicator from "../error-indicator/error-indicator";

interface IOrder {
    number: number;
}

interface IOrderDetailsData {
    success: boolean;
    name: string;
    order: IOrder;
}

interface IOrderDetailsProps {
    orderDetailsData: IOrderDetailsData;
    loading: boolean;
    error: boolean;
}

const OrderDetails: FC<IOrderDetailsProps> = (props) => {
    const { orderDetailsData, loading, error } = props;
    const content = (
        <>
            <p className="text text_type_digits-large pt-30">{orderDetailsData.order.number}</p>
            <p className="text text_type_main-medium pt-8">идентификатор заказа</p>
            <img src={done} alt="готово" className={`${orderDetailsStyles.image} pt-15`} />
            <p className="text text_type_main-small pt-15">Ваш заказ начали готовить</p>
            <p className="text text_type_main-small text_color_inactive pt-2">
                Дождитесь готовности на орбитальной станции
            </p>
        </>
    );

    return (
        <div className={`${orderDetailsStyles.container} pb-30`}>
            {loading && <Spinner />}
            {error && <ErrorIndicator />}
            {orderDetailsData.success && content}
        </div>
    );
};

export default OrderDetails;
