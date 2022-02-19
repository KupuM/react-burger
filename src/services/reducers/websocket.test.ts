import * as types from '../../services/actions/websocket';
import { websocket, initialState } from './websocket';

describe('websocket reducer', () => {
    it('should return the initinal state', () => {
        expect(
            websocket(undefined, {} as any)
        ).toEqual(initialState)
    });

    it('should handle WS_CONNECTION_START', () => {
        expect(
            websocket(initialState, {
                type: types.WS_CONNECTION_START,
            })
        ).toEqual({...initialState, wsConnectionStart: true});
    });

    it('should handle WS_CONNECTION_START_WITH_TOKEN', () => {
        expect(
            websocket(initialState, {
                type: types.WS_CONNECTION_START_WITH_TOKEN,
            })
        ).toEqual({...initialState, wsConnectionStart: true});
    });

    it('should handle WS_CONNECTION_SUCCESS', () => {
        expect(
            websocket(initialState, {
                type: types.WS_CONNECTION_SUCCESS,
                payload: []
            })
        ).toEqual({...initialState, wsConnectionSuccess: true});
    });

    it('should handle WS_CONNECTION_CLOSE', () => {
        expect(
            websocket(initialState, {
                type: types.WS_CONNECTION_CLOSE,
            })
        ).toEqual(initialState);
    });

    it('should handle WS_GET_MESSAGE', () => {
        expect(
            websocket(initialState, {
                type: types.WS_GET_MESSAGE,
                payload: {
                    orders: [],
                    total: "123",
                    totalToday: "456"
                }
            })
        ).toEqual({...initialState, orders: [], total: "123", totalToday: "456"});
    });
});