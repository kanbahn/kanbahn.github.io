import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';

/**
 * Implements the drag source contract.
 */
const cardSource = {
  beginDrag(props) {
    console.log('Begin drag!')
    return {}
  }
};

/**
 * Specifies the props to inject into your component.
 */
function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}



class Task extends Component {

  render() {
    const { isDragging, connectDragSource } = this.props;

    const content = this.props.content
    return connectDragSource(
      <div className='task' 
        style={{
          opacity: isDragging ? 0.5 : 1,
          cursor: 'move'
      }}>
        <textarea
          ref='textInput'
          type='text'
          value={content}
          onChange={this.props.handleChange}
          autoFocus
          wrap="soft"
        />
      </div>
    )
  }
}

Task.propTypes = {
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired
}

export default DragSource('task', cardSource, collect)(Task);