import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Animated } from 'react-native';

const { width } = Dimensions.get('window');

export default class App extends React.Component {

  state = {
    isVisible: false,
    background: new Animated.Value(0),
    block: new Animated.Value(0),
  }

  onToggleOverlay = (state) => {
    const { background, block } = this.state;
    const opening = state === 'open';

    Animated.parallel([
      Animated.timing(background, {
        toValue: opening ? 1 : 0,
        duration: 400,
      }),

      Animated.timing(block, {
        toValue: opening ? 1 : 0,
        duration: 400,
      }),
    ]).start(() => this.setState({ isVisible: opening }));
  }

  get containerBackground() {
    const { background } = this.state;

    return {
      opacity: background.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
    };
  }

  get containerBlock() {
    const { block } = this.state;

    return {
      opacity: block.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
      transform: [{
        translateY: block.interpolate({
          inputRange: [0, 1],
          outputRange: [40, 0],
        }),
      }],
    };
  }

  render() {
    const { isVisible } = this.state;
    let pointerEvents = 'none';

    if (isVisible) {
      pointerEvents = 'auto';
    }

    return (
      <View style={s.container}>
        <TouchableOpacity onPress={() => this.onToggleOverlay('open')}>
          <Text>Open the overlay</Text>
        </TouchableOpacity>

        <View style={s.container__overlay} pointerEvents={pointerEvents}>
          <Animated.View style={[s.container__block, this.containerBlock]}>
            <TouchableOpacity onPress={() => this.onToggleOverlay('close')}>
              <Text>Close the overlay</Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View style={[s.container__background, this.containerBackground]} />
        </View>
      </View>
    );
  }
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#fff',
  },

  container__overlay: {
    alignItems: 'center',
    justifyContent: 'center',

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

    opacity: 0,

    padding: 10,

    width: width - 40,
    height: 300,

    borderRadius: 6,
    backgroundColor: '#fff',

    transform: [{ translateY: 40 }],
  },

  container__background: {
    position: 'absolute',

    width: '100%',
    height: '100%',

    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
