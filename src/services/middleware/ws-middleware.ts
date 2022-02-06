import { Middleware, MiddlewareAPI } from "redux";
import { TApplicationDispatch, TRootState } from "../../utils/types";
import { TMiddlewareWsActions, TWSActions } from "../../services/actions/websocket";
import { getCookie } from "../../utils/cookie";

export const wsMiddleware = (wsUrl: string, wsActions: TMiddlewareWsActions): Middleware => {
    return ((store: MiddlewareAPI<TApplicationDispatch, TRootState>) => {
        let socket: WebSocket | null = null;

        return next => (action: TWSActions) => {
            const {dispatch} = store;
            const { type } = action;
            const { wsInit, wsInitWithToken, wsClose, onOpen, onMessage } = wsActions;

            if (type === wsInit) {
                socket = new WebSocket(`${wsUrl}/all`);
            }
            
            if (type === wsInitWithToken) {
                socket = new WebSocket(`${wsUrl}?token=${getCookie('accessToken')!.slice(7)}`);
            }

            if ( socket ) {
                if(type === wsClose) socket.close(1000, 'Closed by user');

                socket.onopen = (event: Event) => {
                    dispatch({type: onOpen, payload: event});
                }

                socket.onmessage = (event: MessageEvent) => {
                    const data = JSON.parse(event.data);
                    dispatch({ type: onMessage, payload: data});
                }

                socket.onclose = (event: Event) => {
                    console.log('WS connection closed');
                }
            }
            next(action);
        }
    }) as Middleware;
}
