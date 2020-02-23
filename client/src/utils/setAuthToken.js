import axios from 'axios';

const setAuhtToken = token => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.common['x-auth-token'];
  }
}

export default setAuhtToken;