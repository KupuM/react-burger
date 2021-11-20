import React from "react";
import navButtonStyles from './nav-button.module.css';
import PropTypes from "prop-types";

const NavButton = (props) => {
    const {title, icon, active} = props; 
    const type = active ? 'primary' : 'secondary'

    return (
        <a href='/' className={`${navButtonStyles.button} pt-4 pb-4 pl-5 pr-5`}>
            {icon}
            <span className={`${navButtonStyles[type]} text ml-2`}>{title}</span>
        </a>
    );
}

NavButton.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.element.isRequired,
    active: PropTypes.bool
}

export default NavButton;
