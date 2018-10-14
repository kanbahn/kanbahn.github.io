import styled from 'styled-components'
import { borderRadius, boxShadow, lightGrayBackground, hoverBackground } from './common'

export const MenuItem = styled.div`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background: ${hoverBackground};
  }
`

const Menu = styled.div`
  background: ${lightGrayBackground};
  border-radius: ${borderRadius};
  box-shadow: ${boxShadow};
`

export default Menu
