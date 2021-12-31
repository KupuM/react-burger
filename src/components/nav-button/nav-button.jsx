import React from "react";
import { useRouteMatch } from "react-router-dom";
import navButtonStyles from './nav-button.module.css';
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const NavButton = (props) => {
    const {title, icon, iconActive, link, isStrictMatch} = props;
    const match = useRouteMatch({
        path: link,
        strict: true,
        sensitive: true,
    });

    let image;
    if (isStrictMatch) {
        image = match?.isExact ? iconActive : icon
    } else {
        image = match ? iconActive : icon
    }

    return (
        <NavLink
            to={{ pathname: link }}
            className={`${navButtonStyles.button} pt-4 pb-4 pl-5 pr-5 header-nav-button`}
            activeClassName={navButtonStyles.buttonActive}
            exact={isStrictMatch}
        >
            {image}
            <span className="text ml-2">{title}</span>
        </NavLink>
    );
}

NavButton.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.element.isRequired,
    iconActive: PropTypes.element.isRequired,
    link: PropTypes.string.isRequired,
    isStrictMatch: PropTypes.bool
}

export default NavButton;
