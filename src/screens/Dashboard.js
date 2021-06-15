import React, {Component} from 'react';
import {Text, View, FlatList, StyleSheet} from 'react-native';
import {List, ListItem, Icon, Button, H3} from 'native-base';
import GetTemplates from '../services/GetTemplates';
import {connect} from 'react-redux';
import RNShare from 'react-native-share';
import GetDocuments from '../services/GetDocuments';

const TemplateListItem = ({title, onSubscribe, onDelete, path, isDoc}) => {
  return (
    <View style={styles.item}>
      <Text style={styles.itemText}>{title}</Text>
      <Button style={styles.itemButton} light onPress={() => onSubscribe(path)}>
        <Text style={styles.itemButtonText}>
          {isDoc ? 'Переглянути' : 'Заповнити'}
        </Text>
      </Button>
    </View>
  );
};

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      templates: [],
      documents: [],
    };
  }
  componentDidMount() {
    GetTemplates().then(
      res => {
        this.setState({templates: res});
      },
      rej => console.log(rej),
    );
    GetDocuments().then(
      res => {
        this.setState({documents: res});
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
    const renderItemDoc = ({item}) => (
      <TemplateListItem
        title={item.name}
        path={item.path}
        onSubscribe={this.handleTemplateSubscribe}
        isDoc={true}
      />
    );
    const {navigation} = this.props;
    return (
      <View style={styles.mainContainer}>
        <H3>Шаблони</H3>
        <FlatList
          style={styles.listContainer}
          data={this.state.templates}
          renderItem={renderItem}
          keyExtractor={item => item.name}
        />
        <H3>Документи</H3>
        <FlatList
          style={styles.listContainer2}
          data={this.state.documents}
          renderItem={renderItemDoc}
          keyExtractor={item => item.name}
        />
        <View style={styles.bottomBlock}>
          <Button
            light
            style={styles.bottomBlockButton}
            title="Go to StartUp"
            onPress={() => navigation.navigate('StartUp')}>
            <Text style={styles.itemButtonText}>Go to StartUp</Text>
          </Button>
          {/*<Button*/}
          {/*  title="Go to SubmitPage"*/}
          {/*  onPress={() => navigation.navigate('SubmitPage')}>*/}
          {/*  <Text>Go to SubmitPage</Text>*/}
          {/*</Button>*/}
          <Button
            light
            style={styles.bottomBlockButton}
            onPress={() => navigation.navigate('TemplateCreation')}>
            <Text style={styles.itemButtonText}>TemplateCreation</Text>
          </Button>
        </View>
        {/*<Button onPress={this.handleSendFile}>*/}
        {/*  <Text>Test</Text>*/}
        {/*</Button>*/}
        {/*<Text>{JSON.stringify(this.props.store)}</Text>*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 8,
    flex: 1,
    justifyContent: 'center',
  },
  listContainer: {
    height: 200,
    flex: 1,
    // backgroundColor: '#B6C5CE',
  },
  listContainer2: {
    height: 200,
    flex: 1,
    marginBottom: 40,
    // backgroundColor: '#B6C5CE',
  },
  container: {
    flex: 1,
    marginTop: 10,
  },
  itemText: {
    width: '60%',
  },
  itemButton: {
    padding: 8,
    backgroundColor: '#00A9A5',
  },
  itemButtonText: {
    color: '#fff',
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#B6C5CE',
    padding: 20,
    marginVertical: 8,
    // marginHorizontal: 16,
  },
  bottomBlock: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    flexDirection: 'row',
    // marginVertical: 8,
    // marginHorizontal: 8,
  },
  bottomBlockButton: {
    width: '50%',
    marginRight: 10,
    padding: 8,
    backgroundColor: '#00A9A5',
  },
  title: {
    fontSize: 32,
  },
});

const mapStateToProps = store => ({
  store,
});

export default connect(mapStateToProps)(Dashboard);
