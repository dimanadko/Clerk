import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
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
      <View style={styles.mainContainer}>
        <Form>
          <Textarea
            style={styles.textAriaItem}
            value={this.state.value}
            onChangeText={this.handleTemplateChange}
            rowSpan={5}
            bordered
            placeholder="Текс Розписки"
          />
        </Form>
        <Button
          light
          style={styles.itemButton}
          onPress={() => {
            this.handleTemplateDataAdd('MyName', true);
          }}>
          <Text style={styles.itemButtonText}>Мій ПІБ</Text>
        </Button>
        <Button
          light
          style={styles.itemButton}
          onPress={() => {
            this.handleTemplateDataAdd('Date', true);
          }}>
          <Text style={styles.itemButtonText}>Дата</Text>
        </Button>
        <Button style={styles.itemButton} light onPress={this.handleSave}>
          <Text style={styles.itemButtonText}>Зберегти</Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 8,
  },
  textblock: {
    marginVertical: 8,
    marginHorizontal: 8,
    marginLeft: 15,
  },
  textAriaItem: {
    // margin: 8,
  },
  buttonsBlock: {
    flex: 1,
    flexDirection: 'column',
    height: 200,
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
    marginTop: 8,
    padding: 8,
    width: 80,
  },
  itemButtonText: {
    color: '#fff',
  },
});

// ...

export default TemplateCreation;
