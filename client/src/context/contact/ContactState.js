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
      {id: 1, name: 'Nijar', email: 'nijar@gmail.com', phone: '1314343243', type: 'personal'},
      {id: 2, name: 'Mini', email: 'mini@gmail.com', phone: '23424', type: 'professional'},
      {id: 3, name: 'Mac', email: 'mac@gmail.com', phone: '4353534', type: 'personal'},
      {id: 4, name: 'Apple', email: 'apple@gmail.com', phone: '4432-34-324', type: 'professional'},
    ]
  };
  const [state, dispatch] = useReducer(contactReducer, initialState );

  //Add contact
  const addContact = contact => {
    dispatch({
      type: ADD_CONTACT,
      payload: contact
    })
  }
  return(
    <ContactContext.Provider
      value= {{
        contacts: state.contacts,
        addContact
      }}
    >
      { props.children }
    </ContactContext.Provider>
  )
}

export default ContactState;