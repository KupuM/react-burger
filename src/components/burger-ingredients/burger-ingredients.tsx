import React, { useRef, useState } from "react";
import burgerIngredientsStyles from "./burger-ingredients.module.css";
import SectionNav from "../section-nav/section-nav";
import SectionIngredients from "../section-ingredients/section-ingredients";
import { useSelector } from "react-redux";

const BurgerIngredients = () => {
    const refBun = useRef<HTMLInputElement>(null);
    const refSauce = useRef<HTMLInputElement>(null);
    const refMain = useRef<HTMLInputElement>(null);
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

    const burgerData: any = useSelector<any>(state => state.burgerIngredients.burgerIngredientsData);

    const compareCoordsAndSetActiveItem = (bunTop: number, sauceTop: number, mainTop: number, burgerIngredientsWrapperTop: number): void => {
        if (bunTop < burgerIngredientsWrapperTop && sauceTop > burgerIngredientsWrapperTop) {
            setActiveItem('bun');
        } else if (sauceTop < burgerIngredientsWrapperTop && mainTop > burgerIngredientsWrapperTop) {
            setActiveItem('sauce');
        } else if (mainTop < burgerIngredientsWrapperTop) {
            setActiveItem('main');
        } 
    };
    
    const onScroll = () => {
        const burgerIngredientsWrapperElement = document.getElementById('burgerIngredientsWrapper');
        const burgerIngredientsWrapperTop = burgerIngredientsWrapperElement ? burgerIngredientsWrapperElement.getBoundingClientRect().top : 0;
        const bunTop = refBun.current ? (refBun.current.getBoundingClientRect().top - 10) : 0;
        const sauceTop = refSauce.current ? (refSauce.current.getBoundingClientRect().top - 10) : 0;
        const mainTop = refMain.current ? (refMain.current.getBoundingClientRect().top - 10) : 0;

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
                            />
                        </section>
                    );
                })}
            </div>
        </section>
    );
};

export default BurgerIngredients;
