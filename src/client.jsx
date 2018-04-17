import React from 'react'
import reducer from './reducer'
import {createMyStore} from './store'
import routes from './routes'
import {Provider} from 'react-redux'
import ReactDOM from 'react-dom'
import './common.scss'

export const store = createMyStore(reducer)
ReactDOM.render(
  <Provider store={store}>
    {routes}
  </Provider>,
  document.getElementById('react-root')
)
