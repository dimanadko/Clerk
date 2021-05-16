import {combineReducers} from 'redux';

const defaultState = {
  name: undefined,
  surname: undefined,
  patronymic: undefined,
  privateKey: undefined,
  publicKey: undefined,
};

export const rootReducer = combineReducers({
  data: (state = defaultState, action = {}) => {
    switch (action.type) {
      case 'UPDATE_DATA':
        return {
          ...state,
          [action.field]: action.value,
        };
      case 'UPDATE_ALL_DATA':
        return {
          ...state,
          ...action.value,
        };
      default:
        return state;
    }
  },
});
