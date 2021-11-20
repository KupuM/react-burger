import React, { useState } from 'react';
import sectionNavStyles from './section-nav.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";

const SectionNav = (props) => {
	const [ activeTab, setActiveTab ] = useState('bun');

	return (
		<nav className={`${sectionNavStyles.navbar} mb-10`}>
			{props.items.map((item, index) => {
				return (
					<Tab value={item.type} active={activeTab === item.type} onClick={setActiveTab} key={index}>
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
