import React from 'react'
import FeatureLane from './FeatureLane'
import { connect } from 'react-redux'
import { Task } from '../../src-common/entity/Task'
import { List } from '../../src-common/entity/List'
import { StoreState } from '../store/store'
import { unique } from '../helpers'

interface FeatureLanesStoreProps {
  lists: List[]
  tasks: Task[]
}

const FeatureLanes = (props: FeatureLanesStoreProps) => {

  const uniqueLanes = unique(props.tasks.map(task => task.list.lane))

  return (
    <div>
      {uniqueLanes.map(lane => (
        <FeatureLane
          key={lane}
          featureName={lane}
        />
      ))}
    </div>
  )
}

const mapStateToProps = (state: StoreState) => {
  return {
    lists: state.lists,
    tasks: state.tasks
  }
}

const ConnectedFeatureLanes = connect(mapStateToProps, undefined)(FeatureLanes)

export default ConnectedFeatureLanes
