import axios from 'axios'
import {GET_ORDERS} from "./types";
import {api} from "../../config";

export const GetOrders = (page = 1) => (dispatch, getState) => {
    axios({
        method: 'GET',
        url: `${api}/order/?shop=${localStorage.getItem('shop')}`
    })
        .then(response => {
            const {config: {data: {pagination}}} = getState()
            dispatch({type: GET_ORDERS, data: response.data, page: page, limit: pagination.items_admin || 6})
        })
        .catch(error => console.log('ERROR FETCHING ORDERS'))
}