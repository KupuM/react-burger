import React, { FC } from "react";
import { useRouteMatch } from "react-router-dom";
import navButtonStyles from './nav-button.module.css';
import { NavLink } from "react-router-dom";
import { INavbarItem } from "../../utils/models";

const NavButton: FC<INavbarItem> = (props) => {
    const {title, icon, iconActive, link, isStrictMatch} = props;
    const match = useRouteMatch({
        path: link,
        strict: true,
        sensitive: true,
    });

    let image: JSX.Element;
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

export default NavButton;
