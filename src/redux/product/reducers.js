import {CLEAR_PRODUCT_STATE, GET_PRODUCT} from "./types";

const initialState = {
    success: false,
    message: '',
    data: {},
    loaded: false
}

const ProductReducers = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCT:
            return {
                ...state,
                ...action.data,
                loaded: true
            }

        case CLEAR_PRODUCT_STATE:
            return {
                success: false,
                message: '',
                data: {},
                loaded: false
            }

        default:
            return {
                ...state,
                loaded: true
            }

    }
}

export default ProductReducers