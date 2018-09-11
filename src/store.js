import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware, compose } from 'redux'
import config from './config'

const createMyStore = function(rootReducer) {
  let middlewares = []

  // 开发模式下，打印state变化
  if (config.dev) {
    // middleware that logs the global state for debug
    const loggerMiddleware = createLogger({
      stateTransformer: (state) => {
        return state.toJS()
      },
    })
    middlewares.push(loggerMiddleware)
  }

  const createStoreWithMiddleware = compose(applyMiddleware(...middlewares))(createStore)
  const store = createStoreWithMiddleware(rootReducer)

  return store
}

export default createMyStore
