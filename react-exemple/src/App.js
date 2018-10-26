import React, { Component } from 'react';
import { TimelineLite } from 'gsap';

import './App.css';

class App extends Component {

  state = {
    isVisible: false,
  }

  onToggleOverlay = (state) => {
    if (state === 'close') {
      return this.timeline.reverse();
    }

    const timeline = new TimelineLite();

    timeline.fromTo(
      '.App__overlay',
      0.2,
      { display: 'none' },
      { display: 'flex' },
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

    this.timeline = timeline;
    return timeline;
  }

  render() {
    return (
      <div className="App">
        <p onClick={() => this.onToggleOverlay('open')}>Open the overlay</p>

        <div className="App__overlay">
          <div className="App__block">
            <p onClick={() => this.onToggleOverlay('close')}>Close the overlay</p>
          </div>

          <div className="App__background" />
        </div>
      </div>
    );
  }
}

export default App;
