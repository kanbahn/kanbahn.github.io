import React from 'react'
import FeatureLane from './FeatureLane'
import { connect } from 'react-redux'
import { Task } from '../../src-common/entity/Task'
import { List } from '../../src-common/entity/List'
import { Lane } from '../../src-common/entity/Lane'
import { Board } from '../../src-common/entity/Board'
import { StoreState } from '../store/store'
import styled from 'styled-components'
import { GradientContainer, transparentButtonStyles } from './common'
import { addList } from '../store/listReducer'
import { addLane } from '../store/laneReducer'
import { Plus } from 'react-feather'

interface FeatureLanesOwnProps {
  board: Board
}

interface FeatureLanesDispatchProps {
  addList: typeof addList
  addLane: typeof addLane
}

interface LaneById {
  [key: string]: Lane
}

interface ListById {
  [key: string]: List
}

interface TaskById {
  [key: string]: Task
}

interface FeatureLanesStoreProps {
  lists: ListById
  tasks: TaskById
  lanes: LaneById
}

type Props = FeatureLanesOwnProps & FeatureLanesDispatchProps & FeatureLanesStoreProps

const FeatureLanes = (props: Props) => {
  const laneIds = Object.keys(props.lanes)
  const newLane = () => {
    console.log(props.lanes.length)
    props.addLane('feature' + (laneIds.length + 1), props.board)
  }

  return (
    <Container>
      {
        laneIds.map(laneId => (
          <FeatureLane
            key={laneId}
            lane={props.lanes[laneId]}
          />
        ))
      }
      <GradientContainer>
        <AddLaneButton onClick={newLane}>
          <Plus/>
        </AddLaneButton>
      </GradientContainer>
    </Container>
  )
}

const Container = styled.div`
`

const AddLaneButton = styled.button`
  width: calc(100% - calc(2 * 4px));
  ${transparentButtonStyles}
  margin: 4px;
`

const mapStateToProps = (state: StoreState) => {
  return {
    lists: state.lists,
    tasks: state.tasks,
    lanes: state.lanes
  }
}

const mapDispatchToProps = {
  addList,
  addLane
}

const ConnectedFeatureLanes = connect(mapStateToProps, mapDispatchToProps)(FeatureLanes)

export default ConnectedFeatureLanes
