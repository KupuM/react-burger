import React, { useState } from "react";
import mainStyles from "./main.module.css";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import Spinner from "../../components/spinner/spinner";
import ErrorIndicator from "../../components/error-indicator/error-indicator";
import Modal from "../../components/modal/modal";
import OrderDetails from "../../components/order-details/order-details";
import { useDispatch, useSelector } from "react-redux";
import {
    ADD_INGREDIENT_DETAILS,
    DELETE_INGREDIENT_DETAILS,
    updateOrderDetails
} from "../../services/actions/burgers";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

interface IModal {
    isShow: boolean,
    type: string | null,
}

const Main = () => {
    const [modal, setModal] = useState<IModal>({
        isShow: false,
        type: null,
    });

    const { burgerIngredientsRequest, burgerIngredientsSuccess, burgerIngredientsError } =
        useSelector((state: any) => state.burgerIngredients);

    const dispatch = useDispatch();

    const handleOpenModal = (modalType: string, payload: string[]) => {
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

    const { orderDetailsData, updateOrderDetailsRequest, updateOrderDetailsError } = useSelector((state: any) => state.orderDetails);

    return (
        
        <main className={mainStyles.wrapper}>
            {burgerIngredientsRequest && <Spinner />}
            {burgerIngredientsError && <ErrorIndicator />}
            {burgerIngredientsSuccess && (
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients />
                    <BurgerConstructor openModal={handleOpenModal} />
                    {modal.isShow && (
                        <Modal onClose={handleCloseModal}>
                            <OrderDetails orderDetailsData={orderDetailsData} loading={updateOrderDetailsRequest} error={updateOrderDetailsError} />
                        </Modal>
                    )}
                </DndProvider>
            )}
        </main>
    );
}

export default Main;
