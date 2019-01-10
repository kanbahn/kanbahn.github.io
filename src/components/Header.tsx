import React from 'react'
import styled from 'styled-components'
import Select from 'react-select'
import LoginButton from './LoginButton'
import { Profile } from 'passport'
import { StoreState } from '../store/store'
import { connect } from 'react-redux'
import { Board } from '../../src-common/entity/Board'
import { setActiveBoard, UiState } from '../store/uiReducer'

interface HeaderOwnProps {
  user: Profile | null
}

interface HeaderDispatchProps {
  setActiveBoard: typeof setActiveBoard
}

interface HeaderStoreProps {
  boards: Board[]
  ui: UiState
}

type Props = HeaderStoreProps & HeaderDispatchProps & HeaderOwnProps // { user?: Profile | null }

const Header = (props: Props) => {

  // TODO: use real data from state
  const projectNames = [
    { value: 'project', label: 'ProjectName' },
  ]

  const boardsOptionFormatted = props.boards.map(board => {
    return { value: board.id, label: board.name }
  })

  const handleChange = async (selected: any) => {
    props.setActiveBoard(selected.value)
  }

  const getCurrentBoard = () => {
    return boardsOptionFormatted.find(board => board.value === props.ui.activeBoard)
  }

  return (
    <HeaderContainer>
      <SelectContainer>
        <Select 
          options={projectNames}
          isClearable={false}
          defaultValue={projectNames[0]}
        />
      </SelectContainer>
      <SelectContainer>
        <Select
          options={boardsOptionFormatted}
          isClearable={false}
          value={getCurrentBoard()}
          onChange={handleChange}
        />
      </SelectContainer>
      <LoginButton user={props.user} />
    </HeaderContainer>
  )
}

const HeaderContainer = styled.header`
  display: flex;
  justify-content: left;
`

const SelectContainer = styled.div`
  width: 200px;
  margin-bottom: 8px;
`

const mapStateToProps = (state: StoreState) => {
  return {
    boards: state.boards,
    ui: state.ui
  }
}

const mapDispatchToProps = {
  setActiveBoard
}

const ConnectedHeader = connect(mapStateToProps, mapDispatchToProps)(Header)

export default ConnectedHeader
