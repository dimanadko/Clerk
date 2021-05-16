import {createStore, combineReducers} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import rootReducer from '../reducers/index';
import AsyncStorage from '@react-native-async-storage/async-storage';

function configureStore(initialState = {}) {
  const reducer = combineReducers({
    form: persistReducer(
      {
        key: 'form', // key for localStorage key, will be: "persist:form"
        storage: AsyncStorage,
        debug: true,
      },
      rootReducer,
    ),
  });

  const store = createStore(
    persistReducer(
      {
        key: 'root',
        debug: true,
        storage: AsyncStorage,
      },
      reducer,
    ),
    initialState,
  );

  console.log('initialState', store.getState());

  const persistor = persistStore(store, null, () => {
    // if you want to get restoredState
    console.log('restoredState', store.getState());
  });

  return {store, persistor};
}

export default configureStore;
