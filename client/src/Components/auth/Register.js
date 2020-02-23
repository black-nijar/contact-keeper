import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/AlertContext';
import AuthContext from '../../context/auth/AuthContext';

const Register = () => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext)
  const { setAlert } = alertContext;
  const { register, error, clearErrors } = authContext;

  useEffect(() => {
    if (error) {
      setAlert(error, 'danger');
      clearErrors();
    }
  }, [error])

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });
  const { name, email, password, password2 } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
      setAlert('Please enter all fields', 'danger');
    } else if (password !== password2) {
      setAlert('Password do not match', 'danger')
    } else {
      register({
        name,
        email,
        password
      });
    }
  }
  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            name='name'
            placeholder='Name'
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email Id</label>
          <input
            type='email'
            name='email'
            placeholder='Email Id'
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            placeholder='Password'
            value={password}
            onChange={onChange}
            minLength='6'
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password2'>Confirm Password</label>
          <input
            type='password'
            name='password2'
            placeholder='Confirm Password'
            value={password2}
            onChange={onChange}
            minLength='6'
            required
          />
        </div>
        <input
          type='submit'
          value='Register'
          className='btn btn-primary btn-block' />
      </form>
    </div>
  )
}

export default Register
