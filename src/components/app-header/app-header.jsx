import React from "react";
import appHeaderStyles from '../app-header/app-header.module.css';
import Navbar from '../navbar/navbar';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import {BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';

const navbarLeftConstructor = [
    {
        title: 'Конструктор',
        icon: <BurgerIcon type="primary" />,
        active: true
    },
    {
        title: 'Лента заказов',
        icon: <ListIcon type="secondary" />,
        active: false
    }
];
const navbarRightConstructor = [
    {
        title: 'Личный кабинет',
        icon: <ProfileIcon type="secondary" />,
        active: false
    }
];

const AppHeader = () => {

	return (
		<header className={`${appHeaderStyles.wrapper} pt-4 pb-4`}>
			<Navbar items={navbarLeftConstructor} />
			<div className={appHeaderStyles.logo}>
				<Logo />
			</div>
			<Navbar items={navbarRightConstructor} />
		</header>
	);
};

export default AppHeader;
