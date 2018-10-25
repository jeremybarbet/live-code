# React-native

### 1. Create-react-app

```
expo init react-native-exemple
```

### 2. Layout

The base

```jsx
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default class App extends React.Component {

  render() {
    return (
      <View style={s.container}>
        <TouchableOpacity>
          <Text>Open the overlay</Text>
        </TouchableOpacity>

        <View style={s.container__overlay}>
          <View style={s.container__block}>
            <TouchableOpacity>
              <Text>Close the overlay</Text>
            </TouchableOpacity>
          </View>

          <View style={s.container__background} />
        </View>
      </View>
    );
  }
}
```

Let's style this

```jsx
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
```

### 3. Toggle overlay

Let's add a onclick function to show and hide the overlay

```diff
-  <TouchableOpacity>
+  <TouchableOpacity onPress={this.onToggleOverlay}>
    <Text>Open the overlay</Text>
  </TouchableOpacity>

  <View style={s.container__overlay}>
    <View style={s.container__block}>
-      <TouchableOpacity>
+      <TouchableOpacity onPress={this.onToggleOverlay}>
        <Text>Close the overlay</Text>
      </TouchableOpacity>
    </View>
```

### 4. The function

Let's create a state to manage this overlay displa

```jsx
state = {
  isVisible: false,
}

onToggleOverlay = () => {
  const { isVisible } = this.state;

  this.setState({ isVisible: !isVisible });
}
```

### 5. Conditional style

Now we have to say when we want to display the overlay or not

```diff
render() {
+  const { isVisible } = this.state;
+  const overlayStyles = [s.container__overlay];

+  let pointerEvents = 'none';

+  if (isVisible) {
+    overlayStyles.push(s.container__overlayVisible);
+    pointerEvents = 'auto';
+  }

  return (
    <View style={s.container}>
      <TouchableOpacity onPress={() => this.onToggleOverlay('open')}>
        <Text>Open the overlay</Text>
      </TouchableOpacity>

-      <View style={s.container__overlay}>
+      <View style={overlayStyles} pointerEvents={pointerEvents}>

  ...
}
```

First step done, let's animate now!

### 6. Create the animation

Crate initial animated values

```diff
-import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
+ import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Animated } from 'react-native';

export default class App extends React.Component {

  state = {
    isVisible: false,
+    background: new Animated.Value(0),
+    block: new Animated.Value(0),
  }

  onToggleOverlay = () => {
-    const { isVisible } = this.state;
+    const { isVisible, background, block } = this.state;

     this.setState({ isVisible: !isVisible });

+    Animated.parallel([
+       Animated.timing(background, {
+        toValue: 1,
+        duration: 400,
+      }),
+
+      Animated.timing(block, {
+        toValue: 1,
+        duration: 400,
+      }),
+    ]).start();
  }

+  get containerBackground() {
+    const { background } = this.state;
+
+    return {
+      opacity: background.interpolate({
+        inputRange: [0, 1],
+        outputRange: [0, 1],
+      }),
+    };
+  }

+  get containerBlock() {
+    const { block } = this.state;
+
+    return {
+      opacity: block.interpolate({
+        inputRange: [0, 1],
+        outputRange: [0, 1],
+      }),
+      transform: [{
+        translateY: block.interpolate({
+          inputRange: [0, 1],
+          outputRange: [40, 0],
+        }),
+      }],
+    };
+  }

  render() {
    const { isVisible } = this.state;
-    const overlayStyles = [s.container__overlay];
    let pointerEvents = 'none';

    if (isVisible) {
-      overlayStyles.push(s.container__overlayVisible);
      pointerEvents = 'auto';
    }

    return (
      <View style={s.container}>
        <TouchableOpacity onPress={() => this.onToggleOverlay('open')}>
          <Text>Open the overlay</Text>
        </TouchableOpacity>

-        <View style={overlayStyles} pointerEvents={pointerEvents}>
+        <View style={s.container__overlay} pointerEvents={pointerEvents}>
-          <View style={s.container__block}>
+          <Animated.View style={[s.container__block, this.containerBlock]}>
            <TouchableOpacity onPress={() => this.onToggleOverlay('close')}>
              <Text>Close the overlay</Text>
            </TouchableOpacity>
-          </View>
+          </Animated.View>

-          <View style={s.container__background} />
+          <Animated.View style={[s.container__background, this.containerBackground]} />
        </View>
      </View>
    );
  ...
}

container__overlay: {
  alignItems: 'center',
  justifyContent: 'center',

-  opacity: 0,
  ...
},

container__block: {
  position: 'absolute',
  zIndex: 5,

+  opacity: 0,

  ...

+  transform: [{ translateY: 40 }],
}

```

### 7. Reverse to hide the overlay

Let's reverse the animation now

```diff
-  onToggleOverlay = () => {
+  onToggleOverlay = (state) => {
    const { isVisible, background, block } = this.state;
+    const opening = state === 'opening';

-    this.setState({ isVisible: !isVisible });

    Animated.parallel([
       Animated.timing(background, {
-        toValue: 1,
+        toValue: opening ? 1 : 0,
        duration: 400,
      }),

      Animated.timing(block, {
-        toValue: 1,
+        toValue: opening ? 1 : 0,
        duration: 400,
      }),
-    ]).start();
+    ]).start(() => this.setState({ isVisible: !opening }));
  }
```

### 8. Voilà!
