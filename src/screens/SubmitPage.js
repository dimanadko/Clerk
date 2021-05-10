import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
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
      active: false,
    };
  }
  render() {
    return (
      <View>
        <Text>This is some text</Text>
        <Button light>
          <Text>Підписати</Text>
        </Button>
      </View>
    );
  }
}

// ...

export default SubmitPage;
