import React, { useState } from "react";
import registerStyles from "./register.module.css";
import { Input, EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect, useHistory} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../services/actions/user-info";

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();
    const loggedIn = useSelector((state) => state.userInfo.loggedIn);

    const onChangeName = e => {
        setName(e.target.value)
    };
    
    const onChangeEmail = e => {
        setEmail(e.target.value)
    };

    const onChangePassword = e => {
        setPassword(e.target.value)
    };

    const onSubmitForm = (e) => {
        e.preventDefault();
        if (name && email && password) dispatch(registerUser({name, email, password}));
    };

    return (
        loggedIn ? (
            <Redirect to={history.location.state?.from || '/'} /> 
        ) : (
            <form className={`big-input-container ${registerStyles.wrapper}`} onSubmit={onSubmitForm}>
                <h2 className="text text_type_main-medium">Регистрация</h2>
                <Input placeholder="Имя" name="name" value={name} onChange={onChangeName} />
                <EmailInput name="email" value={email} onChange={onChangeEmail} />
                <PasswordInput name="password" value={password} onChange={onChangePassword} />
                <Button type="primary" size="medium">Зарегистрироваться</Button>

                <p className="text text_type_main-default text_color_inactive">
                    Уже зарегистрированы? <Link to="/login" className={registerStyles.link}>Войти</Link>
                </p>
            </form>
        )
    );
}

export default Register;
