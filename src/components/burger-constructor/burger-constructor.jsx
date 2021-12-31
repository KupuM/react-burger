import React, {useCallback} from "react";
import burgerConstructorStyles from "./burger-constructor.module.css";
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import {
    ADD_BURGER_CONSTRUCTOR_INGREDIENT,
    UPDATE_BURGER_CONSTRUCTOR_INGREDIENTS_LIST,
    BURGER_INGREDIENT_COUNTER_INCREMENT,
} from "../../services/actions/burgers";
import BurgerConstructorItem from "../burger-constructor-item/burger-constructor-item"
import uuid from "react-uuid";
import { useLocation, useHistory } from "react-router-dom";

const BurgerConstructor = ({openModal}) => {
    const { 
        burgerConstructor: {buns, otherIngredients },
        userInfo: { loggedIn }
    } = useSelector(store => store)
    const total = 
        buns.map(item => item.price).reduce((prev, curr) => prev + curr, 0) +
        otherIngredients.map(item => item.price).reduce((prev, curr) => prev + curr, 0);
    const burgerConstructorIngredientsIds = [...buns.map((item) => item._id), ...otherIngredients.map((item) => item._id)];
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();

    const [{isHover}, dropTarget] = useDrop({
        accept: "ingredients",
        collect: monitor => ({
            isHover: monitor.isOver(),
        }),
        drop(ingredient) {
            dispatch({
                type: ADD_BURGER_CONSTRUCTOR_INGREDIENT,
                payload: {...ingredient, dragId: uuid()},
            });
            dispatch({
                type: BURGER_INGREDIENT_COUNTER_INCREMENT,
                payload: {
                    id: ingredient._id,
                    type: ingredient.type
                }
            });
        },
    });

    const handleOpenModal = () => {
        if (!buns[0]) return;

        if (loggedIn) {
            openModal('modalOrder', burgerConstructorIngredientsIds);
        } else {
            history.push({
                pathname: '/login',
                state: { from: location.pathname}
            });
        }
    };

    const hoverClass = isHover && burgerConstructorStyles.wrapperHover;

    const moveIngredient = useCallback((dragIndex, hoverIndex) => {
        const dragOtherIngredients = otherIngredients[dragIndex];
        const newOtherIngredients = [...otherIngredients]
        newOtherIngredients.splice(dragIndex, 1)
        newOtherIngredients.splice(hoverIndex, 0, dragOtherIngredients)
    
        dispatch({
          type: UPDATE_BURGER_CONSTRUCTOR_INGREDIENTS_LIST,
          payload: newOtherIngredients,
        })
      }, [otherIngredients, dispatch]);

    return (
        <section className={`${burgerConstructorStyles.wrapper} mt-25 ${hoverClass}`} ref={dropTarget}>
            {!buns[0] && <div className="mt-25 mb-2 pr-4">Добавьте ингредиенты</div>}
            <ul className={`${burgerConstructorStyles.topElement} mt-0 mb-2 pr-4`}>
                {buns[0] && <BurgerConstructorItem item={buns[0]} type={"bun"} position={"top"} />}
            </ul>
            <ul className={`${burgerConstructorStyles.mainElements}`}>
                {otherIngredients && otherIngredients.map((item, index) => 
                        <BurgerConstructorItem
                            item={item}
                            type={"main"}                          
                            index={index}
                            key={item.dragId}
                            moveCard={moveIngredient}
                        />
                    )
                }
            </ul>
            <ul className={`${burgerConstructorStyles.bottomElement} mt-2 mb-0 pr-4`}>
                {buns[0] && <BurgerConstructorItem item={buns[0]} type={"bun"} position={"bottom"} />}
            </ul>
            <div className={burgerConstructorStyles.total}>
                <p className="text text_type_main-large pr-2">{total}</p>
                <span className="pr-10"><CurrencyIcon type="primary" /></span>
                <Button onClick={handleOpenModal} type="primary" size="large">Оформить заказ</Button>
            </div>             
        </section>
    );
};

BurgerConstructor.propTypes = {
    openModal: PropTypes.func.isRequired,
}  

export default BurgerConstructor;
