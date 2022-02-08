import React, { FC } from "react";
import FeedItemIngredientIconStyles from './feed-item-ingredient-icon.module.css';

interface FeedItemIngredientIconProps {
    image?: string;
    count?: number;
}

const FeedItemIngredientIcon: FC<FeedItemIngredientIconProps> = ({image, count}) => {
    return (
        <div className={FeedItemIngredientIconStyles.wrapper}>
            <div className={FeedItemIngredientIconStyles.icon}>
                <img src={image} className={count && count > 1 ? FeedItemIngredientIconStyles.imageOpacity : FeedItemIngredientIconStyles.image} alt="ingredient"/>   
                <div className={FeedItemIngredientIconStyles.text}>
                    {count && count > 1 ? `+${count}` : ''}
                </div>
            </div>
        </div>
    );
}

export default FeedItemIngredientIcon;