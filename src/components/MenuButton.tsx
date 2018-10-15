import * as React from 'react'
import { MoreHorizontal } from 'react-feather'
import OutsideClickHandler from 'react-outside-click-handler'
import styled from 'styled-components'
import { gray } from './common'

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

  toggleOpen = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  handleClickOutside = () => {
    this.setState({ isOpen: false })
  }

  render() {
    const { isOpen } = this.state

    return (
      <Container onClick={this.toggleOpen}>
        <OutsideClickHandler onOutsideClick={this.handleClickOutside}>
          <MenuIcon>
            <MoreHorizontal size={26}/>
          </MenuIcon>
          {isOpen && (
            <ChildrenWrapper>
              {this.props.children}
            </ChildrenWrapper>
          )}
        </OutsideClickHandler>
      </Container>
    )
  }
}

export const menuButtonSize = '40px'

const Container = styled.div`
  position: absolute;
  right: 0;
  top: 0;
`

const ChildrenWrapper = styled.div`
  position: absolute;
`

export const MenuIcon = styled.div`
  cursor: pointer;
  width: ${menuButtonSize};
  height: ${menuButtonSize};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${gray};

  &:hover {
    color: inherit;
  }
`

export default MenuButton
