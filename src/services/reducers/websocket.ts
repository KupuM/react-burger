import { IOrder } from "../../utils/types";
import {
    TWSActions,
    WS_CONNECTION_START,
    WS_CONNECTION_CLOSE,
    WS_GET_MESSAGE
} from "./../actions/websocket";

interface IWSState {
    wsConnected: boolean;
    orders: IOrder[];
    total: number;
    totalToday: number;
}

const initialState: IWSState = {
    wsConnected: false,
    orders: [],
    total: 0,
    totalToday: 0,
}

export const websocket = (state = initialState, action: TWSActions) => {
    switch (action.type) {
        case WS_CONNECTION_START: {
            return {
                ...state,
                wsConnected: true,
            }
        }
        case WS_CONNECTION_CLOSE: {
            return {
                ...state,
                wsConnected: false,
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
