import * as React from 'react'
import { MoreHorizontal } from 'react-feather'
import styled from 'styled-components'
import { cardPadding, gray } from './common'

interface State {
  isOpen: boolean
}

class MenuButton extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props)
    this.state = {
      isOpen: false
    }
  }

  render() {
    return (
      <>
        <MenuIcon size={26}/>
      </>
    )
  }
}

export const MenuIcon = styled(MoreHorizontal)`
  cursor: pointer;
  color: ${gray};
  padding: 4px 8px;
  margin-right: -${cardPadding};
  margin-top: -${cardPadding};

  &:hover {
    color: inherit;
  }
`

export default MenuButton
