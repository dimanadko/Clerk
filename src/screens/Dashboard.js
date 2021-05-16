import React, {Component} from 'react';
import {Text, View, FlatList, StyleSheet} from 'react-native';
import {List, ListItem, Icon, Button} from 'native-base';
import GetTemplates from '../services/GetTemplates';
import {connect} from 'react-redux';

const TemplateListItem = ({title, onSubscribe, onDelete, path}) => {
  return (
    <View style={styles.item}>
      <Text>{title}</Text>
      <Button light onPress={() => onSubscribe(path)}>
        <Text>Надіслати</Text>
      </Button>
      <Button light onPress={onDelete}>
        <Text>Видалити</Text>
      </Button>
    </View>
  );
};

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      templates: [],
    };
  }
  componentDidMount() {
    GetTemplates().then(
      res => {
        this.setState({templates: res});
      },
      rej => console.log(rej),
    );
  }

  handleTemplateSubscribe = path => {
    this.props.navigation.navigate('SubmitPage', {templatePath: path});
  };

  render() {
    const renderItem = ({item}) => (
      <TemplateListItem
        title={item.name}
        path={item.path}
        onSubscribe={this.handleTemplateSubscribe}
        onDelete={console.log}
      />
    );
    const {navigation} = this.props;
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text>Home Screen</Text>
        <FlatList
          style={styles.listContainer}
          data={this.state.templates}
          renderItem={renderItem}
          keyExtractor={item => item.name}
        />
        <Button
          title="Go to StartUp"
          onPress={() => navigation.navigate('StartUp')}>
          <Text>Go to StartUp</Text>
        </Button>
        <Button
          title="Go to SubmitPage"
          onPress={() => navigation.navigate('SubmitPage')}>
          <Text>Go to SubmitPage</Text>
        </Button>
        <Button onPress={() => navigation.navigate('TemplateCreation')}>
          <Text>TemplateCreation</Text>
        </Button>
        <Text>{JSON.stringify(this.props.store)}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    height: 200,
    flex: 1,
    backgroundColor: '#ff0000',
  },
  container: {
    flex: 1,
    marginTop: 10,
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

const mapStateToProps = store => ({
  store,
});

export default connect(mapStateToProps)(Dashboard);
