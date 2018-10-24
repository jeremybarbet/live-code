import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default class App extends React.Component {

  state = {
    isVisible: false,
  }

  onToggleOverlay = () => {
    const { isVisible } = this.state;

    this.setState({ isVisible: !isVisible });
  }

  render() {
    const { isVisible } = this.state;
    const overlayStyles = [s.container__overlay];
    let pointerEvents = 'none';

    if (isVisible) {
      overlayStyles.push(s.container__overlayVisible);
      pointerEvents = 'auto';
    }

    return (
      <View style={s.container}>
        <TouchableOpacity onPress={() => this.onToggleOverlay('open')}>
          <Text>Open the overlay</Text>
        </TouchableOpacity>

        <View style={overlayStyles} pointerEvents={pointerEvents}>
          <View style={s.container__block}>
            <TouchableOpacity onPress={() => this.onToggleOverlay('close')}>
              <Text>Close the overlay</Text>
            </TouchableOpacity>
          </View>

          <View style={s.container__background} />
        </View>
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

  container__overlay: {
    alignItems: 'center',
    justifyContent: 'center',

    opacity: 0,

    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },

  container__overlayVisible: {
    opacity: 1,
  },

  container__block: {
    position: 'absolute',
    zIndex: 5,

    padding: 10,

    width: width - 40,
    height: 300,

    borderRadius: 6,
    backgroundColor: '#fff',
  },

  container__background: {
    position: 'absolute',

    width: '100%',
    height: '100%',

    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
