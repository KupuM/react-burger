import moment from "moment";
import "moment/locale/ru.js";
import { IIngredientType } from "./types";

export const formattedDate = (date: string): string => {
  const newDate = moment(new Date(date)).locale('ru');
  return newDate.calendar() + ' i-GMT+3';
}

export const getOrderIngredients = (orderIngredientsIds: string[], burgerIngredientsAll: IIngredientType[]): IIngredientType[] => {
    const orderIngredients = orderIngredientsIds.reduce((sum: IIngredientType[], current: string) => {
        const ingredient = burgerIngredientsAll.find((item) => current === item._id);
        if (!ingredient) return [];
        return [...sum, ingredient];
    }, []);
    return orderIngredients;
};

export const getOrderCost = (orderIngredients: IIngredientType[]): number => {
    const orderCost = orderIngredients.reduce((sum: number, current: IIngredientType) => {
        if (current.type === 'bun') {
            return sum + current.price * 2
        }
        return sum + current.price;
    }, 0);
    return orderCost;
};

export const getOrderIngredientsIcons = (orderIngredients: IIngredientType[]): string[] => {
    const ingredientsIcons = orderIngredients.reduce((sum: string[], current: IIngredientType) => {
        return [...sum, current.image_mobile]
    }, []);
    return ingredientsIcons;
};

export const checkResponse = async (res: Response) => {
    if (!res.ok) {
        return Promise.reject(new Error(res.statusText))
    }
    return await res.json();
}
