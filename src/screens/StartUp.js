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
import DocumentPicker from 'react-native-document-picker';

const forge = require('node-forge');
import {RSA} from 'react-native-rsa-native';
console.log('RSA', RSA);

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

  handleAddKey = async () => {
    try {
      const res = await DocumentPicker.pick({
        // type: [DocumentPicker.types.images],
      });
      console.log(
        res.uri,
        res.type, // mime type
        res.name,
        res.size,
      );
      this.props.onAddKey({keyAddress: res.uri, keyName: res.name});
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  handleCreateKeyPair = async () => {
    console.log('handleCreateKeyPair');
    console.log(RSA);
    const keys = await RSA.generateKeys(4096);
    const result = {
      privateKey: forge.pki.privateKeyFromPem(keys.private),
      publicKey: forge.pki.publicKeyFromPem(keys.public),
    };
    console.log('result', result);
    return result;
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
          <Text>Сертифікат</Text>
          <Text>{this.props.keyName || 'Необхідно додати'}</Text>
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
        <Button onPress={() => this.handleAddKey()} light>
          <Text>Додати ключі</Text>
        </Button>
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
  keyName: data.keyName,
  keyAddress: data.keyAddress,
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
    onAddKey: ({keyName, keyAddress}) => {
      dispatch({
        type: 'UPDATE_ALL_DATA',
        value: {
          keyName: keyName,
          keyAddress: keyAddress,
        },
      });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(StartUp);
