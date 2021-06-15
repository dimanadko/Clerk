import React from 'react';
import {StyleSheet, View} from 'react-native';
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
  H3,
  Text
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
      // this.props.onAddKey();
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
          <View style={styles.textblock}>
            <H3>Сертифікат</H3>
            <Text>{this.props.keyName || 'Необхідно додати'}</Text>
          </View>
        </Form>
        <View style={styles.item}>
          <Button
            style={styles.itemButton}
            onPress={() => this.handleAddKey()}
            light>
            <Text style={styles.itemButtonText}>Додати ключ</Text>
          </Button>
          <Button
            style={styles.itemButton}
            onPress={() => this.props.onSave(this.state)}
            light>
            <Text style={styles.itemButtonText}>Зберегти</Text>
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textblock: {
    marginVertical: 8,
    marginHorizontal: 8,
    marginLeft: 15,
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 8,
    marginHorizontal: 8,
  },
  itemButton: {
    backgroundColor: '#00A9A5',
    color: '#fff',
    marginLeft: 8,
    padding: 8,
  },
  itemButtonText: {
    color: '#fff',
  },
});

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
    onAddKey: data => {
      if (data) {
        const {keyName, keyAddress} = data;
        dispatch({
          type: 'UPDATE_ALL_DATA',
          value: {
            keyName: keyName,
            keyAddress: keyAddress,
          },
        });
      } else {
        dispatch({
          type: 'UPDATE_ALL_DATA',
          value: {
            keyName: undefined,
            keyAddress: undefined,
          },
        });
      }
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StartUp);
