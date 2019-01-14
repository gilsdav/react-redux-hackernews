import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';
import rootSaga from '../sagas';


const saga = createSagaMiddleware();
const logger = createLogger();

console.log(process.env.NODE_ENV);

const middlewares = [
  saga,
  ...(process.env.NODE_ENV !== 'production' ? [
    logger
  ]: [])
];

const store = createStore(
  rootReducer,
  undefined,
  applyMiddleware(...middlewares)
);

saga.run(rootSaga);

export default store;