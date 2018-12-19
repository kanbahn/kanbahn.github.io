import React, { useEffect, useState } from 'react'
import { Profile } from 'passport'
import styled, { ThemeProvider } from 'styled-components'
import 'reset-css'
import FeatureLane from './components/FeatureLane'
import { getJSON } from './fetch'
import { receiveLists } from './store/listReducer'
import { receiveTasks } from './store/taskReducer'
import { connect } from 'react-redux'
import { Title } from './components/common'
import { useTheme } from './theme'

interface DispatchProps {
  receiveLists: typeof receiveLists
  receiveTasks: typeof receiveTasks
}

type Props = DispatchProps

const App = (props: Props) => {
  const [user, setUser] = useState<Profile | null | undefined>(undefined)
  const { theme, changeTheme } = useTheme('minimal')

  useEffect(() => {
    getJSON('/api/auth/user').then(response => setUser(response.user)).catch(() => undefined)
    getJSON('/api/lists').then(response => props.receiveLists(response.lists)).catch(() => undefined)
    getJSON('/api/tasks').then(response => props.receiveTasks(response.tasks)).catch(() => undefined)
  }, [])

  return (
    <ThemeProvider theme={theme || {}}>
      <Container>
        <Header>
          <Title>Project name</Title>
          <HeaderButtons>
            <a href='#' onClick={changeTheme}>Theme</a>
            <LoginButton user={user} />
          </HeaderButtons>
        </Header>
        <FeatureLane featureName='featureX' />
        <FeatureLane featureName='featureY' />
      </Container>
    </ThemeProvider>
  )
}

const Container = styled.div`
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

const Header = styled.header`
  display: flex;
  justify-content: space-between;
`

const HeaderButtons = styled.div`
  > * {
    margin: 0 5px;
  }
`

const LoginButton = (props: { user?: Profile | null }) => {
  switch (props.user) {
    case undefined:
      return null
    case null:
      return <a href='/api/auth/google'>Sign in</a>
    default:
      return <div>{props.user.displayName} (<a href='/api/auth/logout'>Logout</a>)</div>
  }
}

const mapDispatchToProps = {
  receiveLists,
  receiveTasks,
}

export default connect(undefined, mapDispatchToProps)(App)
