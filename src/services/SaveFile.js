import * as RNFS from 'react-native-fs';
import moment from 'moment';

const SaveFile = async ({
  name = moment().format('MMMM Do YYYY h-mm-ss a'),
  value,
  type = 'template',
}) => {
  const metaPath =
    RNFS.DocumentDirectoryPath +
    (type === 'template' ? '/templates' : '/documents');

  const path =
    metaPath + '/' + type + name + (type === 'template' ? '.txt' : '.txt.p7s');
  const templatesExist = await RNFS.exists(metaPath);
  if (templatesExist) {
    RNFS.writeFile(path, value, 'utf8')
      .then(success => {
        console.log('FILE WRITTEN!', success);
        return value;
      })
      .catch(err => {
        console.log(err.message);
      });
  } else {
    console.log('create dir');
    await RNFS.mkdir(metaPath);
    RNFS.writeFile(path, value, 'utf8')
      .then(success => {
        console.log('FILE WRITTEN!', success);
        return value;
      })
      .catch(err => {
        console.log(err.message);
      });
  }
};

export default SaveFile;
