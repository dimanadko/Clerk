import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import RNFS from 'react-native-fs';
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
  render() {
    return (
      <View>
        <Text>{this.state.templateText}</Text>
        <Button light>
          <Text>Заповнити</Text>
        </Button>
        <Button light>
          <Text>Підписати</Text>
        </Button>
      </View>
    );
  }
}

// ...

export default SubmitPage;
