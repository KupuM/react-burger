import React, {useContext} from "react";
import burgerConstructorStyles from "./burger-constructor.module.css";
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { ingredientsType } from "../../utils/types";
import { BurgerContext } from "../../utils/context"
import { getOrderData } from "../../services/api-service"

const BurgerConstructor = ({openModal}) => {
    const burgerData = useContext(BurgerContext);
    const mainElements = burgerData.filter((item) => item.type === "main" || item.type === "sauce");
    const total = burgerData.map(item => item.price).reduce((prev, curr) => prev + curr, 0);
    const burgerConstructorIngredientsIds = burgerData.map((item) => item._id);

    const handleOpenModal = async () => {
        const orderData = await getOrderData(burgerConstructorIngredientsIds);
        if (orderData.order.number) {
            openModal('modalOrder', {orderNumber: orderData.order.number, orderSuccess: orderData.success})
        } else {
            openModal('modalOrder', {error: true})
        }
    };

    const getConstructorElement = (element, type, position) => {
        let positionText = "";
        if (position === "top") {
            positionText = " (верх)";
        } else if (position === "bottom") {
            positionText = " (низ)";
        }
        const isLocked = type === "bun";

        return (
            <li className={`${burgerConstructorStyles.mainElementsItem} ${isLocked && "pl-8"}`} key={element._id}>
                {!isLocked && (
                    <div className={burgerConstructorStyles.dragIcon}>
                        <DragIcon type={"primary"} />
                    </div>
                )}
                <ConstructorElement
                    type={position}
                    isLocked={isLocked}
                    text={`${element.name + positionText}`}
                    price={element.price}
                    thumbnail={element.image}
                />
            </li>
        );
    };

    return (
        <section className={`${burgerConstructorStyles.wrapper} mt-25`}>
            <ul className={`${burgerConstructorStyles.topElement} mt-0 mb-2 pr-4`}>
                {getConstructorElement(burgerData[0], "bun", "top")}
            </ul>
            <ul className={`${burgerConstructorStyles.mainElements} pr-2`}>
                {mainElements.map((item) => getConstructorElement(item, "main"))}
            </ul>
            <ul className={`${burgerConstructorStyles.bottomElement} mt-2 mb-0 pr-4`}>
                {getConstructorElement(burgerData[0], "bun", "bottom")}
            </ul>

            <div className={burgerConstructorStyles.total}>
                <p className="text text_type_main-large pr-2">{total}</p>
                <span className="pr-10"><CurrencyIcon type="primary" /></span>
                <Button onClick={handleOpenModal} type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </section>
    );
};

BurgerConstructor.propTypes = {
    burgerData: PropTypes.arrayOf(ingredientsType),
    openModal: PropTypes.func.isRequired,
}  

export default BurgerConstructor;
