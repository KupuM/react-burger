import React from "react";
import orderDetailsStyles from "./order-details.module.css";
import done from "../../images/done.png";
import PropTypes from "prop-types";
import Spinner from "../spinner/spinner";
import ErrorIndicator from "../error-indicator/error-indicator";

const OrderDeatils = (props) => {
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

OrderDeatils.propTypes = {
    orderDetailsData: PropTypes.shape({
        success: PropTypes.bool, 
        name: PropTypes.string,
        order: PropTypes.shape({
            number: PropTypes.number
        })
    }),
    loading: PropTypes.bool,
    error: PropTypes.bool,
}

export default OrderDeatils;
