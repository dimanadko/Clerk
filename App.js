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
// import configureStore from './src/store/store';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import {combineReducers, createStore} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';

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
//readDir(dirpath: string)

// const {store, persistor} = configureStore();

const Stack = createStackNavigator();

const path = RNFS.DocumentDirectoryPath + '/test1.txt';

const defaultState = {
  name: undefined,
  surname: undefined,
  patronymic: undefined,
  privateKey: undefined,
  publicKey: undefined,
};

const rootReducer = combineReducers({
  data: (state = defaultState, action = {}) => {
    switch (action.type) {
      case 'UPDATE_DATA':
        return {
          ...state,
          [action.field]: action.value,
        };
      case 'UPDATE_ALL_DATA':
        return {
          ...state,
          ...action.value,
        };
      default:
        return state;
    }
  },
});

// persist config
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  debug: true,
  stateReconciler: autoMergeLevel2,
};
// wrap persist API around root reducer and store
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);

const App: () => Node = () => {
  useEffect(() => {
    SaveFile({name: 'test', value: 'This is test value1'});
    SaveFile({name: 'test2', value: 'This is test value2'});

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
