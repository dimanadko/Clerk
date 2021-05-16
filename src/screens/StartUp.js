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
  Button,
} from 'native-base';
import {connect} from 'react-redux';

class StartUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      surname: props.surname,
      patronymic: props.patronymic,
      privateKey: props.privateKey,
      publicKey: props.publicKey,
    };
  }

  handleFieldChange = field => e => {
    this.setState({[field]: e});
  };

  render() {
    return (
      <View>
        <Form>
          <Item inlineLabel>
            <Label>Ім'я</Label>
            <Input
              value={this.state.name}
              onChangeText={this.handleFieldChange('name')}
            />
          </Item>
          <Item inlineLabel>
            <Label>Прізвище</Label>
            <Input
              value={this.state.surname}
              onChangeText={this.handleFieldChange('surname')}
            />
          </Item>
          <Item inlineLabel>
            <Label>Побатькові</Label>
            <Input
              value={this.state.patronymic}
              onChangeText={this.handleFieldChange('patronymic')}
            />
          </Item>
          <Textarea
            rowSpan={5}
            bordered
            placeholder="Публічний ключ"
            value={this.state.privateKey}
            onChangeText={this.handleFieldChange('privateKey')}
          />
          <Textarea
            rowSpan={5}
            bordered
            placeholder="Приватний ключ"
            value={this.state.publicKey}
            onChangeText={this.handleFieldChange('publicKey')}
          />
        </Form>
        <Button onPress={() => this.props.onSave(this.state)} light>
          <Text>Зберегти</Text>
        </Button>
      </View>
    );
  }
}

// ...

const mapStateToProps = ({data}) => ({
  name: data.name,
  surname: data.surname,
  patronymic: data.patronymic,
  privateKey: data.privateKey,
  publicKey: data.publicKey,
});
const mapDispatchToProps = dispatch => {
  return {
    onSave: ({name, surname, patronymic, privateKey, publicKey}) => {
      console.log('OnSave');
      dispatch({
        type: 'UPDATE_ALL_DATA',
        value: {
          name,
          surname,
          patronymic,
          privateKey,
          publicKey,
        },
      });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(StartUp);
