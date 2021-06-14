import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import RNFS from 'react-native-fs';
// import RNFetchBlob from 'react-native-fetch-blob'
import {
  Container,
  Header,
  Content,
  Textarea,
  Form,
  Item,
  Input,
  Button,
  Label,
  Fab,
} from 'native-base';
import RNShare from 'react-native-share';
import moment from 'moment';
import {connect} from 'react-redux';
import SaveFile from '../services/SaveFile';

const fileShareOption = {
  type: 'application/octet-stream',
  url:
    'content://com.android.providers.downloads.documents/document/raw%3A%2Fstorage%2Femulated%2F0%2FDownload%2FhelloWorld.txt.p7s',
};

class SubmitPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      templateText: '',
    };
  }
  componentDidMount() {
    const {templatePath} = this.props.route.params;
    console.log('templatePath', templatePath);
    RNFS.readFile(templatePath, 'utf8').then(res => {
      console.log('File ' + templatePath, res),
        this.setState({templateText: res});
    });
  }

  handleFillTemplate = () => {
    this.setState(prevState => {
      const result = prevState.templateText
        .replace('|^~MyName~^|', this.props.name)
        .replace('|^~Date~^|', moment().format('dd.mm.yyyy'));
      return {templateText: result};
    });
  };
  //
  // static sharePDFWithAndroid(fileUrl, type) {
  //   let filePath = null;
  //   let file_url_length = fileUrl.length;
  //   const configOptions = {fileCache: true};
  //   RNFetchBlob.config(configOptions)
  //     .fetch('GET', fileUrl)
  //     .then(resp => {
  //       filePath = resp.path();
  //       return resp.readFile('base64');
  //     })
  //     .then(async base64Data => {
  //       base64Data = `data:${type};base64,` + base64Data;
  //       await Share.open({url: base64Data});
  //       // remove the image or pdf from device's storage
  //       await RNFS.unlink(filePath);
  //     });
  // }

  handleSendFile = () => {
    // const {fs, fetch, wrap} = RNFetchBlob;
    // RNFetchBlob.fs.readFile(fileShareOption.url, 'base64').then(base64Data => {
    //   base64Data = `{fileShareOption.type};base64,` + base64Data;
    //   RNShare.open({url: base64Data});
    // });
    SaveFile({value: this.state.templateText, type: 'document'});
    RNShare.open(fileShareOption)
      .then(res => {
        console.log(res);
        this.props.navigation.push('Home');
      })
      .catch(err => {
        err && console.log(err);
        this.props.navigation.push('Home');
      });
  };

  render() {
    return (
      <View>
        <Text>{this.state.templateText}</Text>
        <Button light onPress={this.handleFillTemplate}>
          <Text>Заповнити</Text>
        </Button>
        <Button light onPress={this.handleSendFile}>
          <Text>Підписати</Text>
        </Button>
      </View>
    );
  }
}

const mapStateToProps = ({data}) => ({
  name: data.name + ' ' + data.surname + ' ' + data.patronymic,
});
// ...

export default connect(mapStateToProps)(SubmitPage);
