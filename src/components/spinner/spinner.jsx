import React from "react";
import spinnerStyles from "./spinner.module.css";
import spinner from "../../images/spinner.gif"

const Spinner = () => {
    return (
        <div className={spinnerStyles.wrapper}>
            <div className={spinnerStyles.spinner} style={{backgroundImage: `url(${spinner})`}}></div>
        </div>
    );
}

export default Spinner;
