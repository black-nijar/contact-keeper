import React,{ Fragment } from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './Components/layout/Navbar'
import Home from './Components/pages/Home'
import About from './Components/pages/About'
import ContactState from './context/contact/ContactState'
import AuthState from './context/auth/AuthState'
import Register from './Components/auth/Register'
import Login from './Components/auth/Login'
import AlertState from './context/alert/AlertState'
import Alert from './Components/layout/Alert'
import setAuhtToken from './utils/setAuthToken'
import PrivateRoute from './Components/routing/PrivateRoute'


if(localStorage.token) {
  setAuhtToken(localStorage.token);
}
const App = () => {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Router>
            <Fragment>
              <Navbar/>
              <div className='container'>
                <Alert/>
                <Switch>
                  <PrivateRoute exact path='/' component={Home}/>
                  <Route exact path='/about' component={About}/>
                  <Route exact path='/register' component={Register}/>
                  <Route exact path='/login' component={Login}/>
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  )
}

export default App
