import React, { useState, useEffect } from "react";
import mainStyles from "./main.module.css";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import Spinner from "../../components/spinner/spinner";
import ErrorIndicator from "../../components/error-indicator/error-indicator";
import Modal from "../../components/modal/modal";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import OrderDetails from "../../components/order-details/order-details";
import { useDispatch, useSelector } from "react-redux";
import {
    getBurgerIngredients,
    ADD_INGREDIENT_DETAILS,
    DELETE_INGREDIENT_DETAILS,
    updateOrderDetails
} from "../../services/actions/burgers";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const Main = () => {
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
                type: ADD_INGREDIENT_DETAILS,
                payload: payload,
            });
        } else {
            dispatch(updateOrderDetails(payload));
        }
    };

    const handleCloseModal = () => {
        setModal({ ...modal, isShow: false });
        dispatch({
            type: DELETE_INGREDIENT_DETAILS,
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
        
        <main className={mainStyles.wrapper}>
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
    );
}

export default Main;