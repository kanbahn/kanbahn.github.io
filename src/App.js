import React, { Component } from 'react'
import './App.css'
import FeatureLane from './components/FeatureLane'

class App extends Component {
  render() {
    return (
      <div className='root-container'>
        <h1 className='text-box'>Project name</h1>

        <div className='App'>
          <FeatureLane featureName='featureX'/>
        </div>

      </div>
    )
  }
}

export default App
