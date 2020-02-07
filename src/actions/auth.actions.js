// Import API
import {fetchApi} from '../service/api';

// Action Create User
export const createNewUser = payload => {
  return async dispatch => {
    try {
      dispatch({
        type: 'CREATE_USER_LOADING',
      });
      const response = await fetchApi('/api/register', 'POST', payload, 200);

      if (response.success) {
        dispatch({
          type: 'CREATE_USER_SUCCESS',
        });
        dispatch({
          type: 'AUTH_USER_SUCCESS',
          token: response.token,
        });
        dispatch({
          type: 'GET_USER_SUCCESS',
          payload: response.responseHeaders.ok,
        });

        return response;
      } else {
        throw response;
      }
    } catch (error) {
      dispatch({
        type: 'CREATE_USER_FAIL',
        payload: error.responseBody,
      });
      return error;
    }
  };
};

// Action Login User
export const loginUser = payload => {
  return async dispatch => {
    try {
      dispatch({
        type: 'LOGIN_USER_LOADING',
      });
      const response = await fetchApi(
        '/api/authenticate',
        'POST',
        payload,
        200,
      );

      if (response.success) {
        dispatch({
          type: 'LOGIN_USER_SUCCESS',
        });
        dispatch({
          type: 'AUTH_USER_SUCCESS',
          token: response.token,
        });
        dispatch({
          type: 'GET_USER_SUCCESS',
          payload: response.responseBody,
        });
        return response;
      } else {
        throw response;
      }
    } catch (error) {
      dispatch({
        type: 'LOGIN_USER_FAIL',
        payload: error.responseBody,
      });
      return error;
    }
  };
};

// Action Logout User
export const logoutUser = () => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({
      type: 'USER_LOGGED_OUT_LOADING',
    });
    dispatch({
      type: 'USER_LOGGED_OUT_SUCCESS',
    });
  };
};
