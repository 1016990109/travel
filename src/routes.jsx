import React from 'react'
import {Router, Route} from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import AppContainer from './containers/AppComponent'

const history = createHistory()

const routes = (
  <Router history={history}>
    <Route path="/" component={AppContainer}/>
  </Router>
)

export default routes
