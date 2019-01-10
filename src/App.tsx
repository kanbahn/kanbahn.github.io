import React, { useEffect, useState } from 'react'
import { Profile } from 'passport'
import styled from 'styled-components'
import 'reset-css'
import BoardContainer from './components/BoardContainer'
import { getJSON } from './fetch'
import { receiveLists } from './store/listReducer'
import { receiveTasks } from './store/taskReducer'
import { receiveLanes } from './store/laneReducer'
import { receiveBoards } from './store/boardReducer'
import { addBoard } from './store/boardReducer'
import { connect } from 'react-redux'
import Header from './components/Header'

interface DispatchProps {
  receiveLists: typeof receiveLists
  receiveTasks: typeof receiveTasks
  receiveLanes: typeof receiveLanes
  receiveBoards: typeof receiveBoards
  addBoard: typeof addBoard
}

type Props = DispatchProps

const App = (props: Props) => {
  const [user, setUser] = useState<Profile | null | undefined>(undefined)

  useEffect(() => {
    getJSON('/api/auth/user').then(response => setUser(response.user)).catch(() => undefined)
    getJSON('/api/lists').then(response => props.receiveLists(response.lists)).catch(() => undefined)
    getJSON('/api/tasks').then(response => props.receiveTasks(response.tasks)).catch(() => undefined)
    getJSON('/api/lanes').then(response => props.receiveLanes(response.lanes)).catch(() => undefined)
    getJSON('/api/boards').then(response => props.receiveBoards(response.boards)).catch(() => undefined)
  }, [])

  const newBoard = () => {
    props.addBoard()
  }

  return (
    <BackroundContainer>
      <Header user={user}/>
      <BoardContainer />
      <button onClick={newBoard}>New Board</button>
    </BackroundContainer>
  )
}

const BackroundContainer = styled.div`
  position: relative;
  display: block;
  background: white;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  margin: auto;
  font-family: sans-serif;
  font-size: 14px;
  color: #333333;
`

const mapDispatchToProps = {
  receiveLists,
  receiveTasks,
  receiveLanes,
  receiveBoards,
  addBoard
}

export default connect(undefined, mapDispatchToProps)(App)
