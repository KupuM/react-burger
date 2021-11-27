import React, { useState, useEffect } from "react";
import appStyles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import Spinner from "../spinner/spinner";
import ErrorIndicator from "../error-indicator/error-indicator";
import cart from "../../mocks/cart.json";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import { BurgerContext } from "../../utils/context";
import { getBurgerData } from "../../services/api-service";

const App = () => {
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
        <div className="App">
            <AppHeader />
            <main className={appStyles.wrapper}>
                {burgerData.isLoading && <Spinner />}
                {error && <ErrorIndicator />}
                {!burgerData.isLoading && !error && (
                    <>
                        <BurgerIngredients burgerData={burgerData.data} openModal={handleOpenModal} cart={cart} />
                        <BurgerContext.Provider value={burgerData.data}>
                            <BurgerConstructor openModal={handleOpenModal} />
                            {modal.isShow && <Modal onClose={handleCloseModal}>{modalContent}</Modal>}
                        </BurgerContext.Provider>
                    </>
                )}
            </main>
        </div>
    );
};

export default App;
