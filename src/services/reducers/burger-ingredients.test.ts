import { IIngredientConstructorType } from '../../utils/types';
import * as types from '../constants/burgers';
import burgerIngredients, { initialState } from './burger-ingredients';

const testIngredientOther: IIngredientConstructorType = {
    _id: "123",
    name: "name",
    type: "souce",
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 0,
    image: "image",
    image_mobile: "image_mobile",
    image_large: "image_large",
    __v: 0,
    counter: 0,
    dragId: "123",
};

describe('burger-ingredients reducer', () => {
    it('should return the initinal state', () => {
        expect(
            burgerIngredients(undefined, {} as any)
        ).toEqual(initialState)
    });

    it('should handle GET_BURGER_INGREDIENTS_REQUEST', () => {
        expect(
            burgerIngredients(initialState, {
                type: types.GET_BURGER_INGREDIENTS_REQUEST,
            })
        ).toEqual({...initialState, burgerIngredientsRequest: true});
    });

    it('should handle GET_BURGER_INGREDIENTS_SUCCESS', () => {
        expect(
            burgerIngredients(initialState, {
                type: types.GET_BURGER_INGREDIENTS_SUCCESS,
                payload: [testIngredientOther]
            })
        ).toEqual({...initialState, burgerIngredientsSuccess: true, burgerIngredientsData: [testIngredientOther]});
    });

    it('should handle GET_BURGER_INGREDIENTS_ERROR', () => {
        expect(
            burgerIngredients(initialState, {
                type: types.GET_BURGER_INGREDIENTS_ERROR,
            })
        ).toEqual({...initialState, burgerIngredientsError: true});
    });

    it('should handle BURGER_INGREDIENT_COUNTER_INCREMENT', () => {
        expect(
            burgerIngredients({...initialState, burgerIngredientsData: [{...testIngredientOther}]}, {
                type: types.BURGER_INGREDIENT_COUNTER_INCREMENT,
                payload: {id: "123", type: "sauce"}
            })
        ).toEqual({...initialState, burgerIngredientsData: [{...testIngredientOther, counter: 1}]});
    });

    it('should handle BURGER_INGREDIENT_COUNTER_DECREMENT', () => {
        expect(
            burgerIngredients({...initialState, burgerIngredientsData: [{...testIngredientOther, counter: 3}]}, {
                type: types.BURGER_INGREDIENT_COUNTER_DECREMENT,
                payload: {id: "123"}
            })
        ).toEqual({...initialState, burgerIngredientsData: [{...testIngredientOther, counter: 2}]});
    });

    it('should handle BURGER_INGREDIENT_COUNTER_RESET', () => {
        expect(
            burgerIngredients({...initialState, burgerIngredientsData: [{...testIngredientOther, counter: 3}]}, {
                type: types.BURGER_INGREDIENT_COUNTER_RESET,
            })
        ).toEqual({...initialState, burgerIngredientsData: [{...testIngredientOther, counter: 0}]});
    });
});