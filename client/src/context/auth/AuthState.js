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
import setAuhtToken from '../../utils/setAuthToken';

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
  const loadUser =  async () => {
    if(localStorage.token) {
      setAuhtToken(localStorage.token)
    }
   try {
     const res = await axios.get('/api/auth');
     dispatch({
       type: USER_LOADED,
       payload: res.data
     })
   } catch (err) {
     dispatch({ type: AUTH_ERROR })
   }
  };
  // Register user
  const register = async formData => {
    const config = {
      headers:  {
        'Content-Type': 'application/json'
      }
    }
    try {
      let res = await axios.post('/api/users', JSON.stringify(formData), config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })
      loadUser();
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg
      })
    }
  };

  // Login
  const login = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      let res = await axios.post('/api/auth', formData, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
        payload: error.response.data.msg,
      });
    }

  };

  // Logout
  const logout = () => {
    dispatch({
      type: LOGOUT
    })
  };

  //Clear Error
  const clearErrors = () => {
   dispatch({
     type: CLEAR_ERRORS
   });
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