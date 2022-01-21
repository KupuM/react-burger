import React from "react";
import spinnerStyles from "./spinner.module.css";
import spinner from "../../images/spinner.gif"

const Spinner = (): JSX.Element => {
    return (
        <div className={spinnerStyles.wrapper}>
            <div className={spinnerStyles.spinner} style={{backgroundImage: `url(${spinner})`}} />
        </div>
    );
}

export default Spinner;
