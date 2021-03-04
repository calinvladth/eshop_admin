import axios from "axios";
import {api} from "../../config";
import {GET_EMAILS} from "./types";
import {SetAlert} from "../alerts/actions";

export const GetEmails = (page = 1) => (dispatch, getState) => {
    axios({
        method: 'GET',
        url: `${api}/newsletter/?shop=${localStorage.getItem('shop')}`
    })
        .then(response => {
            const {config: {data: {pagination}}} = getState()
            dispatch({type: GET_EMAILS, data: response.data, page: page, limit: pagination.items_admin || 6})
        })
        .catch((error) => SetAlert({success: false, message: error.statusCode}))
}