import React, {Component} from 'react';
import {Text, View, FlatList, StyleSheet} from 'react-native';
import {List, ListItem, Icon, Button} from 'native-base';
import GetTemplates from '../services/GetTemplates';
import {connect} from 'react-redux';
import RNShare from 'react-native-share';
// import RNFetchBlob from 'rn-fetch-blob';
import GetDocuments from '../services/GetDocuments';

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

const fileShareOption = {
  type: 'application/octet-stream',
  url:
    'content://com.android.providers.downloads.documents/document/raw%3A%2Fstorage%2Femulated%2F0%2FDownload%2FhelloWorld.txt.p7s',
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

  handleSendFile = () => {
    // const {fs, fetch, wrap} = RNFetchBlob;
    // RNFetchBlob.fs.readFile(fileShareOption.url, 'base64').then(base64Data => {
    //   base64Data = `{fileShareOption.type};base64,` + base64Data;
    //   RNShare.open({url: base64Data});
    // });
    RNShare.open(fileShareOption)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
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
        <Text>Шаблони</Text>
        <FlatList
          style={styles.listContainer}
          data={this.state.templates}
          renderItem={renderItem}
          keyExtractor={item => item.name}
        />
        <Text>Документи</Text>
        <FlatList
          style={styles.listContainer}
          data={this.state.documents}
          renderItem={renderItem}
          keyExtractor={item => item.name}
        />
        <Button
          title="Go to StartUp"
          onPress={() => navigation.navigate('StartUp')}>
          <Text>Go to StartUp</Text>
        </Button>
        {/*<Button*/}
        {/*  title="Go to SubmitPage"*/}
        {/*  onPress={() => navigation.navigate('SubmitPage')}>*/}
        {/*  <Text>Go to SubmitPage</Text>*/}
        {/*</Button>*/}
        <Button onPress={() => navigation.navigate('TemplateCreation')}>
          <Text>TemplateCreation</Text>
        </Button>
        {/*<Button onPress={this.handleSendFile}>*/}
        {/*  <Text>Test</Text>*/}
        {/*</Button>*/}
        {/*<Text>{JSON.stringify(this.props.store)}</Text>*/}
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
