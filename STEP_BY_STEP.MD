# Live coding

## React

### 1. Create-react-app

```
npx create-react-app react-exemple
```

### 2. Layout

The HTML base

```jsx
<div className="App">
  <p>Open the overlay</p>

  <div className="App__overlay">
    <div className="App__block">
      <p>Close the overlay</p>
    </div>

    <div className="App__background" />
  </div>
</div>
```

Let's style this

```css
.App {
  text-align: center;
}

.App__overlay {
  display: flex;
  align-items: center;
  justify-content: center;

  opacity: 0;
  pointer-events: none;

  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.App__overlayShow {
  opacity: 1;
  pointer-events: all;
}

.App__block {
  position: absolute;
  z-index: 5;

  width: 400px;
  height: 300px;

  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  background-color: #fff;
}

.App__background {
  position: absolute;

  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.5);
}
```

### 3. Toggle overlay

Let's add a onclick function to show and hide the overlay

```diff
<div className="App">
-  <p>Open the overlay</p>
+  <p onClick={this.onToggleOverlay}>Open the overlay</p>

  <div className="App__overlay">
    <div className="App__block">
-      <p>Close the overlay</p>
+      <p onClick={this.onToggleOverlay}>Close the overlay</p>
    </div>

    <div className="App__background" />
  </div>
</div>
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
+  const styles = isVisible ? "App__overlay" : "App__overlay App__overlayShow";

  return (
    <div className="App">
      <p onClick={this.onToggleOverlay}>Open the overlay</p>

-      <div className="App__overlay">
+      <div className={styles}>
  ...
}
```

First step done, let's animate now!

### 6. Create the animation

Let's add gsap that will help us to create the animation

```diff
import React, { Component } from 'react';
+ import { TimelineLite } from 'gsap';

...
```

Let's tweak the toggle function

```diff
onToggleOverlay = () => {
-  const { isVisible } = this.state;

-  this.setState({ isVisible: !isVisible });

+  const timeline = new TimelineLite();

+  timeline.fromTo(
+    '.App__overlay',
+    0,
+    { display: 'none', pointerEvents: 'none' },
+    { display: 'flex', pointerEvents: 'all' },
+  );

+  timeline.fromTo(
+    '.App__background',
+    0.4,
+    { opacity: 0 },
+    { opacity: 1 },
+  );

+  timeline.fromTo(
+    '.App__block',
+    0.4,
+    { opacity: 0 },
+    { opacity: 1, y: 0 },
+    '-=0.25',
+  );
}
```

Let's tweak the styles file

```diff
.App__overlay {
-  display: flex;
+  display: none;
  align-items: center;

- opacity: 0;
- pointer-events: none;

  ...
}

- .App__overlayShow {
-  opacity: 1;
-  pointer-events: all;
- }

.App__block {
  position: absolute;
  z-index: 5;

+  opacity: 0;

  ...

  background-color: #fff;

+  transform: translateY(40px);
}

.App__background {
  position: absolute;

+  opacity: 0;
}

```

### 7. Reverse to hide the overlay

```diff
- onToggleOverlay = () => {
+ onToggleOverlay = (state) => {
+  if (state === 'close') {
+    return this.timeline.reverse();
+  }

  const timeline = new TimelineLite();

  timeline.fromTo(
    '.App__overlay',
    0,
    { display: 'none', pointerEvents: 'none' },
    { display: 'flex', pointerEvents: 'all' },
  );

  timeline.fromTo(
    '.App__background',
    0.4,
    { opacity: 0 },
    { opacity: 1 },
  );

  timeline.fromTo(
    '.App__block',
    0.4,
    { opacity: 0 },
    { opacity: 1, y: 0 },
    '-=0.25',
  );

+  return this.timeline = timeline;
}

render() {
-  const { isVisible } = this.state;
-  const styles = isVisible ? "App__overlay" : "App__overlay App__overlayShow";

  return (
    <div className="App">
      <p onClick={() => this.onToggleOverlay('open')}>Open the overlay</p>

-      <div className="App__overlay">
+      <div className={styles}>
...
```


### 8. Voilà!

---

## React Native
