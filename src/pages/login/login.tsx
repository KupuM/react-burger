import React, { useState } from "react";
import loginStyles from "./login.module.css";
import { EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "../../utils/hooks";
import { authUser } from "../../services/actions/user-info";

const Login = () => {
    const history: any = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const { 
        authUser: {success, message},
        loggedIn,
    } = useSelector(state => state.userInfo);
    
    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setEmail(e.target.value)
    };

    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setPassword(e.target.value)
    };

    const onSubmitForm = (e: React.FormEvent): void => {
        e.preventDefault();
        if (email && password) dispatch(authUser({email, password}));
    };

    return (
        loggedIn ? (
            <Redirect to={history.location.state?.from || '/'} /> 
        ) : (
            <form className={`big-input-container ${loginStyles.wrapper}`} onSubmit={onSubmitForm}>
                <h2 className="text text_type_main-medium">Вход</h2>
                <EmailInput onChange={onChangeEmail} value={email} name={"email"} />
                <PasswordInput onChange={onChangePassword} value={password} name={"password"} />

                {!success && message && <p className={loginStyles.errorMessage}>{message}</p>}
                <Button type="primary" size="medium" data-test-id="button-login">Войти</Button>

                <p className="text text_type_main-default text_color_inactive">
                    Вы — новый пользователь? <Link to='/register' className={loginStyles.link}>Зарегистрироваться</Link>
                </p>
                <p className="text text_type_main-default text_color_inactive">
                    Забыли пароль? <Link to='/forgot-password' className={loginStyles.link}>Восстановить пароль</Link>
                </p>
        </form>
        )
    );
}

export default Login;
