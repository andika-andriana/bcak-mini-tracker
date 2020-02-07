// Combine Reducer
import {combineReducers} from 'redux';

// Reducer Auth
const authData = (state = {}, action) => {
  switch (action.type) {
    case 'AUTH_USER_SUCCESS':
      return {
        token: action.token,
        isLoggedIn: true,
      };

    case 'AUTH_USER_FAIL':
      return {
        token: null,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

// Reducer Create User
const createUser = (state = {}, action) => {
  switch (action.type) {
    case 'CREATE_USER_LOADING':
      return {
        isLoading: true,
        isError: false,
        isSuccess: false,
        errors: null,
      };

    case 'CREATE_USER_SUCCESS':
      return {
        isLoading: false,
        isError: false,
        isSuccess: true,
        errors: null,
      };

    case 'CREATE_USER_FAIL':
      return {
        isLoading: false,
        isError: true,
        isSuccess: false,
        errors: action.payload,
      };

    default:
      return state;
  }
};

// Reducer Login User
const loginUser = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN_USER_LOADING':
      return {
        isLoading: true,
        isError: false,
        isSuccess: false,
        errors: null,
      };

    case 'LOGIN_USER_SUCCESS':
      return {
        isLoading: false,
        isError: false,
        isSuccess: true,
        errors: null,
      };

    case 'LOGIN_USER_FAIL':
      return {
        isLoading: false,
        isError: true,
        isSuccess: false,
        errors: action.payload,
      };

    default:
      return state;
  }
};

// Reducer Logout User
const logoutUser = (state = {}, action) => {
  switch (action.type) {
    case 'USER_LOGGED_OUT_LOADING':
      return {
        isLoading: true,
        isError: false,
        isSuccess: false,
        errors: null,
      };

    case 'USER_LOGGED_OUT_SUCCESS':
      return {
        isLoading: false,
        isError: false,
        isSuccess: true,
        errors: null,
      };

    case 'USER_LOGGED_OUT_FAIL':
      return {
        isLoading: false,
        isError: true,
        isSuccess: false,
        errors: action.payload,
      };

    default:
      return state;
  }
};

// Export Combine  Reducer
export default combineReducers({
  createUser,
  loginUser,
  authData,
  logoutUser,
});
