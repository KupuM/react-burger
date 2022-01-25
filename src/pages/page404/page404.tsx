import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import { Link } from "react-router-dom";
import page404Styles from "./page404.module.css";

const Page404 = () => {
    return (
        <div className={page404Styles.wrapper}>
            <h2>Ошибка 404...</h2>
            <p className="p-5">Страница не существует</p>
            <Link 
                to="/"
                //@ts-ignore
                exact
            >
                <Button type="primary" size="medium">
                    На главную страницу
                </Button>
            </Link>
        </div>
    );
}

export default Page404;