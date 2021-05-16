const defaultState = {
  name: undefined,
  surname: undefined,
  patronymic: undefined,
  privateKey: undefined,
  publicKey: undefined,
};

export default function (state = defaultState, action = {}) {
  switch (action.type) {
    case 'UPDATE':
      return {
        ...state,
        [action.field]: action.value,
      };
    default:
      return state;
  }
}
