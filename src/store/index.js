import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';
import persistedReducer from './modules/persist-reducers';
import rootReducer from './modules/root-reducer';
import rootSaga from './modules/root-saga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: persistedReducer(rootReducer),
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
export default store;
