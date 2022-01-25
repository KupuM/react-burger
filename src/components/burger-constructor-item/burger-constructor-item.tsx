import React, { FC, useRef } from "react";
import BurgerConstructorItemStyles from "./burger-constructor-item.module.css";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import {
    DELETE_BURGER_CONSTRUCTOR_INGREDIENT,
    BURGER_INGREDIENT_COUNTER_DECREMENT,
} from "../../services/actions/burgers";
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import { IIngredientType } from "../../utils/models";

interface IBurgerConstructorItemProps {
    item: IIngredientType;
    type: string;
    position?: 'top' | 'bottom';
    index?: number;
    moveCard?: (dragIndex: number, hoverIndex: number) => void;
}

const BurgerConstructorItem: FC<IBurgerConstructorItemProps> = (props) => {
    const { item, type, position, index, moveCard } = props;
    const dispatch = useDispatch();
    let positionText: string = "";
    if (position === "top") {
        positionText = " (верх)";
    } else if (position === "bottom") {
        positionText = " (низ)";
    }
    const isLocked = type === "bun";

    const ref = useRef<HTMLLIElement>(null);
    const [{ handlerId }, drop] = useDrop({
        accept: "component",
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item: {id: string, index: number}, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex: number = item.index;
            const hoverIndex: number = index!;
            if (dragIndex === hoverIndex) {
                return;
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset!.y - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            moveCard!(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });
    const [{ isDragging }, drag] = useDrag({
        type: "component",
        item: () => ({ id: item._id, index }),
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const opacity = isDragging ? 0 : 1;
    if (item.type !== "bun") drag(drop(ref));
    const preventDefault = (e: React.SyntheticEvent) => e.preventDefault();

    const handleDeleteElement = () => {
        dispatch({
            type: DELETE_BURGER_CONSTRUCTOR_INGREDIENT,
            payload: index,
        });
        dispatch({
            type: BURGER_INGREDIENT_COUNTER_DECREMENT,
            payload: { id: item._id },
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
                handleClose={() => handleDeleteElement()}
            />
        </li>
    );
};

export default BurgerConstructorItem;
