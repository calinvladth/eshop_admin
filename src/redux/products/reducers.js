import {GET_PRODUCTS} from "./types";
import {pagination} from "../../services/pagination";

const initialState = {
    success: false,
    message: '',
    data: [],
    pagination: {},
    loaded: false
}

const ProductsReducers = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCTS:
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
                ...state
            }
    }
}

export default ProductsReducers