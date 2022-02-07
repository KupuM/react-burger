export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_START_WITH_TOKEN: 'WS_CONNECTION_START_WITH_TOKEN' = 'WS_CONNECTION_START_WITH_TOKEN';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_CLOSE: 'WS_CONNECTION_CLOSE' = 'WS_CONNECTION_CLOSE';
export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';

export interface IWSConnectionStart {
    readonly type: typeof WS_CONNECTION_START;
};

export interface IWSConnectionStartWithToken {
    readonly type: typeof WS_CONNECTION_START_WITH_TOKEN;
};

export interface IWSConnectionSuccess {
    readonly type: typeof WS_CONNECTION_SUCCESS;
    readonly payload: any;
}

export interface IWSConnectionClose {
    readonly type: typeof WS_CONNECTION_CLOSE;
}

export interface IWSGetMessage {
    readonly type: typeof WS_GET_MESSAGE;
    readonly payload: any;
}

export type TWSActions =
    | IWSConnectionStart
    | IWSConnectionStartWithToken
    | IWSConnectionSuccess
    | IWSConnectionClose
    | IWSGetMessage;

export type TMiddlewareWsActions = {
    readonly wsInit: typeof WS_CONNECTION_START,
    readonly wsInitWithToken: typeof WS_CONNECTION_START_WITH_TOKEN,
    readonly wsClose: typeof WS_CONNECTION_CLOSE,
    readonly onOpen: typeof WS_CONNECTION_SUCCESS,
    readonly onMessage: typeof WS_GET_MESSAGE
}

export const wsActions: TMiddlewareWsActions = {
    wsInit: WS_CONNECTION_START,
    wsInitWithToken: WS_CONNECTION_START_WITH_TOKEN,
    wsClose: WS_CONNECTION_CLOSE,
    onOpen: WS_CONNECTION_SUCCESS,
    onMessage: WS_GET_MESSAGE
}