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
  Label,
} from 'native-base';

class StartUp extends React.Component {
  render() {
    return (
      <View>
        <Form>
          <Item inlineLabel>
            <Label>Ім'я</Label>
            <Input />
          </Item>
          <Item inlineLabel>
            <Label>Прізвище</Label>
            <Input />
          </Item>
          <Item inlineLabel>
            <Label>Побатькові</Label>
            <Input />
          </Item>
          <Textarea rowSpan={5} bordered placeholder="Публічний ключ" />
          <Textarea rowSpan={5} bordered placeholder="Приватний ключ" />
        </Form>
      </View>
    );
  }
}

// ...

export default StartUp;
