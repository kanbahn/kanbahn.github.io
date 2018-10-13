import * as React from 'react'
import { Profile } from 'passport'
import * as PropTypes from 'prop-types'
import 'reset-css'
import './App.css'
import FeatureLane from './components/FeatureLane'
import { getJSON } from './fetch'

interface State {
  user?: Profile | null
}

class App extends React.Component<{}, State> {
  static contextTypes = {
    store: PropTypes.object
  }

  constructor(props: {}) {
    super(props)
    this.state = {}
  }

  async componentDidMount() {
    getJSON('/api/auth/user').then(({ user }) => {
      this.setState({ user })
    })

    getJSON('/api/tasks').then(({ tasks }) => {
      this.context.store.dispatch({ type: 'RECEIVE-TASKS', tasks })
    })
  }

  render() {
    const { user } = this.state

    return (
      <div className='root-container'>
        <header className='app-header'>
          <h1 className='text-box'>Project name</h1>
          <LoginButton user={user} />
        </header>

        <div className='App'>
          <FeatureLane featureName='featureX'/>
        </div>
      </div>
    )
  }
}

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

export default App
