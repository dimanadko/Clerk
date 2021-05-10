import * as RNFS from 'react-native-fs';

const metaPath = RNFS.DocumentDirectoryPath + '/templates';

const SaveFile = async ({
  name = 'template' + new Date().toISOString(),
  value,
}) => {
  const path = metaPath + '/' + name + '.txt';
  const templatesExist = await RNFS.exists(metaPath);
  if (templatesExist) {
    RNFS.writeFile(path, value, 'utf8')
      .then(success => {
        console.log('FILE WRITTEN!', success);
      })
      .catch(err => {
        console.log(err.message);
      });
  } else {
    await RNFS.mkdir(metaPath);
    RNFS.writeFile(path, value, 'utf8')
      .then(success => {
        console.log('FILE WRITTEN!', success);
      })
      .catch(err => {
        console.log(err.message);
      });
  }
};

export default SaveFile;
