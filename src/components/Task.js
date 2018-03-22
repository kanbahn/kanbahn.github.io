import React, { Component } from 'react';

class Task extends Component {
  handleChange = (event) => {
    console.log('changed!')
    console.log(event.target)
  }
  
  render() {
    const content = this.props.content
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