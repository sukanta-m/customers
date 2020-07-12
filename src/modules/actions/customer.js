import { fetchCustomerList, createCustomer, updateCustomer, deleteCustomer, fetchCustomer } from "../apis/customer";
import {
  FTECH_CUSTOMERS_FAILURE, FTECH_CUSTOMERS_SUCCESS, FTECH_CUSTOMERS_REQUEST,
  CREATE_CUSTOMER_REQUEST, CREATE_CUSTOMER_SUCCESS, CREATE_CUSTOMER_FAILURE,
  UPDATE_CUSTOMER_REQUEST, UPDATE_CUSTOMER_SUCCESS, UPDATE_CUSTOMER_FAILURE,
  DELETE_CUSTOMER_REQUEST, DELETE_CUSTOMER_SUCCESS, DELETE_CUSTOMER_FAILURE,
  FETCH_CUSTOMER_REQUEST, FETCH_CUSTOMER_SUCCESS, FETCH_CUSTOMER_FAILURE
 } from "../constants";
 
export const fetchCustomersAction = (searchTxt = '') => {
  return dispatch => {
    dispatch({ type: FTECH_CUSTOMERS_REQUEST })
    return fetchCustomerList(searchTxt)
    .then(response => dispatch({type: FTECH_CUSTOMERS_SUCCESS, payload: response}))
    .catch(error => dispatch({type: FTECH_CUSTOMERS_FAILURE, error}));
  }
}

export const createCustomerAction = (data) => {
  return dispatch => {
    dispatch({ type: CREATE_CUSTOMER_REQUEST })
    return createCustomer(data)
    .then(response => dispatch({type: CREATE_CUSTOMER_SUCCESS, payload: response}))
    .catch(error => dispatch({type: CREATE_CUSTOMER_FAILURE, error}));
  }
}

export const updateCustomerAction = (id, data) => {
  return dispatch => {
    dispatch({ type: UPDATE_CUSTOMER_REQUEST })
    return updateCustomer(id, data)
    .then(response => dispatch({type: UPDATE_CUSTOMER_SUCCESS, payload: response}))
    .catch(error => dispatch({type: UPDATE_CUSTOMER_FAILURE, error}));
  }
}

export const deleteCustomerAction = (id) => {
  return dispatch => {
    dispatch({ type: DELETE_CUSTOMER_REQUEST })
    return deleteCustomer(id)
    .then(response => dispatch({type: DELETE_CUSTOMER_SUCCESS, payload: response}))
    .catch(error => dispatch({type: DELETE_CUSTOMER_FAILURE, error}));
  }
}

export const fetchCustomerAction = id =>  {
  return dispatch => {
    dispatch({ type: FETCH_CUSTOMER_REQUEST })
    return fetchCustomer(id)
    .then(response => dispatch({type: FETCH_CUSTOMER_SUCCESS, payload: response}))
    .catch(error => dispatch({type: FETCH_CUSTOMER_FAILURE, error}));
  }
}