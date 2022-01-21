import React, { FC } from "react";
import { INavbarItem } from "../../utils/models";
import NavButton from '../nav-button/nav-button';
import NavbarStyles from './navbar.module.css';

interface INavbarProps {
    items: INavbarItem[];
    isExact?: boolean;
}

const Navbar: FC<INavbarProps> = (props) => {
	return (
		<nav className={NavbarStyles.navbar}>
			{props.items.map((item, index) => <NavButton {...item} key={index} />)}
		</nav>
	);
};

export default Navbar;
