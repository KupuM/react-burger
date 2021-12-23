import React, {useContext} from "react";
import burgerIngredientsStyles from "./burger-ingredients.module.css";
import SectionNav from "../section-nav/section-nav";
import SectionIngredients from "../section-ingredients/section-ingredients";
import PropTypes from "prop-types";
import { cartType } from "../../utils/types";
import { BurgerContext } from "../../utils/context"

const sectionConstructor = [
    {
        title: "Булки",
        type: "bun",
    },
    {
        title: "Соусы",
        type: "sauce",
    },
    {
        title: "Начинки",
        type: "main",
    }
];

const BurgerIngredients = ({ openModal }) => {
    const burgerData = useContext(BurgerContext);

    return (
        <section className={burgerIngredientsStyles.leftBlock}>
            <h2 className="text_type_main-large mt-10 mb-5">Соберите бургер</h2>
            <SectionNav items={sectionConstructor} />
            <div className={burgerIngredientsStyles.wrapper}>
                {sectionConstructor.map((item, index) => {
                    return (
                        <SectionIngredients
                            burgerData={burgerData}
                            title={item.title}
                            type={item.type}
                            key={index}
                            onClickItem={openModal}
                        />
                    );
                })}
            </div>
        </section>
    );
};

BurgerIngredients.propTypes = {
    openModal: PropTypes.func.isRequired,
}  

export default BurgerIngredients;
