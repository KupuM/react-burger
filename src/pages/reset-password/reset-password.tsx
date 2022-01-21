import React, { useEffect, useState } from "react";
import resetPasswordStyles from "./reset-password.module.css";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { newPassword } from "../../services/actions/user-info";

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');
    const [wasReloaded, setWasReloaded] = useState(true);
    const dispatch = useDispatch();
    const history: any = useHistory();
    const {
        setNewPassword: { success, message},
        loggedIn
    } = useSelector((state: any) => state.userInfo);
    const {passwordResetSuccess, setNewPasswordError} = useSelector((state: any) => state.userInfo);

    useEffect(() => {
        setWasReloaded(false);
    }, []);
    
    const onChangeNewPassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setPassword(e.target.value)
    };

    const onChangeCode= (e: React.ChangeEvent<HTMLInputElement>): void => {
        setCode(e.target.value)
    };

    const onSubmitForm = (e: React.FormEvent): void => {  
        e.preventDefault();
        if (password && code) dispatch(newPassword({password, token: code}));
        setWasReloaded(true);
    };

    return (
        <>
            {loggedIn&& <Redirect to={history.location.state?.from || '/'} />}
            {!passwordResetSuccess && !setNewPasswordError && <Redirect to="/forgot-password" /> }
            <form className={`big-input-container ${resetPasswordStyles.wrapper}`} onSubmit={onSubmitForm}>
                <h2 className="text text_type_main-medium">Восстановление пароля</h2>
                <Input
                    type="password"
                    icon="ShowIcon"
                    placeholder="Введите новый пароль"
                    onChange={onChangeNewPassword}
                    value={password}
                    name="password"
                />
                <Input placeholder="Введите код из письма" name="code" value={code} onChange={onChangeCode} />
                {wasReloaded && message && (
                    <p className={success ? resetPasswordStyles.successMessage : resetPasswordStyles.errorMessage}>{message}</p>
                )} 
                <Button type="primary" size="medium">Сохранить</Button>
                <p className="text text_type_main-default text_color_inactive">
                    Вспомнили пароль?
                    &nbsp;
                    <Link to="/login" className={resetPasswordStyles.link}>Войти</Link>
                </p>
            </form>
        </>
    );
}

export default ResetPassword;
