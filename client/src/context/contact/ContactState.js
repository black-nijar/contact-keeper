import React, { useReducer } from 'react';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import axios from 'axios';
import {
  ADD_CONTACT,
  UPDATE_CONTACT,
  CLEAR_CURRENT,
  CLEAR_FILTER,
  DELETE_CONTACT,
  FILTER_CONTACTS,
  SET_CURRENT,
  CONTACT_ERROR,
  GET_CONTACTS
} from '../types'

const ContactState = props => {
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null
  };
  const [state, dispatch] = useReducer(contactReducer, initialState);
  //Get contact
  const getContacts = async () => {
    try {
      const res = await axios.get('/api/contacts');
      dispatch({
        type: GET_CONTACTS,
        payload: res.data
      })
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg })
    }
  }

  //Add contact
  const addContact = async contact => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const res = await axios.post('/api/contacts', contact, config);
      dispatch({
        type: ADD_CONTACT,
        payload: res.data
      })
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg })
    }
  };

  //Delete contact 
  const deleteContact = id => {
    dispatch({
      type: DELETE_CONTACT,
      payload: id
    })
  };

  // Set current
  const setCurrent = contact => {
    dispatch({
      type: SET_CURRENT,
      payload: contact
    })
  };

  //Clear current
  const clearCurrent = () => {
    dispatch({
      type: CLEAR_CURRENT,
    })
  };

  //Update contact
  const updateContact = contact => {
    dispatch({
      type: UPDATE_CONTACT,
      payload: contact
    })
  };

  //Filtered Contact
  const filterContacts = text => {
    dispatch({
      type: FILTER_CONTACTS,
      payload: text
    })
  };

  //Clear filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER })
  }
  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter,
        getContacts,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  )
}

export default ContactState;