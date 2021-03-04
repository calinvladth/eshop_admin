import axios from 'axios'
import {api} from "../../config";
import {GET_PRODUCTS} from "./types";

export const GetProducts = (page = 1) => (dispatch, getState) => {
    axios({
        'method': 'GET',
        'url': `${api}/products/?shop=${localStorage.getItem('shop')}`
    })
        .then(response => {
            const {config: {data: {pagination}}} = getState()
            dispatch({type: GET_PRODUCTS, data: response.data, page: page, limit: pagination.items_admin})
        })
        .catch(error => console.log('ERROR FETCHING PRODUCTS'))
}