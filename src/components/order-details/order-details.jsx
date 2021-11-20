import React from "react";
import orderDetailsStyles from "./order-details.module.css";
import done from "../../images/done.png";
import PropTypes from "prop-types";

const OrderDeatils = (props) => {
    const { orderId, orderStatus } = props;
    const waitingBlock = (
        <>
            <img src={done} alt="готово" className={`${orderDetailsStyles.image} pt-15`} />
            <p className="text text_type_main-small pt-15">Ваш заказ начали готовить</p>
            <p className="text text_type_main-small text_color_inactive pt-2">
                Дождитесь готовности на орбитальной станции
            </p>
        </>
    );

    return (
        <div className={`${orderDetailsStyles.container} pb-30`}>
            <p className="text text_type_digits-large pt-30">{orderId}</p>
            <p className="text text_type_main-medium pt-8">идентификатор заказа</p>
            {orderStatus === 'waiting' && waitingBlock}
        </div>
    );
};

OrderDeatils.propTypes = {
    orderId: PropTypes.string.isRequired,
    orderStatus: PropTypes.string.isRequired,
}

export default OrderDeatils;
