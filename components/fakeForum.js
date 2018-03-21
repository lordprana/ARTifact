import React from 'react';
import { Button, View, Text } from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class fakeCamera extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Fake Forum</Text>
        <Button
          title="Go back to camera"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}
