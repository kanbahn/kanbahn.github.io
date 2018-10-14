import * as React from 'react'
import { Profile } from 'passport'
import styled from 'styled-components'
import 'reset-css'
import FeatureLane from './components/FeatureLane'
import { getJSON } from './fetch'
import { receiveTasks } from './reducers/taskReducer'
import { connect } from 'react-redux'
import { Title } from './components/common'

interface DispatchProps {
  receiveTasks: typeof receiveTasks
}

interface State {
  user?: Profile | null
}

type Props = DispatchProps

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {}
  }

  async componentDidMount() {
    getJSON('/api/auth/user').then(({ user }) => {
      this.setState({ user })
    })

    getJSON('/api/tasks').then(({ tasks }) => {
      this.props.receiveTasks(tasks)
    })
  }

  render() {
    const { user } = this.state

    return (
      <Container>
        <Header>
          <Title>Project name</Title>
          <LoginButton user={user} />
        </Header>
        <FeatureLane featureName='featureX'/>
      </Container>
    )
  }
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
  receiveTasks
}

export default connect(undefined, mapDispatchToProps)(App)
