import React, { useReducer } from 'react';
import uuid from 'uuid';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
  ADD_CONTACT,
  UPDATE_CONTACT,
  CLEAR_CURRENT,
  CLEAR_FILTER,
  DELETE_CONTACT,
  FILTER_CONTACTS,
  SET_CURRENT
} from '../types'

const ContactState = props => {
  const initialState = {
    contacts: [
      { id: 1, name: 'Nijar', email: 'nijar@gmail.com', phone: '1314343243', type: 'personal' },
      { id: 2, name: 'Mini', email: 'mini@gmail.com', phone: '23424', type: 'professional' },
      { id: 3, name: 'Mac', email: 'mac@gmail.com', phone: '4353534', type: 'personal' },
      { id: 4, name: 'Apple', email: 'apple@gmail.com', phone: '4432-34-324', type: 'professional' },
    ],
    current: null,
    filtered: null
  };
  const [state, dispatch] = useReducer(contactReducer, initialState);

  //Add contact
  const addContact = contact => {
    dispatch({
      type: ADD_CONTACT,
      payload: contact
    })
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
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter
      }}
    >
      {props.children}
    </ContactContext.Provider>
  )
}

export default ContactState;