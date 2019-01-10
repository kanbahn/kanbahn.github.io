import React from 'react'
import { Profile } from 'passport'

const LoginButton = (props: { user?: Profile | null }) => {
  switch (props.user) {
    case undefined:
      return null
    case null:
      return <a style={{ marginLeft: 'auto' }} href='/api/auth/google'>Sign in</a>
    default:
      return <div style={{ marginLeft: 'auto' }}>{props.user.displayName} (<a href='/api/auth/logout'>Logout</a>)</div>
  }
}

export default LoginButton
