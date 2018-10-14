import * as React from 'react'
import { MoreHorizontal } from 'react-feather'
import OutsideClickHandler from 'react-outside-click-handler'
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

  toggleOpen = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  handleClickOutside = () => {
    this.setState({ isOpen: false })
  }

  render() {
    const { isOpen } = this.state

    return (
      <OutsideClickHandler onOutsideClick={this.handleClickOutside}>
        <Container>
          <MenuIcon size={26} onClick={this.toggleOpen} />
          {isOpen && (
            <ChildrenWrapper>
              {this.props.children}
            </ChildrenWrapper>
          )}
        </Container>
      </OutsideClickHandler>
    )
  }
}

const Container = styled.div`
  position: relative;
`

const ChildrenWrapper = styled.div`
  position: absolute;
`

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
