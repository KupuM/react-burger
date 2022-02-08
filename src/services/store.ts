import { compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { WS_API_URL } from "../utils/constants";
import { wsMiddleware } from "./middleware/ws-middleware";
import rootReducer from "./reducers/index";
import { wsActions } from "./actions/websocket";

const composeEnhancers =
  typeof window === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose; 
const enhancer = composeEnhancers(applyMiddleware(thunk, wsMiddleware(`${WS_API_URL}/orders`, wsActions)));

export const store = createStore(rootReducer, enhancer);
