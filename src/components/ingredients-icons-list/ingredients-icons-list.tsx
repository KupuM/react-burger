import React, { FC } from "react";
import FeedItemIngredientIcon from "../feed-item-ingredient-icon/feed-item-ingredient-icon";
import ingredientsIconsListStyles from "./ingredients-icons-list.module.css";

interface IIngredientsIconsList {
    numberOfIndividualIcons: number;
    iconsList: string[];
    numberOfHiddenIcons?: number;
}

const IngredientsIconsList: FC<IIngredientsIconsList> = ({numberOfIndividualIcons, iconsList, numberOfHiddenIcons}) => {
    const hiddenIcon = iconsList[numberOfIndividualIcons - 1];

    return (
        <ul className={ingredientsIconsListStyles.ingredientIcons}>
            {iconsList.map((item, index) => (
                <li
                    key={index}
                    className={ingredientsIconsListStyles.ingredientsItem}
                    style={{ zIndex: numberOfIndividualIcons - index, left: 48 * index }}
                >
                    <FeedItemIngredientIcon image={item} />
                </li>
            ))}
            {numberOfHiddenIcons! > 0 && (
                <li
                    key={numberOfIndividualIcons}
                    className={ingredientsIconsListStyles.ingredientsItem}
                    style={{ zIndex: 0, left: 48 * numberOfIndividualIcons + 1 }}
                >
                    <FeedItemIngredientIcon
                        image={hiddenIcon}
                        count={numberOfHiddenIcons}
                    />
                </li>
            )}
        </ul>
    );
}

export default IngredientsIconsList;