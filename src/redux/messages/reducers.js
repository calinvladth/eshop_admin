import {pagination} from "../../services/pagination";
import {GET_MESSAGES} from "./types";

const initialState = {
    success: false,
    message: '',
    data: [],
    loaded: false,
}

const MessagesReducers = (state = initialState, action) => {
    switch (action.type) {
        case GET_MESSAGES:
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

export default MessagesReducers