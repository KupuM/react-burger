import React, { useState } from "react";
import mainStyles from "./main.module.css";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import Spinner from "../../components/spinner/spinner";
import ErrorIndicator from "../../components/error-indicator/error-indicator";
import Modal from "../../components/modal/modal";
import OrderDetails from "../../components/order-details/order-details";
import { useDispatch, useSelector } from "../../utils/hooks";
import { ADD_INGREDIENT_DETAILS, DELETE_INGREDIENT_DETAILS } from "../../services/constants/burgers"
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { updateOrderDetails } from "../../services/actions/order-details";
import { IIngredientType } from "../../utils/types";

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
        useSelector(state => state.burgerIngredients);

    const dispatch = useDispatch();

    const handleOpenModal = (modalType: string, payload: string | string[] | IIngredientType[]) => {
        setModal({ isShow: true, type: modalType });

        if (modalType === "modalIngredient") {
            dispatch({
                type: ADD_INGREDIENT_DETAILS,
                payload: payload,
            });
        } else {
            dispatch(updateOrderDetails(payload as IIngredientType[]));
        }
    };

    const handleCloseModal = () => {
        setModal({ ...modal, isShow: false });
        dispatch({
            type: DELETE_INGREDIENT_DETAILS,
        });
    };

    const { orderDetailsData, updateOrderDetailsRequest, updateOrderDetailsError } = useSelector(state => state.orderDetails);

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
