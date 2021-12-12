import React, { useState, useEffect } from "react";
import appStyles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import Spinner from "../spinner/spinner";
import ErrorIndicator from "../error-indicator/error-indicator";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import { useDispatch, useSelector } from "react-redux";
import {
    getBurgerIngredients,
    ADD_INGERDIENT_DETAILS,
    DELETE_INGERDIENT_DETAILS,
    updateOrderDetails
} from "../../services/actions/index";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const App = () => {
    const [modal, setModal] = useState({
        isShow: false,
        type: null,
    });

    const { burgerIngredientsRequest, burgerIngredientsSuccess, burgerIngredientsError, burgerIngredientsData } =
        useSelector((state) => state.burgerIngredients);

    const dispatch = useDispatch();

    const getIngredient = (id) => {
        return burgerIngredientsData.find((item) => item._id === id); 
    } 

    const handleOpenModal = (modalType, payload) => {
        setModal({ isShow: true, type: modalType });

        if (modalType === "modalIngredient") {
            dispatch({
                type: ADD_INGERDIENT_DETAILS,
                payload: payload,
            });
        } else {
            dispatch(updateOrderDetails(payload));
        }
    };

    const handleCloseModal = () => {
        setModal({ ...modal, isShow: false });
        dispatch({
            type: DELETE_INGERDIENT_DETAILS,
        });
    };

    useEffect(() => {
        dispatch(getBurgerIngredients());
    }, [dispatch]);

    const ingredientId = useSelector((state) => state.ingredientDetails._id);
    const { orderDetailsData, updateOrderDetailsRequest, updateOrderDetailsError } = useSelector((state) => state.orderDetails);

    const modalContent =
        modal.type === "modalIngredient" ? (
            ingredientId && <IngredientDetails ingredient={getIngredient(ingredientId)} />
        ) : (
            <OrderDetails orderDetailsData={orderDetailsData} loading={updateOrderDetailsRequest} error={updateOrderDetailsError} />
        );

    return (
        <div className="App">
            <AppHeader />
            <main className={appStyles.wrapper}>
                {burgerIngredientsRequest && <Spinner />}
                {burgerIngredientsError && <ErrorIndicator />}
                {burgerIngredientsSuccess && (
                    <DndProvider backend={HTML5Backend}>
                        <BurgerIngredients openModal={handleOpenModal} />
                        <BurgerConstructor openModal={handleOpenModal} />
                        {modal.isShow && <Modal onClose={handleCloseModal}>{modalContent}</Modal>}
                    </DndProvider>
                )}
            </main>
        </div>
    );
};

export default App;
