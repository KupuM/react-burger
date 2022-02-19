import { IIngredientConstructorType } from '../../utils/types';
import * as types from '../constants/burgers';
import burgerConstructor, { initialState } from './burger-constructor';

const testIngredientBun: IIngredientConstructorType = {
    _id: "123",
    name: "name",
    type: "bun",
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 0,
    image: "image",
    image_mobile: "image_mobile",
    image_large: "image_large",
    __v: 0,
    dragId: "123",
};

const testIngredientOther: IIngredientConstructorType = {
    _id: "123",
    name: "name",
    type: "sauce",
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 0,
    image: "image",
    image_mobile: "image_mobile",
    image_large: "image_large",
    __v: 0,
    dragId: "123",
};

describe('burger-constructor reducer', () => {
    it('should return the initinal state', () => {
        expect(
            burgerConstructor(undefined, {} as any)
        ).toEqual(initialState)
    });

    it('should handle ADD_BURGER_CONSTRUCTOR_INGREDIENT', () => {
        expect(
            burgerConstructor(initialState, {
                type: types.ADD_BURGER_CONSTRUCTOR_INGREDIENT,
                payload: testIngredientBun,
            })
        ).toEqual({...initialState, buns: [...initialState.buns, {...testIngredientBun}, {...testIngredientBun}]});
    });

    it('should handle DELETE_BURGER_CONSTRUCTOR_INGREDIENT', () => {
        expect(
            burgerConstructor(initialState, {
                type: types.DELETE_BURGER_CONSTRUCTOR_INGREDIENT,
                payload: 0,
            })
        ).toEqual(initialState);
    });

    it('should handle UPDATE_BURGER_CONSTRUCTOR_INGREDIENTS_LIST', () => {
        expect(
            burgerConstructor({...initialState, otherIngredients: [...initialState.otherIngredients, {...testIngredientOther}]}, {
                type: types.UPDATE_BURGER_CONSTRUCTOR_INGREDIENTS_LIST,
                payload: [testIngredientOther],
            })
        ).toEqual({...initialState, otherIngredients: [{...testIngredientOther}]});
    });

    it('should handle DELETE_BURGER_CONSTRUCTOR_INGREDIENTS_LIST', () => {
        expect(
            burgerConstructor({...initialState, otherIngredients: [{...testIngredientOther}, {...testIngredientOther}]}, {
                type: types.DELETE_BURGER_CONSTRUCTOR_INGREDIENTS_LIST,
            })
        ).toEqual(initialState);
    });
}); 