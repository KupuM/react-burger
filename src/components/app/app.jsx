import React, { useState, useEffect } from "react";
import appStyles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import Spinner from "../spinner/spinner";
import ErrorIndicator from "../error-indicator/error-indicator";
import cart from "../../mocks/cart.json";
<<<<<<< HEAD
import { INGREDIENTS_URL } from "../../utils/consts";
=======
import { API_URL } from "../../utils/consts";
>>>>>>> 4869cb788ebb085c3bb8db311816873b0f8f3102
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";

const App = () => {
<<<<<<< HEAD
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
=======
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
>>>>>>> 4869cb788ebb085c3bb8db311816873b0f8f3102
    };

    useEffect(() => {
        const getBurgerData = async () => {
            try {
<<<<<<< HEAD
                setBurgerData({data: null, isLoading: true});
                const res = await fetch(INGREDIENTS_URL);
                const data = await res.json();
                setBurgerData({data: data.data, isLoading: false});
            } catch (error) {
                setBurgerData({data: null, isLoading: false});
                setError(true);
=======
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
>>>>>>> 4869cb788ebb085c3bb8db311816873b0f8f3102
                console.log(error);
            }
        };

        getBurgerData();
    }, []);

    return (
        <div className="App">
            <AppHeader />
            <main className={appStyles.wrapper}>
<<<<<<< HEAD
                {burgerData.isLoading && <Spinner />}
                {error && <ErrorIndicator />}
                {!burgerData.isLoading && !error && (
                    <>
                        <BurgerIngredients burgerData={burgerData.data} openModal={handleOpenModal} cart={cart} />
                        <BurgerConstructor burgerData={burgerData.data} openModal={handleOpenModal} />
                    </>
                )}
                {modal.isShow && <Modal onClose={handleCloseModal}>{modalContent}</Modal>}
=======
                {isLoading && <Spinner />}
                {hasError && <ErrorIndicator />}
                {!isLoading && !hasError && (
                    <>
                        <BurgerIngredients burgerData={burgerData} openModal={handleOpenModal} cart={cart} />
                        <BurgerConstructor burgerData={burgerData} openModal={handleOpenModal} />
                    </>
                )}
                {isShowModal && <Modal onClose={handleCloseModal}>{modalContent}</Modal>}
>>>>>>> 4869cb788ebb085c3bb8db311816873b0f8f3102
            </main>
        </div>
    );
};

export default App;
