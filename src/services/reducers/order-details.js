import { 
    UPDATE_ORDER_DETAILS_REQUEST,
    UPDATE_ORDER_DETAILS_SUCCESS,
    UPDATE_ORDER_DETAILS_ERROR
} from "../actions/burgers";

const initialState = { 
    updateOrderDetailsRequest: false, 
    updateOrderDetailsSuccess: false,
    updateOrderDetailsError: false,
    orderDetailsData: {
        success: false, 
        name: "", 
        order: {
            number: null
        }
    }
};

const orderDetails = (state = initialState, action) => {
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
