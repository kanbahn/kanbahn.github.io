import React, { Component } from 'react';
import './App.css';
import FeatureLane from './components/FeatureLane'

class App extends Component {
  render() {
    const tasks = {
      featureX: {
        todoTasks: [
          'Task 7b',
          'Task 8',
          'Task 9',
          'Task 10',
          'Task 11',
          'Task 12'
        ],
        inprogressTasks: [
          'Task 6'
        ],
        doneTasks: [
          'Task 1',
          'Task 2',
          'Task 3',
          'Task 4 has a very long text to demonstate how different heights behave',
          'Task 5'
        ]
      },
      featureY: {
        todoTasks: [
          'Task 8',
          'Task 9',
          'Task 10'
        ],
        inprogressTasks: [
          'Task 6',
          'Task 7'
        ],
        doneTasks: [
          'Task 1 has some longer text',
          'Task 2',
          'Task 3',
          'Task 4',
          'Task 5'
        ]
      }
    }

    return (
      <div className="root-container">
        <h1 className="text-box">Project name</h1>

        <div className="App">
          <FeatureLane tasks={tasks.featureX} featureName='feature X'/>
          <FeatureLane tasks={tasks.featureY} featureName='feature Y'/>
        </div>

      </div>
    )
  }
}

export default App;
