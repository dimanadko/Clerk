import React from 'react';
import {Button, Text, View} from 'react-native';

const Dashboard = ({navigation}): Node => (
  <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    <Text>Home Screen</Text>
    <Button
      title="Go to StartUp"
      onPress={() => navigation.navigate('StartUp')}
    />
    <Button
      title="Go to SubmitPage"
      onPress={() => navigation.navigate('SubmitPage')}
    />
    <Button
      title="Go to Template Creation"
      onPress={() => navigation.navigate('TemplateCreation')}
    />
  </View>
);

export default Dashboard;
