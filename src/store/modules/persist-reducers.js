import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export default (reducers) => {
  return persistReducer(
    {
      key: process.env.REACT_APP_NAME ?? '',
      storage,
      whitelist: ['auth'],
    },
    reducers,
  );
};
