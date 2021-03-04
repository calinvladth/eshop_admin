import {pagination} from "../../services/pagination";

const {GET_ORDERS} = require("./types");
const initalState = {
    success: false,
    message: '',
    data: [],
    pagination: {},
    loaded: false
}

const OrdersReducers = (state = initalState, action) => {
    switch (action.type) {
        case GET_ORDERS:
            return {
                ...state,
                ...action.data,
                data: pagination(action.data.data, action.limit, action.page),
                pagination: {
                    limit: action.limit,
                    total_pages: Math.ceil(action.data.data.length / action.limit),
                    total_items: action.data.data.length
                },
                loaded: true
            }

        default:
            return {
                ...state,
                loaded: true
            }
    }
}

export default OrdersReducers