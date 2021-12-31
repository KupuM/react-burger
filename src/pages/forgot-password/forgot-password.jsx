import React, { useState } from "react";
import forgotPasswordStyles from "./forgot-password.module.css";

import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { passwordReset } from "../../services/actions/user-info";
import { Link, Redirect, useHistory } from "react-router-dom";
import { getCookie } from "../../utils/cookie";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();
    const { success, message } = useSelector(state => state.userInfo.passwordReset);
    
    const onChangeEmail = e => {
        setEmail(e.target.value)
    };

    const onSubmitForm = e => {
        e.preventDefault();
        if (email) dispatch(passwordReset(email));
    };

    return (   
        <>
            {getCookie('accessToken') && <Redirect to={history.location.state?.from || '/'} />}
            {success && <Redirect to="/reset-password" /> }
            <form className={`big-input-container ${forgotPasswordStyles.wrapper}`} onSubmit={onSubmitForm}>
                 <h2 className="text text_type_main-medium">Восстановление пароля</h2>
                <Input placeholder="Укажите e-mail" name="email" value={email} onChange={onChangeEmail} />
                {!success && message && <p className={forgotPasswordStyles.errorMessage}>{message}</p>} 

                <Button type="primary" size="medium">Восстановить</Button>

                <p className="text text_type_main-default text_color_inactive">
                    Вспомнили пароль? <Link to="/login" className={forgotPasswordStyles.link}>Войти</Link>
                </p>
            </form>
        </>
    );
}

export default ForgotPassword;
