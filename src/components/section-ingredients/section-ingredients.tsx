import React, {FC} from "react";
import sectionIngredientsStyles from "./section-ingredients.module.css";
import IngredientsItem from "../ingredients-item/ingredients-item";
import { IIngredientType } from "../../utils/models";

interface ISectionIngredients {
    burgerData: IIngredientType[];
    title: string;
    type: string;
}

const SectionIngredients: FC<ISectionIngredients> = (props) => {
    const { burgerData, title, type } = props;
    const ingredients = burgerData.filter((item) => item.type === type);
    
    return (
        <>
            <h3 className="text text_type_main-medium mb-6" id={type}>
                {title}
            </h3>
            <ul className={`${sectionIngredientsStyles.ingredients} mt-6 mb-0 pl-4 pr-2`}>
                {ingredients.map((item) => {
                    return (
                        <IngredientsItem
                            item={item}
                            key={item._id}
                            quantity={item.counter}
                        />
                    );
                })}
            </ul>
        </>
    );
};

export default SectionIngredients;
