import axios from 'axios';

import { REQUEST, SUCCESS, FAILURE } from './action-type.util';

export const ACTION_TYPES = {
  UPDATE_ACCOUNT: 'account/UPDATE_ACCOUNT',
  UPDATE_PASSWORD: 'account/UPDATE_PASSWORD',
  RESET: 'account/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  account: {},
  updateSuccess: false,
  updateFailure: false
};

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.UPDATE_ACCOUNT):
      return {
        ...state,
        errorMessage: null,
        updatePasswordSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.UPDATE_PASSWORD):
      return {
        ...initialState,
        errorMessage: null,
        updatePasswordSuccess: false,
        loading: true
      };
    case FAILURE(ACTION_TYPES.UPDATE_ACCOUNT):
      return {
        ...state,
        loading: false,
        updateSuccess: false,
        updateFailure: true
      };
    case SUCCESS(ACTION_TYPES.UPDATE_ACCOUNT):
      return {
        ...state,
        loading: false,
        account: action.payload.data
      };
    case FAILURE(ACTION_TYPES.UPDATE_PASSWORD):
      return {
        ...initialState,
        loading: false,
        updatePasswordSuccess: false,
        updatePasswordFailure: true
      };
    case SUCCESS(ACTION_TYPES.UPDATE_PASSWORD):
      return {
        ...initialState,
        loading: false,
        updatePasswordSuccess: true,
        updatePasswordFailure: false
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = '/api/account';
// Actions
export const savePassword = (currentPassword, newPassword) => dispatch => {
  dispatch({
    type: ACTION_TYPES.UPDATE_PASSWORD,
    payload: axios.post(`${apiUrl}/change-password`, { currentPassword, newPassword })
  });
};

export const reset = () => dispatch => {
  dispatch({
    type: ACTION_TYPES.RESET
  });
};

export const saveAccountSettings = account => dispatch => {
  dispatch({
    type: ACTION_TYPES.UPDATE_ACCOUNT,
    payload: axios.post(apiUrl, account)
  });
};

