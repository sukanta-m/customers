import {
  FTECH_ADDRESS_REQUEST, FTECH_ADDRESS_SUCCESS, FTECH_ADDRESS_FAILURE
} from "../constants";

const initialState = {
  fetching: false,
  lists: []
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FTECH_ADDRESS_REQUEST:
      return {
        ...state,
        fetching: true
      }

    case FTECH_ADDRESS_SUCCESS:
      return {
        ...state,
        lists: payload.data,
        fetching: false
      }

    case FTECH_ADDRESS_FAILURE:
      return {
        ...state,
        fetching: false,
        error: payload.error
      }
    default:
      return state
  }
}

