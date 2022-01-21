export interface IIngredientType {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
    counter?: number;
    dragId?: string;
}

export interface INavbarItem {
    title: string;
    icon: JSX.Element;
    iconActive: JSX.Element;
    link: string;
    isStrictMatch?: boolean;
}

export interface LocationState {
    background?: {
        pathname?: string;
    };
}