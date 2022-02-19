import * as types from '../constants/burgers';
import ingredientDetails, { initialState } from './ingredient-details';

describe('ingredient-details reducer', () => {
    it('should return the initinal state', () => {
        expect(
            ingredientDetails(undefined, {} as any)
        ).toEqual(initialState)
    });

    it('should handle GET_BURGER_INGREDIENTS_REQUEST', () => {
        expect(
            ingredientDetails(initialState, {
                type: types.ADD_INGREDIENT_DETAILS,
                payload: "123"
            })
        ).toEqual({...initialState, _id: "123"});
    });

    it('should handle DELETE_INGREDIENT_DETAILS', () => {
        expect(
            ingredientDetails({...initialState, _id: "123"}, {
                type: types.DELETE_INGREDIENT_DETAILS,
            })
        ).toEqual({...initialState});
    });
});