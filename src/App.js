import React, { Component } from 'react';
import './App.css';
import Task from './components/Task'
import FeatureLane from './components/FeatureLane'

class App extends Component {
  render() {
    return (
      <div class="root-container">
        <h1 class="text-box">Project name</h1>

        <div className="App">
          <FeatureLane />
        </div>
        
      </div>
    )
  }
}

export default App;
