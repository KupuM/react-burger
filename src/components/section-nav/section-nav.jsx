import React, { useState } from 'react';
import sectionNavStyles from './section-nav.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";

const SectionNav = (props) => {
	const [ activeTab, setActiveTab ] = useState('bun');

<<<<<<< HEAD
    const setTab = (tab) => {
        setActiveTab(true);
        const element = document.getElementById(tab);
        element && element.scrollIntoView({block: "start", behavior: "smooth" });
    }
    
=======
>>>>>>> 4869cb788ebb085c3bb8db311816873b0f8f3102
	return (
		<nav className={`${sectionNavStyles.navbar} mb-10`}>
			{props.items.map((item, index) => {
				return (
<<<<<<< HEAD
					<Tab value={item.type} active={activeTab === item.type} onClick={setTab} key={index}>
=======
					<Tab value={item.type} active={activeTab === item.type} onClick={setActiveTab} key={index}>
>>>>>>> 4869cb788ebb085c3bb8db311816873b0f8f3102
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
    }))
}

export default SectionNav;
