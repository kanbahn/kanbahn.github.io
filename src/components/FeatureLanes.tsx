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

interface FeatureLanesStoreProps {
  lists: List[]
  tasks: Task[]
  lanes: Lane[]
}

type Props = FeatureLanesOwnProps & FeatureLanesDispatchProps & FeatureLanesStoreProps

const FeatureLanes = (props: Props) => {
  const newLane = () => {
    props.addLane('feature' + props.lanes.length, props.board)
  }

  return (
    <Container>
      {props.lanes
        .filter(lane => lane.board.id === props.board.id)
        .map(lane => (
          <FeatureLane
            key={lane.name}
            lane={lane}
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
