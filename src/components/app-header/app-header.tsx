import React from "react";
import appHeaderStyles from '../app-header/app-header.module.css';
import Navbar from '../navbar/navbar';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import {BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from "react-router-dom";
import { INavbarItem } from "../../utils/types";

const navbarLeftConstructor: INavbarItem[] = [
    {
        title: 'Конструктор',
        icon: <BurgerIcon type="secondary" />,
        iconActive: <BurgerIcon type="primary" />,
        link: '/',
        isStrictMatch: true,
    },    
    {
        title: 'Лента заказов',
        icon: <ListIcon type="secondary" />,
        iconActive: <ListIcon type="primary" />,
        link: '/history',
        isStrictMatch: true,
    }
];
const navbarRightConstructor: INavbarItem[] = [
    {
        title: 'Личный кабинет',
        icon: <ProfileIcon type="secondary" />,
        iconActive: <ProfileIcon type="primary" />,
        link: '/profile',
        isStrictMatch: false,
    }
];

const AppHeader = (): JSX.Element => {

	return (
        <header className={`${appHeaderStyles.wrapper} pt-4 pb-4`}>
            <Navbar items={navbarLeftConstructor} />
            <div className={appHeaderStyles.logo}>
                <Link to="/">
                    <Logo />
                </Link>
            </div>
            <Navbar items={navbarRightConstructor} isExact />
        </header>
    );
};

export default AppHeader;
