import styled, { css } from 'styled-components'

export const gray = '#aaa'

export const lightGrayBackground = 'linear-gradient(to top left, rgb(243, 243, 243), rgb(250, 250, 250))'
export const hoverBackground = 'rgba(0, 0, 0, .05)'

export const defaultMargin = '4px'
export const cardPadding = '10px'
export const borderRadius = '2px'
export const boxShadow = '0 2px 4px rgba(0, 0, 0, .5)'

export const transparentButtonStyles = css`
  background: transparent;
  box-shadow: none;
  border: none;
  border-radius: ${borderRadius};
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
`
