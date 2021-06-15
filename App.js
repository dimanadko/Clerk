/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {Provider, connect} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import type {Node} from 'react';
import {StyleSheet, useColorScheme} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import StartUp from './src/screens/StartUp';
import TemplateCreation from './src/screens/TemplateCreation';
import Dashboard from './src/screens/Dashboard';
import SubmitPage from './src/screens/SubmitPage';
import * as RNFS from 'react-native-fs';
import SaveFile from './src/services/SaveFile';
import GetTemplates from './src/services/GetTemplates';
import {rootReducer} from './src/reducers';
import {persistor, store} from './src/store/store';
//readDir(dirpath: string)
import os from 'react-native-os';
const Stack = createStackNavigator();

const path = RNFS.DocumentDirectoryPath + '/test1.txt';

// persist config

const App: () => Node = () => {
  useEffect(() => {
    console.log(os.platform());
    // SaveFile({name: 'test', value: 'This is test value1'});
    // SaveFile({name: 'test2', value: 'This is test value2'});
    // RNFS.readDir(RNFS.DocumentDirectoryPath)
    //   .then(result => {
    //     console.log('GOT RESULT', result);
    //
    //     // stat the first file
    //     return Promise.all([RNFS.stat(result[0].path), result[0].path]);
    //   })
    //   .then(statResult => {
    //     if (statResult[0].isFile()) {
    //       // if we have a file, read it
    //       return RNFS.readFile(statResult[1], 'utf8');
    //     }
    //
    //     return 'no file';
    //   })
    //   .then(contents => {
    //     // log the file contents
    //     console.log(contents);
    //   })
    //   .catch(err => {
    //     console.log(err.message, err.code);
    //   });
  }, []);
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Dashboard} />
            <Stack.Screen name="SubmitPage" component={SubmitPage} />
            <Stack.Screen name="StartUp" component={StartUp} />
            <Stack.Screen
              name="TemplateCreation"
              component={TemplateCreation}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
