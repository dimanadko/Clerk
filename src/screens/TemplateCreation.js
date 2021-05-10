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

class TemplateCreation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
  }
  render() {
    return (
      <View>
        <Form>
          <Textarea rowSpan={5} bordered placeholder="Текс Розписки" />
        </Form>
        <Button light>
          <Text>Мій ПІБ</Text>
        </Button>
        <Button light>
          <Text>ПІБ контрагента</Text>
        </Button>
        <Button light>
          <Text>Дата</Text>
        </Button>
        <Button light>
          <Text>Зберегти</Text>
        </Button>
      </View>
    );
  }
}

// ...

export default TemplateCreation;
