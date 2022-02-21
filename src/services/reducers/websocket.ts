import { IOrder } from "../../utils/types";
import {
    TWSActions,
    WS_CONNECTION_START,
    WS_CONNECTION_CLOSE,
    WS_GET_MESSAGE,
    WS_CONNECTION_START_WITH_TOKEN,
    WS_CONNECTION_SUCCESS
} from "./../actions/websocket";

interface IWSState {
    wsConnectionStart: boolean;
    wsConnectionSuccess: boolean;
    orders: IOrder[];
    total: number;
    totalToday: number;
}

export const initialState: IWSState = {
    wsConnectionStart: false,
    wsConnectionSuccess: false,
    orders: [],
    total: 0,
    totalToday: 0,
}

export const websocket = (state = initialState, action: TWSActions) => {
    switch (action.type) {
        case WS_CONNECTION_START: {
            return {
                ...state,
                wsConnectionStart: true,
                wsConnectionSuccess: false,
            }
        }
        case WS_CONNECTION_START_WITH_TOKEN: {
            return {
                ...state,
                wsConnectionStart: true,
                wsConnectionSuccess: false,
            }
        }
        case WS_CONNECTION_SUCCESS: {
            return {
                ...state,
                wsConnectionStart: false,
                wsConnectionSuccess: true,
            }
        }
        case WS_CONNECTION_CLOSE: {
            return {
                ...state,
                wsConnectionStart: false,
                wsConnectionSuccess: false,
            }
        }
        case WS_GET_MESSAGE: {
            return {
                ...state,
                orders: action.payload.orders,
                total: action.payload.total,
                totalToday: action.payload.totalToday,
            }
        }
        default: 
            return state;
    }
}
