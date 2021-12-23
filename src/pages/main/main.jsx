import React, { useState, useEffect } from "react";
import mainStyles from "./main.module.css";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import Spinner from "../../components/spinner/spinner";
import ErrorIndicator from "../../components/error-indicator/error-indicator";
import Modal from "../../components/modal/modal";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import OrderDetails from "../../components/order-details/order-details";
import { BurgerContext } from "../../utils/context";
import { getBurgerData } from "../../services/api-service";

const Main = () => {
    const [burgerData, setBurgerData] = useState({
        data: null,
        isLoading: true
    });
    const [error, setError] = useState();
    const [modal, setModal] = useState({
        isShow: false,
        type: null
    });
    const [ingredientId, setIngredientId] = useState();
    const [order, setOrder] = useState({
        id: null,
        success: false
    })

    const ingredient = ingredientId && burgerData.data.find((item) => item._id === ingredientId);
    const modalContent =
        modal.type === "modalIngredient" ? (
            <IngredientDetails ingredient={ingredient} />
        ) : (
            <OrderDetails orderId={order.id} orderSuccess={order.success} />
        );

    const handleOpenModal = (modalType, payload) => {
        const { ingredientId, orderNumber, orderSuccess, error } = payload;
        if (error) return setError(true);
        setModal({isShow: true, type: modalType});
        setIngredientId(ingredientId);
        setOrder({id: orderNumber, success: orderSuccess});
    };

    const handleCloseModal = () => {
        setModal({...modal, isShow: false});
    };

    useEffect(() => {
        setBurgerData({data: null, isLoading: true});
        getBurgerData()
            .then((res) => {
                setBurgerData({data: res.data, isLoading: false})
            })
            .catch((error) => {
                setError(true);
                setBurgerData({data: null, isLoading: false});
            })
    }, []);
    return (
        <main className={mainStyles.wrapper}>
                {burgerData.isLoading && <Spinner />}
                {error && <ErrorIndicator />}
                {!burgerData.isLoading && !error && (
                    <>
                        <BurgerIngredients openModal={handleOpenModal} />
                        <BurgerConstructor openModal={handleOpenModal} />
                        {modal.isShow && <Modal onClose={handleCloseModal}>{modalContent}</Modal>}
                    </>
                )}
            </main>
    );
}

export default Main;
