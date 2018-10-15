import styled from 'styled-components'
import { borderRadius, boxShadow, lightGrayBackground, hoverBackground, lightGray } from './common'

export const MenuItem = styled.div`
  padding: 10px;
  cursor: pointer;
  & + & {
    border-top: 1px solid ${lightGray};
  }
  &:hover {
    background: ${hoverBackground};
  }
`

const Menu = styled.div`
  background: ${lightGrayBackground};
  border-radius: ${borderRadius};
  box-shadow: ${boxShadow};
  position: relative;
  z-index: 100;
`

export default Menu
