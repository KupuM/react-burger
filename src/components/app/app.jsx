import React, { useState, useEffect } from "react";
import appStyles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import Spinner from "../spinner/spinner";
import ErrorIndicator from "../error-indicator/error-indicator";
import cart from "../../mocks/cart.json";
import { API_URL } from "../../utils/consts";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";

const App = () => {
    const [state, setState] = useState({
        burgerData: null,
        isLoading: true,
        hasError: false,
        isShowModal: false,
        modalType: null,
        ingredientId: null,
        orderId: "034536",
        orderStatus: "waiting",
    });

    const { burgerData, isLoading, hasError, isShowModal, modalType, ingredientId, orderId, orderStatus } = state;
    const ingredient = ingredientId && burgerData.find((item) => item._id === ingredientId);
    const modalContent =
        modalType === "modalIngredient" ? (
            <IngredientDetails ingredient={ingredient} />
        ) : (
            <OrderDetails orderId={orderId} orderStatus={orderStatus} />
        );

    const handleOpenModal = (modalType, id) => {
        setState((prevState) => {
            return { ...prevState, isShowModal: true, modalType: modalType, ingredientId: id };
        });
    };

    const handleCloseModal = () => {
        setState((prevState) => {
            return { ...prevState, isShowModal: false };
        });
    };

    useEffect(() => {
        const getBurgerData = async () => {
            try {
                setState((state) => {
                    return { ...state, isLoading: true, hasError: false };
                });
                const res = await fetch(API_URL);
                const data = await res.json();
                setState((prevState) => {
                    return { ...prevState, burgerData: data.data, isLoading: false, hasError: false };
                });
            } catch (error) {
                setState((prevState) => {
                    return { ...prevState, isLoading: false, hasError: true };
                });
                console.log(error);
            }
        };

        getBurgerData();
    }, []);

    return (
        <div className="App">
            <AppHeader />
            <main className={appStyles.wrapper}>
                {isLoading && <Spinner />}
                {hasError && <ErrorIndicator />}
                {!isLoading && !hasError && (
                    <>
                        <BurgerIngredients burgerData={burgerData} openModal={handleOpenModal} cart={cart} />
                        <BurgerConstructor burgerData={burgerData} openModal={handleOpenModal} />
                    </>
                )}
                {isShowModal && <Modal onClose={handleCloseModal}>{modalContent}</Modal>}
            </main>
        </div>
    );
};

export default App;
