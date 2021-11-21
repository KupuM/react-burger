import React from "react";
import NavButton from '../nav-button/nav-button';
import NavbarStyles from './navbar.module.css';
import PropTypes from "prop-types";

const Navbar = (props) => {
	return (
		<nav className={NavbarStyles.navbar}>
			{props.items.map((item, index) => <NavButton {...item} key={index} />)}
		</nav>
	);
};

Navbar.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        icon: PropTypes.element.isRequired,
        active: PropTypes.bool
    }))
}

export default Navbar;
