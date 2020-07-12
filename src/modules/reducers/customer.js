import {
  FTECH_CUSTOMERS_REQUEST, FTECH_CUSTOMERS_SUCCESS, FTECH_CUSTOMERS_FAILURE,
  CREATE_CUSTOMER_REQUEST, CREATE_CUSTOMER_SUCCESS, CREATE_CUSTOMER_FAILURE,
  UPDATE_CUSTOMER_REQUEST, UPDATE_CUSTOMER_SUCCESS, UPDATE_CUSTOMER_FAILURE,
  DELETE_CUSTOMER_REQUEST, DELETE_CUSTOMER_SUCCESS, DELETE_CUSTOMER_FAILURE,
  FETCH_CUSTOMER_REQUEST, FETCH_CUSTOMER_SUCCESS, FETCH_CUSTOMER_FAILURE
} from "../constants";

const initialState = {
  fetching: false,
  lists: []
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FTECH_CUSTOMERS_REQUEST:
      return {
        ...state,
        fetching: true,
        updatingStatus: false
      }

    case FTECH_CUSTOMERS_SUCCESS:
      return {
        ...state,
        lists: payload.data,
        fetching: false
      }

    case FTECH_CUSTOMERS_FAILURE:
      return {
        ...state,
        fetching: false,
        error: payload.error
      }

    case FETCH_CUSTOMER_REQUEST:
      return {
        ...state,
        fetching: true
      }

    case FETCH_CUSTOMER_SUCCESS:
      return {
        ...state,
        lists: [payload.data],
        fetching: false
      };
    case FETCH_CUSTOMER_FAILURE:
      return {
        ...state,
        error: payload,
        fetching: false
      };
    case CREATE_CUSTOMER_REQUEST:
      return {
        ...state,
        upserting: true
      }
    case CREATE_CUSTOMER_SUCCESS:
      return {
        ...state,
        lists: [payload.data, ...state.lists],
        upserting: false
      }
    case CREATE_CUSTOMER_FAILURE:
      return {
        ...state,
        error: payload,
        upserting: false
      }
    case UPDATE_CUSTOMER_REQUEST:
      return {
        ...state,
        upserting: true
      }
    case UPDATE_CUSTOMER_SUCCESS:
      return {
        ...state,
        lists: [payload.data, ...state.lists],
        upserting: false
      }
    case UPDATE_CUSTOMER_FAILURE:
      return {
        ...state,
        error: payload,
        upserting: false
      }
    case DELETE_CUSTOMER_REQUEST:
      return {
        ...state,
        deleting: true
      }
    case DELETE_CUSTOMER_SUCCESS:
      console.log(payload)
      return {
        ...state
      }
    case DELETE_CUSTOMER_FAILURE:
      console.log(payload)
      return {
        ...state
      }
    default:
      return state
  }
}

