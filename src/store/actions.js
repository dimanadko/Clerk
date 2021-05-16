function updateAllData({name, surname, patronymic, privateKey, publicKey}) {
  return {
    type: 'UPDATE_ALL_DATA',
    value: {
      name,
      surname,
      patronymic,
      privateKey,
      publicKey,
    },
  };
}

function updateData(field, value) {
  return {
    type: 'UPDATE_DATA',
    field,
    value,
  };
}

export {updateAllData, updateData};
