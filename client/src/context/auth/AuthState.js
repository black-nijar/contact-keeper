import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} from '../types'

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null
  };
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // Load user
  const loadUser = () => {
    console.log('Load user')
  };
  // Register user
  const register = async formData => {
    const config = {
      headers:  {
        'Content-Type': 'application/json'
      }
    }
    try {
      let res = await axios.post('/api/users', formData, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })
    } catch (err) {
      console.log(err);
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg
      })
    }
  };

  // Login
  const login = () => {
    console.log('login user')
  };

  // Logout
  const logout = () => {
    console.log('logout user')
  };

  //Clear Error
  const clearErrors = () => {
    console.log('clear error')
  };
  
  return (
    <AuthContext.Provider
      value={{
       token: state.token,
       isAuthenticated: state.isAuthenticated,
       loading: state.loading,
       user: state.user,
       error: state.error,
       register,
       loadUser,
       login,
       logout,
       clearErrors
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState;