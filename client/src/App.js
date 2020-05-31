import React, { useEffect, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css/dist/js/materialize.min.js'
import './App.css'
import AuthState from './context/auth/AuthState'
import AlertState from './context/alert/AlertState'
import LineupState from './context/lineup/LineupState'

import Navbar from './components/layout/Navbar'
import PrivateRoute from './components/routing/PrivateRoute'
import Home from './components/pages/Home'
import Lineup from './components/pages/Lineup'
import Register from './components/auth/Register'
import Login from './components/auth/Login'

const App = () => {
  useEffect(() => {
    // Initialise materialize JS
    M.AutoInit()
  })
  return (
    <div className='Container'>
      <AuthState>
        <AlertState>
          <LineupState>
            <Router>
              <Fragment>
                <Navbar />
                <div className='container'>
                  <Switch>
                    <PrivateRoute exact path='/' component={Home} />
                    <PrivateRoute exact path='/lineup' component={Lineup} />
                    <Route exact path='/register' component={Register} />
                    <Route exact path='/login' component={Login} />
                  </Switch>
                </div>
              </Fragment>
            </Router>
          </LineupState>
        </AlertState>
      </AuthState>
    </div>
  )
}

export default App
