import * as React from 'react'
import * as PropTypes from 'prop-types'
import './App.css'
import FeatureLane from './components/FeatureLane'

class App extends React.Component {
  static contextTypes = {
    store: PropTypes.object
  }

  async componentDidMount() {
    const response = await fetch('/tasks')
    const { tasks } = await response.json()
    this.context.store.dispatch({ type: 'RECEIVE-TASKS', tasks })
  }

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
