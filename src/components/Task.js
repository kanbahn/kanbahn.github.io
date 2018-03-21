import React, { Component } from 'react';

class Task extends Component {
  render() {
    const content = this.props.content
    return (
      <p className="task">{content}</p>
    )
  }
}

export default Task;