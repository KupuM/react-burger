import React from "react";
import spinnerStyles from "./spinner.module.css";

const Spinner = () => {
    return (
        <div className={spinnerStyles.wrapper}>
            <h2>Загрузка...</h2>
        </div>
    );
}

export default Spinner;
