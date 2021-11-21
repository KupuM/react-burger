import React, { useState, useEffect } from "react";
import appStyles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import Spinner from "../spinner/spinner";
import ErrorIndicator from "../error-indicator/error-indicator";
import cart from "../../mocks/cart.json";
import { INGREDIENTS_URL } from "../../utils/consts";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";

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
    const [order] = useState({
        id: "034536",
        status: "waiting"
    })

    const ingredient = ingredientId && burgerData.data.find((item) => item._id === ingredientId);
    const modalContent =
        modal.type === "modalIngredient" ? (
            <IngredientDetails ingredient={ingredient} />
        ) : (
            <OrderDetails orderId={order.id} orderStatus={order.status} />
        );

    const handleOpenModal = (modalType, id) => {
        setModal({isShow: true, type: modalType});
        setIngredientId(id);
    };

    const handleCloseModal = () => {
        setModal({...modal, isShow: false});
    };

    useEffect(() => {
        const getBurgerData = async () => {
            try {
                setBurgerData({data: null, isLoading: true});
                const res = await fetch(INGREDIENTS_URL);
                const data = await res.json();
                setBurgerData({data: data.data, isLoading: false});
            } catch (error) {
                setBurgerData({data: null, isLoading: false});
                setError(true);
                console.log(error);
            }
        };

        getBurgerData();
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
                        <BurgerConstructor burgerData={burgerData.data} openModal={handleOpenModal} />
                    </>
                )}
                {modal.isShow && <Modal onClose={handleCloseModal}>{modalContent}</Modal>}
            </main>
        </div>
    );
};

export default App;
