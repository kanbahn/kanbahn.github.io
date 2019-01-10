import React from 'react'
import FeatureLanes from './FeatureLanes'
import { connect } from 'react-redux'
import { Board } from '../../src-common/entity/Board'
import { StoreState } from '../store/store'
import { UiState } from '../store/uiReducer'

interface BoardStoreProps {
  boards: Board[]
  uiState: UiState
}

type Props = BoardStoreProps

const BoardContainer = (props: Props) => {
  const currentBoard = props.boards.find(board => board.id === props.uiState.activeBoard)

  if (currentBoard) {
    console.log(currentBoard)
    return (
      <FeatureLanes board={currentBoard} />
    )
  } else if (props.boards.length > 0) {
    // Warning: if no current board is set (in UiState) the first board is taken as default (1/2)
    return (
      <FeatureLanes board={props.boards[0]} />
    )
  } else {
    return (
      <p>No boards found, create a new one?</p>
    )
  }
}

const mapStateToProps = (state: StoreState) => {
  return {
    lists: state.lists,
    tasks: state.tasks,
    lanes: state.lanes,
    boards: state.boards,
    uiState: state.ui
  }
}

const mapDispatchToProps = {
}

const ConnectedBoardContainer = connect(mapStateToProps, mapDispatchToProps)(BoardContainer)

export default ConnectedBoardContainer
