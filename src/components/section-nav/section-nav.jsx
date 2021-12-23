import React, { useState, useEffect } from 'react';
import sectionNavStyles from './section-nav.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";

const SectionNav = ({ items, activeItem }) => {
	const [ activeTab, setActiveTab ] = useState(activeItem);

    const setTab = (tab) => {
        setActiveTab(tab);
        const element = document.getElementById(tab);
        element && element.scrollIntoView({block: "start", behavior: "smooth" });
    }

    useEffect(() => {
        setActiveTab(activeItem);
    }, [activeItem]);
    
	return (
		<nav className={`${sectionNavStyles.navbar} mb-10`}>
			{items.map((item, index) => {
				return (
					<Tab value={item.type} active={activeTab === item.type} onClick={setTab} key={index}>
						{item.title}
					</Tab>
				);
			})}
		</nav>
	);
};

SectionNav.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
    })),
    activeItem: PropTypes.string.isRequired
}

export default SectionNav;
