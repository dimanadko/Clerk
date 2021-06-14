import React from 'react';
import {Text, View} from 'react-native';
import {Textarea, Form, Button} from 'native-base';
import SaveFile from '../services/SaveFile';

class TemplateCreation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }
  handleTemplateChange = value => {
    this.setState({value: value});
  };
  handleTemplateDataAdd = (newValue, meta = false) => {
    this.setState(prevState => ({
      value:
        prevState.value + (meta ? '|^~' : '') + newValue + (meta ? '~^| ' : ''),
    }));
  };
  handleSave = async () => {
    console.log('State', this.state);
    await SaveFile({value: this.state.value});
    this.props.navigation.push('Home');
  };
  render() {
    return (
      <View>
        <Form>
          <Textarea
            value={this.state.value}
            onChangeText={this.handleTemplateChange}
            rowSpan={5}
            bordered
            placeholder="Текс Розписки"
          />
        </Form>
        <Button
          light
          onPress={() => {
            this.handleTemplateDataAdd('MyName', true);
          }}>
          <Text>Мій ПІБ</Text>
        </Button>
        <Button
          light
          onPress={() => {
            this.handleTemplateDataAdd('Date', true);
          }}>
          <Text>Дата</Text>
        </Button>
        <Button light onPress={this.handleSave}>
          <Text>Зберегти</Text>
        </Button>
      </View>
    );
  }
}

// ...

export default TemplateCreation;
