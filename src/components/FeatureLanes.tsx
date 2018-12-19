import React from 'react'
import FeatureLane from './FeatureLane'
import { connect } from 'react-redux'
import { Task } from '../../src-common/entity/Task'
import { List } from '../../src-common/entity/List'
import { StoreState } from '../store/store'
import { unique } from '../helpers'
import styled from 'styled-components'
import { GradientContainer, transparentButtonStyles } from './common'
import { addList } from '../store/listReducer'
import { Plus } from 'react-feather'

interface FeatureLanesDispatchProps {
  addList: typeof addList
}

interface FeatureLanesStoreProps {
  lists: List[]
  tasks: Task[]
}

type Props = FeatureLanesDispatchProps & FeatureLanesStoreProps

const FeatureLanes = (props: Props) => {

  const uniqueLanes = unique(props.lists.map(list => list.lane))

  const newLane = () => {
    props.addList('feature' + (uniqueLanes.length + 1))
  }

  return (
    <Container>
      {uniqueLanes.map(lane => (
        <FeatureLane
          key={lane}
          featureName={lane}
        />
      ))}

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
    tasks: state.tasks
  }
}

const mapDispatchToProps = {
  addList
}

const ConnectedFeatureLanes = connect(mapStateToProps, mapDispatchToProps)(FeatureLanes)

export default ConnectedFeatureLanes
