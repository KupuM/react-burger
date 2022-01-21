import React from "react";
import errorIndicatorStyles from "./error-indicator.module.css";

const ErrorIndicator = (): JSX.Element => {
    return (
        <div className={errorIndicatorStyles.wrapper}>
            <h2>Что-то пошло не так...</h2>
            <p>Попробуйте обновить страницу.</p>
        </div>
    );
}

export default ErrorIndicator;
