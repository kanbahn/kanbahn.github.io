import styled from 'styled-components'
import { hoverBackground } from './common'

export const MenuItem = styled.div`
  padding: 10px;
  cursor: pointer;
  & + & {
    border-top: 1px solid ${props => props.theme.borderColor};
  }
  &:hover {
    background: ${hoverBackground};
  }
`

const Menu = styled.div`
  border-radius: ${props => props.theme.borderRadius};
  box-shadow: ${props => props.theme.boxShadow};
  position: relative;
  z-index: 100;
  ${props => props.theme.menu}
`

export default Menu
