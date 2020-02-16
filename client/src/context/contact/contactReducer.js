export const ADD_CONTACT = 'ADD_CONTACT';
export const DELETE_CONTACT = 'DELETE_CONTACT';
export const SET_CURRENT = 'SET_CURRENT';
export const CLEAR_CURRENT = 'CLEAR_CURRENT';
export const UPDATE_CONTACT = 'UPDATE_CONTACT';
export const FILTER_CONTACTS = 'FILTER_CONTACTS';
export const CLEAR_FILTER = 'CLEAR_FILTER';
export const SET_ALERT = 'SET_ALERT';
export const REMOVE_ALERT = 'REMOVE_ALERT';

export default (state, action) => {
  switch (action.type) {
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, action.payload]
      };
    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map(contact => contact.id === action.payload.id ? action.payload: contact)
      }
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(contact => contact.id !== action.payload)
      };
    case SET_CURRENT: 
      return {
        ...state,
        current: action.payload
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };
    default:
      return state;
  }
}