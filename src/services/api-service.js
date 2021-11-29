import { API_URL, INGREDIENTS, ORDERS } from "../utils/consts";

export const getBurgerData = async () => {
    try {
        const res = await fetch(API_URL + INGREDIENTS);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
};

export const getOrderData = async (ingredients, setError) => {
    try {
        const res = await fetch(API_URL + ORDERS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                ingredients: ingredients
            })
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};