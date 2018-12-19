import styled, { css } from 'styled-components'

export const gray = '#aaa'

export const hoverBackground = 'rgba(0, 0, 0, .05)'

export const defaultMargin = '4px'
export const cardPadding = '10px'

export const transparentButtonStyles = css`
  background: transparent;
  box-shadow: none;
  border: none;
  border-radius: ${props => props.theme.borderRadius};
  color: ${gray};
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  cursor: pointer;
  :hover {
    background: ${hoverBackground};
  }
`

export const Title = styled.h1`
  font-size: 16px;
  margin: 0;
  padding: ${defaultMargin};
  max-height: 100%;
  overflow: hidden;
`
