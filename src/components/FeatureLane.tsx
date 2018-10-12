import * as React from 'react'
import TaskColumn from './TaskColumn'
import { taskCreation, moveTask, StoreState } from '../reducers/taskReducer'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import { connect } from 'react-redux'
import { Task as TaskData } from '../../src-common/entity/Task'

interface FeatureLaneOwnProps {
  featureName: string
}

interface FeatureLaneDispatchProps {
  taskCreation(laneName: string, columnName: string): void
  moveTask(taskId: number, columnName: string): void
}

interface FeatureLaneStoreProps {
  tasks: TaskData[]
}

type FeatureLaneProps = FeatureLaneOwnProps & FeatureLaneDispatchProps & FeatureLaneStoreProps

interface FeatureLaneState {
  featureName: string
}

class FeatureLane extends React.Component<FeatureLaneProps, FeatureLaneState> {
  constructor(props: FeatureLaneProps) {
    super(props)
    this.state = {
      featureName: this.props.featureName
    }
  }

  addTaskToRedux = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const columnName = (event.target as any).name as string
    const laneName = this.props.featureName
    this.props.taskCreation(laneName, columnName)
  }

  moveTask = (toColumn: string) => {
    return (taskId: number) => {
      this.props.moveTask(taskId, toColumn)
    }
  }

  render() {
    console.log(this.props)

    const lanesTasks = this.props.tasks
      .filter(task => task.lane === this.state.featureName.toLowerCase())

    return (
      <div className='feature-lane'>
        <h1 className='text-box'>{this.state.featureName}</h1>

        <div className='flex-container'>
          <TaskColumn
            columnType='double'
            laneName={this.props.featureName}
            columnName='Todo'
            tasks={lanesTasks.filter(task => task.column === 'todo')}
            addNewTask={this.addTaskToRedux}
            moveTask={this.moveTask('todo')}
          />
          <TaskColumn
            columnType='single'
            laneName={this.props.featureName}
            columnName='InProgress'
            tasks={lanesTasks.filter(task => task.column === 'inprogress')}
            addNewTask={this.addTaskToRedux}
            moveTask={this.moveTask('inprogress')}
          />
          <TaskColumn
            columnType='double'
            laneName={this.props.featureName}
            columnName='Done'
            tasks={lanesTasks.filter(task => task.column === 'done')}
            addNewTask={this.addTaskToRedux}
            moveTask={this.moveTask('done')}
          />
        </div>
      <button onClick={this.addTaskToRedux}>Mock button, new task to redux</button>
      </div>
    )
  }
}

const mapStateToProps = (state: StoreState) => {
  return {
    tasks: state.tasks
  }
}

const mapDispatchToProps = {
  taskCreation,
  moveTask
}

const ConnectedFeatureLane = connect<StoreState, FeatureLaneDispatchProps, FeatureLaneOwnProps, StoreState>(
  mapStateToProps,
  mapDispatchToProps
)(FeatureLane)

export default DragDropContext<FeatureLaneOwnProps>(HTML5Backend)(ConnectedFeatureLane)
