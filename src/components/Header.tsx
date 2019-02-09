import React from 'react'
import styled from 'styled-components'
import Select from 'react-select'
import LoginButton from './LoginButton'
import { Profile } from 'passport'
import { StoreState } from '../store/store'
import { connect } from 'react-redux'
import { Board } from '../../src-common/entity/Board'
import { setActiveBoard, UiState, setActiveProject } from '../store/uiReducer'
import { addBoard } from '../store/boardReducer'
import { Project } from '../../src-common/entity/Project'
import { addProject } from '../store/projectReducer'

interface HeaderOwnProps {
  user: Profile | null
}

interface HeaderDispatchProps {
  setActiveProject: typeof setActiveProject
  setActiveBoard: typeof setActiveBoard
  addBoard: typeof addBoard
  addProject: typeof addProject
}

interface HeaderStoreProps {
  projects: Project[]
  boards: Board[]
  ui: UiState
}

type Props = HeaderStoreProps & HeaderDispatchProps & HeaderOwnProps // { user?: Profile | null }

const Header = (props: Props) => {

  const selectFormatBoard = (board: Board | undefined) => {
    return board ? { value: board.id, label: board.name } : undefined
  }

  const selectFormatProject = (project: Project) => {
    return project ? { value: project.id, label: project.name } : undefined
  }

  const handleProjectChange = async (selected: any) => {
    props.setActiveProject(selected.value)
  }

  const handleBoardChange = async (selected: any) => {
    props.setActiveBoard(selected.value)
  }

  const getCurrentBoard = () => {
    const currentBoard = props.boards.find(board => board.id === props.ui.activeBoard)
    // Warning: if no current board is set (in UiState) the first board is taken as default (2/2)
    return currentBoard // ? currentBoard : props.boards.find(board => board.project.id === getCurrentProjectId())
  }

  const getCurrentProject = () => {
    const currentProject = props.projects
      .find(project => project.id === props.ui.activeProject)
    return currentProject ? currentProject : props.projects[0]
  }

  const getCurrentProjectId = () => {
    const project = getCurrentProject()
    return project ? project.id : undefined
  }

  const newBoard = () => {
    const boardName = window.prompt('Create new board', 'Board name')
    if (boardName) {
      props.addBoard( boardName, getCurrentProject())
      // TODO: get the id of newly created board and set it as active i.e. set ui.activeProject
    }
  }

  const newProject = () => {
    const projectName = window.prompt('Create new project', 'Project name')
    if (projectName && props.user) {
      props.addProject( projectName, props.user.id)
    }
  }

  const printProjects = () => {
    console.log(props.projects)
  }

  const projectsLoaded = () => {
    return props.projects.filter(project => project.id === getCurrentProjectId()).length === 1
  }

  const getCurrentBoards = () => {
    if (props.projects.length > 0 && projectsLoaded) {
      const boards = props.boards
        .filter(board => board.project.id === getCurrentProjectId())
        .map(board => selectFormatBoard(board))
      return boards
    } else {
      return undefined
    }
  }

  return (
    <LoginButton user={props.user} />
  )
  /*
  return (
    <HeaderContainer>
      <SelectContainer>
        <Select
          options={props.projects.map(project => selectFormatProject(project))}
          isClearable={false}
          value={selectFormatProject(getCurrentProject())}
          onChange={handleProjectChange}
        />
      </SelectContainer>
      <SelectContainer>
        <Select
          options={getCurrentBoards()}
          isClearable={false}
          value={selectFormatBoard(getCurrentBoard())}
          onChange={handleBoardChange}
        />
      </SelectContainer>
      <button onClick={newBoard}>New Board</button>
      <button onClick={newProject}>New Project</button>
      <button onClick={printProjects}>Show projects</button>
      <LoginButton user={props.user} />
    </HeaderContainer>
  )*/
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
    projects: state.projects,
    boards: state.boards,
    ui: state.ui
  }
}

const mapDispatchToProps = {
  setActiveProject,
  setActiveBoard,
  addBoard,
  addProject
}

const ConnectedHeader = connect(mapStateToProps, mapDispatchToProps)(Header)

export default ConnectedHeader
