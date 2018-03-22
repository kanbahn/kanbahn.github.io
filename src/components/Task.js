import React, { Component } from 'react';
import { taskCreation } from '../reducers/taskReducer'

class Task extends Component {
  handleChange = (event) => {
    console.log('changed!')
    console.log(event.target)
  }
  saveChangeToRedux = (event) => {
    event.preventDefault()
    //console.log(event.target.name)
    const columnName = event.target.name
    const laneName = this.props.featureName
    this.context.store.dispatch(
      taskCreation(laneName, columnName)
    )
  }
  render() {
    const content = this.props.content
    console.log(this.props.handleChange)
    return (
      <div className='task'>
        <input
          ref='textInput'
          type='text'
          value={content}
          onChange={this.props.handleChange}
          autoFocus
        />
      </div>
    )
  }
}

export default Task;