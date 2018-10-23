import React, { Component } from 'react';

import './App.css';

class App extends Component {

  state = {
    isVisible: false,
  }

  onToggleOverlay = () => {
    const { isVisible } = this.state;

    this.setState({ isVisible: !isVisible });
  }

  render() {
    const { isVisible } = this.state;
    const styles = isVisible ? "App__overlay" : "App__overlay App__overlayShow";

    return (
      <div className="App">
        <p onClick={this.onToggleOverlay}>Open the overlay</p>

        <div className={styles}>
          <div className="App__block">
            <p onClick={this.onToggleOverlay}>Close the overlay</p>
          </div>

          <div className="App__background" />
        </div>
      </div>
    );
  }
}

export default App;
