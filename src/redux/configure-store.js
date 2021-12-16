import { createStore, applyMiddleware } from 'redux'
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import createReducer from './configure-reducer';


const logger = store => next => action => {
  //console.log('dispatching', action)
  let result = next(action)
  //console.log('next state', store.getState())
  return result
}

const middleware = applyMiddleware(promise, thunk, logger);

// Configure the store
function configureStore(initialState) {
  const store = createStore(createReducer(), initialState, middleware)

  // Add a dictionary to keep track of the registered async reducers
  store.asyncReducers = {}

  // Create an inject reducer function
  // This function adds the async reducer, and creates a new combined reducer
  store.injectReducer = (key, asyncReducer) => {
    store.asyncReducers[key] = asyncReducer
    store.replaceReducer(createReducer(store.asyncReducers))
  }

  // Return the modified store
  return store
}
const store = configureStore();
export default store;
