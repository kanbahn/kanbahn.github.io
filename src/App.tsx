import * as React from 'react'
import * as PropTypes from 'prop-types'
import './App.css'
import FeatureLane from './components/FeatureLane'
import { getJSON } from './fetch'

class App extends React.Component {
  static contextTypes = {
    store: PropTypes.object
  }

  async componentDidMount() {
    const { tasks } = await getJSON('/api/tasks')
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
