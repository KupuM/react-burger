import React from "react";
import profileNavStyles from './profile-nav.module.css';
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../services/actions/user-info";

const ProfileNav = () => {
    const dispatch = useDispatch();

    const onClickLogout = () => {
        dispatch(logoutUser());
    }

    return (
        <ul className={profileNavStyles.navbar}>
            <li>
                <NavLink
                    to="/profile"
                    className={`text text_type_main-medium ${profileNavStyles.button} profile-nav`}
                    exact
                >
                    Профиль
                </NavLink>
            </li>
            <li>
                <NavLink 
                    to="/profile/history"
                    className={`text text_type_main-medium ${profileNavStyles.button} profile-nav`}
                    exact
                >
                    История заказов
                </NavLink>
            </li>
            <li>
                <button onClick={onClickLogout} className={`text text_type_main-medium ${profileNavStyles.button} profile-nav`} >
                    Выход
                </button>
            </li>
        </ul>
    );
};

export default ProfileNav;
