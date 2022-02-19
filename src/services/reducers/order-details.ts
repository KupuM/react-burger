import { IOrderDetailsData } from "../../utils/types";
import { TOrderDetailsActions } from "../actions/order-details";
import { 
    UPDATE_ORDER_DETAILS_REQUEST,
    UPDATE_ORDER_DETAILS_SUCCESS,
    UPDATE_ORDER_DETAILS_ERROR,
} from "../constants/burgers";


type TOrderDetailsState = {
    updateOrderDetailsRequest: boolean; 
    updateOrderDetailsSuccess: boolean;
    updateOrderDetailsError: boolean;
    orderDetailsData: IOrderDetailsData;
    postOrderRequest: boolean;
    postOrderSuccess: boolean;
    postOrderError: boolean;
}

export const initialState: TOrderDetailsState = { 
    updateOrderDetailsRequest: false, 
    updateOrderDetailsSuccess: false,
    updateOrderDetailsError: false,
    orderDetailsData: {
        success: false, 
        name: "", 
        order: {
            _id: "",
            ingredients: [],
            status: "",
            name: "",
            createdAt: "",
            updatedAt: "",
            number: 0,
        }
    },
    postOrderRequest: false,
    postOrderSuccess: false,
    postOrderError: false,
};

const orderDetails = (state = initialState, action: TOrderDetailsActions) => {
    switch(action.type) {
        case UPDATE_ORDER_DETAILS_REQUEST:
            return {
                ...state, 
                updateOrderDetailsRequest: true,
                updateOrderDetailsSuccess: false,
                updateOrderDetailsError: false,
                orderDetailsData: initialState.orderDetailsData
            }
        case UPDATE_ORDER_DETAILS_SUCCESS:
            return {
                ...state,
                updateOrderDetailsRequest: false, 
                updateOrderDetailsSuccess: true,
                updateOrderDetailsError: false,
                orderDetailsData: action.payload
            }
        case UPDATE_ORDER_DETAILS_ERROR:
            return {
                ...initialState,
                updateOrderDetailsRequest: false, 
                updateOrderDetailsSuccess: false,
                updateOrderDetailsError: true
            }
        default:
            return state;
    }
}

export default orderDetails;
