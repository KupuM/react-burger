import { IOrderDetailsData } from '../../utils/types';
import * as types from '../constants/burgers';
import orderDetails, { initialState } from './order-details';

const orderDataTest: IOrderDetailsData = {
    success: true,
    name: "Флюоресцентный space бургер",
    order: {
        ingredients: ["60d3b41abdacab0026a733c7"],
        _id: "6210dde225b9a4001b6e024a",
        status: "done",
        name: "Флюоресцентный space бургер",
        createdAt: "2022-02-19T12:09:06.196Z",
        updatedAt: "2022-02-19T12:09:06.476Z",
        number: 10460,
    },
};

describe('order-details reducer', () => {
    it('should return the initinal state', () => {
        expect(
            orderDetails(undefined, {} as any)
        ).toEqual(initialState)
    });

    it('should handle UPDATE_ORDER_DETAILS_REQUEST', () => {
        expect(
            orderDetails(initialState, {
                type: types.UPDATE_ORDER_DETAILS_REQUEST,
            })
        ).toEqual({...initialState, updateOrderDetailsRequest: true});
    });

    it('should handle UPDATE_ORDER_DETAILS_SUCCESS', () => {
        expect(
            orderDetails(initialState, {
                type: types.UPDATE_ORDER_DETAILS_SUCCESS,
                payload: orderDataTest
            })
        ).toEqual({...initialState, updateOrderDetailsSuccess: true, orderDetailsData: orderDataTest});
    });

    it('should handle UPDATE_ORDER_DETAILS_ERROR', () => {
        expect(
            orderDetails(initialState, {
                type: types.UPDATE_ORDER_DETAILS_ERROR,
            })
        ).toEqual({...initialState, updateOrderDetailsError: true});
    });

});