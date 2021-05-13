import * as RNFS from 'react-native-fs';

const metaPath = RNFS.DocumentDirectoryPath + '/templates';

const GetTemplates = async () => {
  try {
    const result = await RNFS.readDir(metaPath);
    console.log('Templates', result);
    return result;
  } catch (err) {
    console.log(err.message, err.code);
  }
};

export default GetTemplates;
