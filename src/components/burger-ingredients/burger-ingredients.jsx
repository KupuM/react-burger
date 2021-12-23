import React, { useRef, useState } from "react";
import burgerIngredientsStyles from "./burger-ingredients.module.css";
import SectionNav from "../section-nav/section-nav";
import SectionIngredients from "../section-ingredients/section-ingredients";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const BurgerIngredients = ({ openModal }) => {
    const refBun = useRef(null);
    const refSauce = useRef(null);
    const refMain = useRef(null);
    const [ activeItem, setActiveItem ] = useState('bun');

    const sectionConstructor = [
        {
            title: "Булки",
            type: "bun",
            ref: refBun,
        },
        {
            title: "Соусы",
            type: "sauce",
            ref: refSauce,
        },
        {
            title: "Начинки",
            type: "main",
            ref: refMain,
        },
    ];

    const burgerData = useSelector(state => state.burgerIngredients.burgerIngredientsData);

    const compareCoordsAndSetActiveItem = (bunTop, sauceTop, mainTop, burgerIngredientsWrapperTop) => {
        if (bunTop < burgerIngredientsWrapperTop && sauceTop > burgerIngredientsWrapperTop) {
            setActiveItem('bun');
        } else if (sauceTop < burgerIngredientsWrapperTop && mainTop > burgerIngredientsWrapperTop) {
            setActiveItem('sauce');
        } else if (mainTop < burgerIngredientsWrapperTop) {
            setActiveItem('main');
        } 
    };
    
    const onScroll = () => {
        const burgerIngredientsWrapperTop = document.getElementById('burgerIngredientsWrapper').getBoundingClientRect().top;
        const bunTop = refBun.current.getBoundingClientRect().top - 10
        const sauceTop = refSauce.current.getBoundingClientRect().top - 10
        const mainTop = refMain.current.getBoundingClientRect().top - 10

        compareCoordsAndSetActiveItem(bunTop, sauceTop, mainTop, burgerIngredientsWrapperTop);
    };

    return (
        <section className={burgerIngredientsStyles.leftBlock}>
            <h2 className="text_type_main-large mt-10 mb-5">Соберите бургер</h2>
            <SectionNav items={sectionConstructor} activeItem={activeItem} />

            <div onScroll={onScroll} className={burgerIngredientsStyles.wrapper} id="burgerIngredientsWrapper">
                {sectionConstructor.map((item, index) => {
                    return (
                        <section ref={item.ref} key={index}>
                            <SectionIngredients
                                burgerData={burgerData}
                                title={item.title}
                                type={item.type}
                                onClickItem={openModal}
                            />
                        </section>
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
