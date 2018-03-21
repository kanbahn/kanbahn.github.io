import React, { Component } from 'react';
import Task from './Task'
import TaskColumn from './TaskColumn'

class FeatureLane extends Component {
  render() {
    const tasks = {
      todoTasks: [
        'Task 7',
        'Task 8',
        'Task 9',
        'Task 10',
        'Task 11',
        'Task 12'
      ],
      inprogressTask: [
        'Task 6'
      ],
      doneTasks: [
        'Task 1',
        'Task 2',
        'Task 3',
        'Task 4 has a very long text to demonstate how different heights behave',
        'Task 5'
      ]
    }

    return (
      <div class="feature-lane">
        <h1 class="text-box">Feature X</h1>
        
        <div class="flex-container">          
          <TaskColumn 
            columnType = 'double'
            columnName = 'Todo'
            tasks = {tasks.todoTasks}
          />
          <TaskColumn 
            columnType = 'single'
            columnName = 'In Progress'
            tasks = {tasks.inprogressTask}
          />
          <TaskColumn 
            columnType = 'double'
            columnName = 'Done'
            tasks = {tasks.doneTasks}
          />
        </div>
      </div>
    )
  }
}

export default FeatureLane