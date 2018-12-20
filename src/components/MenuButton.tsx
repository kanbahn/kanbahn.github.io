import React, { useState } from 'react'
import { MoreHorizontal } from 'react-feather'
import OutsideClickHandler from 'react-outside-click-handler'
import styled from 'styled-components'
import { gray, defaultMargin } from './common'

const MenuButton = (props: {children: any}) => {
  const [isOpen, setOpen] = useState(false)
  const toggleOpen = () => setOpen(!isOpen)
  const close = () => setOpen(false)

  return (
    <Container onClick={toggleOpen}>
      <OutsideClickHandler onOutsideClick={close}>
        <MenuIcon>
          <MoreHorizontal size={26}/>
        </MenuIcon>
        {isOpen && (
          <ChildrenWrapper>
            {props.children}
          </ChildrenWrapper>
        )}
      </OutsideClickHandler>
    </Container>
  )
}

export const menuButtonSize = '40px'

const Container = styled.div`
  position: absolute;
  right: 0;
  top: 0;
`

const ChildrenWrapper = styled.div`
  position: absolute;
  right: ${defaultMargin};
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
