import { fetchAddresssLists, createAddresss } from "../apis/customer";
import {
  FTECH_ADDRESS_REQUEST, FTECH_ADDRESS_SUCCESS, FTECH_ADDRESS_FAILURE,
  CREATE_ADDRESS_REQUEST, CREATE_ADDRESS_SUCCESS, CREATE_ADDRESS_FAILURE
 } from "../constants";
 
export const fetchAddresssAction = customerId => {
  return dispatch => {
    dispatch({ type: FTECH_ADDRESS_REQUEST })
    return fetchAddresssLists(customerId)
    .then(response => dispatch({type: FTECH_ADDRESS_SUCCESS, payload: response}))
    .catch(error => dispatch({type: FTECH_ADDRESS_FAILURE, error}));
  }
}

export const createAddressAction = (id, params) => {
  return dispatch => {
    dispatch({ type: CREATE_ADDRESS_REQUEST })
    return createAddresss(id, params)
    .then(response => dispatch({type: CREATE_ADDRESS_SUCCESS, payload: response}))
    .catch(error => dispatch({type: CREATE_ADDRESS_FAILURE, error}));
  }
}