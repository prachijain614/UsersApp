import { createStore,applyMiddleware } from "redux";
import rootReducer from "./reducer";
import thunk from 'redux-thunk';

const middlewares = [thunk];

const configureStore = initialValue => {
  const store = createStore(rootReducer, initialValue,applyMiddleware(...middlewares));
  return store;
};

export default configureStore;
