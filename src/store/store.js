import { throttle } from 'lodash'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducer'
import { loadState, saveState } from './localStorage'

const configureStore = () => {
  const persistedState = loadState()
  const middleware = [thunk]
  const enhancers = [applyMiddleware(...middleware)]
  const composeEnhacers = process.env.NODE_ENV !== 'production'
    && typeof window === 'object'
    && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      shouldHotReload: false,
    })
    : compose

  const store = createStore(
    rootReducer,
    persistedState,
    composeEnhacers(...enhancers),
  )
  store.suscribe(
    throttle(() => {
      saveState({
        auth: store.getState().auth,
      })
    }),
  )

  return store
}

export default configureStore
