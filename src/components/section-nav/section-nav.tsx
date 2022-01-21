import React, { useState, useEffect, FC } from 'react';
import sectionNavStyles from './section-nav.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

interface ISectionNavItems {
    title: string;
    type: string;
}

interface ISectionNavProps {
    items: Array<ISectionNavItems>;
    activeItem: string;
}

const SectionNav: FC<ISectionNavProps> = ({ items, activeItem }) => {
	const [ activeTab, setActiveTab ] = useState(activeItem);

    const setTab = (tab: string): void => {
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

export default SectionNav;
