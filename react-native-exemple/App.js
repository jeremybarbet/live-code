import React from 'react';
import { StyleSheet, View } from 'react-native';

export default class App extends React.Component {

  render() {
    return (
      <View style={s.container}>

      </View>
    );
  }
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
