import React from 'react'
import FeatureLanes from './FeatureLanes'
import { connect } from 'react-redux'
import { Board } from '../../src-common/entity/Board'
import { StoreState } from '../store/store'

interface BoardStoreProps {
  boards: Board[]
}

type Props = BoardStoreProps

const BoardView = (props: Props) => {
  const currentBoard = props.boards.find(board => board.id === 1)

  if (currentBoard) {
    return (
      <FeatureLanes board={currentBoard} />
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
    boards: state.boards
  }
}

const mapDispatchToProps = {
}

const ConnectedBoard = connect(mapStateToProps, mapDispatchToProps)(BoardView)

export default ConnectedBoard
