import { css } from 'styled-components'
import { Theme } from '../theme'

const colors = {
  white: '#fff',
  lightGray: '#e6e6e6',
  lightGrayBackground: '#f4f4f4',
}

const boxShadow = '0 1px 4px rgba(0, 0, 0, .3)'
const borderRadius = '3px'
const borderColor = colors.lightGray

const theme: Theme = {
  name: 'Minimal',
  boxShadow,
  borderRadius,
  borderColor,
  lane: css`
    border-top: 1px solid ${borderColor};
  `,
  column: css``,
  card: css`
    border: 1px solid ${borderColor};
    border-radius: ${borderRadius};
  `,
  menu: css`
    border-radius: ${borderRadius};
    background: white;
  `,
  input: css`
    border: none;
    background: ${colors.lightGrayBackground};
  `
}

export default theme
