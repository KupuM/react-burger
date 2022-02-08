import React, { useState } from "react";
import editUserStyles from "./edit-user.module.css";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "../../utils/hooks";
import { editUser } from "../../services/actions/user-info";

const EditUser = (): JSX.Element => {
    const { name: initialName, email: initEmail } = useSelector(state => state.userInfo.userData.user);
    const [name, setName ] = useState<string>(initialName);
    const [email, setEmail ] = useState<string>(initEmail);
    const [password, setPassword] = useState('');
    const [showFooter, setShowFooter] = useState(false);

    const dispatch = useDispatch();

    const onChangeName = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setName(e.target.value);
        setShowFooter(true);
    };
    
    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setEmail(e.target.value);
        setShowFooter(true);
    };

    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setPassword(e.target.value);
        setShowFooter(true);
    };

    const onClickCancel = () => {
        setName(initialName);
        setEmail(initEmail);
        setShowFooter(false);
    };

    const onSubmitForm = (e: React.FormEvent): void => {
        e.preventDefault();
        dispatch(editUser({name, email, password}));
        setShowFooter(false);
    };

    return (
        <form className={`big-input-container ${editUserStyles.profileForm}`} onSubmit={onSubmitForm}>
            <Input type="text" icon="EditIcon" placeholder="Имя" onChange={onChangeName} value={name} name="name" />
            <Input
                type="text"
                icon="EditIcon"
                placeholder="Логин"
                onChange={onChangeEmail}
                value={email}
                name="email"
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