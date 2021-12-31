import React, { useState } from "react";
import editUserStyles from "./edit-user.module.css";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { editUser } from "../../services/actions/user-info";

const EditUser = (props) => {
    const { name: initialName, email: initLogin} = useSelector(state => state.userInfo.userData.user);
    const [name, setName ] = useState(initialName);
    const [login, setLogin ] = useState(initLogin);
    const [password, setPassword] = useState('');
    const [showFooter, setShowFooter] = useState(false);

    const dispatch = useDispatch();

    const onChangeName = e => {
        setName(e.target.value);
        setShowFooter(true);
    };
    
    const onChangeLogin = e => {
        setLogin(e.target.value);
        setShowFooter(true);
    };

    const onChangePassword = e => {
        setPassword(e.target.value);
        setShowFooter(true);
    };

    const onClickCancel = () => {
        setName(initialName);
        setLogin(initLogin);
        setShowFooter(false);
    };

    const onSubmitForm = e => {
        e.preventDefault();
        dispatch(editUser({name, login, password}));
        setShowFooter(false);
    };

    return (
        <form className={`big-input-container ${editUserStyles.profileForm}`} onSubmit={onSubmitForm}>
            <Input type="text" icon="EditIcon" placeholder="Имя" onChange={onChangeName} value={name} name="name" />
            <Input
                type="text"
                icon="EditIcon"
                placeholder="Логин"
                onChange={onChangeLogin}
                value={login}
                name="login"
            />
            <Input
                type="password"
                icon="EditIcon"
                placeholder="Пароль"
                onChange={onChangePassword}
                value={password}
                name="password"
            />
            {showFooter && (
                <div className={editUserStyles.footer}>
                    <Button type="secondary" size="medium" onClick={onClickCancel}>
                        Отмена
                    </Button>
                    <Button type="primary" size="medium">
                        Сохранить
                    </Button>
                </div>
            )}
        </form>
    );
}

export default EditUser;