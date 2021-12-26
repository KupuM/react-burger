import React, { useRef } from "react";
import PropTypes from "prop-types";
import { ingredientsType } from "../../utils/types";
import BurgerConstructorItemStyles from "./burger-constructor-item.module.css";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import {
    DELETE_BURGER_CONSTRUCTOR_INGREDIENT,
    BURGER_INGREDIENT_COUNTER_DECREMENT,
} from "../../services/actions/burgers";
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";

const BurgerConstructorItem = (props) => {
    const { item, type, position, index, moveCard } = props;
    const dispatch = useDispatch();
    let positionText = "";
    if (position === "top") {
        positionText = " (верх)";
    } else if (position === "bottom") {
        positionText = " (низ)";
    }
    const isLocked = type === "bun";

    const ref = useRef(null);
    const [{ handlerId }, drop] = useDrop({
        accept: "component",
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            moveCard(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });
    const [{ isDragging }, drag] = useDrag({
        type: "component",
        item: () => ({ id: item.id, index }),
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const opacity = isDragging ? 0 : 1;
    if (item.type !== "bun") drag(drop(ref));
    const preventDefault = (e) => e.preventDefault();

    const handleDeleteElement = (index, id) => {
        dispatch({
            type: DELETE_BURGER_CONSTRUCTOR_INGREDIENT,
            payload: index,
        });
        dispatch({
            type: BURGER_INGREDIENT_COUNTER_DECREMENT,
            payload: { id: id },
        });
    };

    return (
        <li 
            className={`${BurgerConstructorItemStyles.mainElementsItem} ${isLocked && "pl-8"}`}
            key={item._id}
            ref={ref}
            style={{ opacity }}
            onDrop={preventDefault}
            data-handler-id={handlerId}
        >
            {!isLocked && (
                <div className={BurgerConstructorItemStyles.dragIcon}>
                    <DragIcon type={"primary"} />
                </div>
            )}
            <ConstructorElement
                type={position}
                isLocked={isLocked}
                text={`${item.name + positionText}`}
                price={item.price}
                thumbnail={item.image}
                handleClose={() => handleDeleteElement(index, item._id)}
            />
        </li>
    );
};

BurgerConstructorItem.propTypes = {
    item: ingredientsType.isRequired,
    type: PropTypes.string.isRequired,
    position: PropTypes.string,
    index: PropTypes.number,
    moveCard: PropTypes.func
}

export default BurgerConstructorItem;
