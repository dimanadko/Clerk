import * as RNFS from 'react-native-fs';

const metaPath = RNFS.DocumentDirectoryPath + '/documents';

const GetDocuments = async () => {
  try {
    const result = await RNFS.readDir(metaPath);
    console.log('documents', result);
    // result.forEach(el => RNFS.unlink(el.path));
    return result;
  } catch (err) {
    console.log(err.message, err.code);
  }
};

export default GetDocuments;
