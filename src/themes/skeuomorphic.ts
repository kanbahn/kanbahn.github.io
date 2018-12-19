import { css } from 'styled-components'
import { Theme } from '../theme'

const colors = {
  white: '#fff',
  lightGray: '#ddd',
  lightGrayBackground: 'linear-gradient(to top left, rgb(243, 243, 243), rgb(250, 250, 250))'
}

const boxShadow = '0 2px 4px rgba(0, 0, 0, .5)'
const borderRadius = '2px'
const borderColor = colors.lightGray

const theme: Theme = {
  name: 'Skeuomorphic',
  boxShadow,
  borderRadius,
  borderColor,
  lane: css`
    background: linear-gradient(to top left, rgb(221, 221, 221), rgb(250, 250, 250));
    box-shadow: ${boxShadow};
    border-radius: ${borderRadius};
  `,
  column: css`
    box-shadow: ${boxShadow};
    background: ${colors.lightGrayBackground};
    border-radius: ${borderRadius};
  `,
  card: css`
    background: linear-gradient(to top left, rgb(255, 246, 196), rgb(252, 247, 221));
    box-shadow: ${boxShadow};
    border-radius: ${borderRadius};
  `,
  menu: css`
    background: ${colors.lightGrayBackground};
  `,
  input: css`
    border: 1px solid ${colors.lightGray};
    background: ${colors.white};
  `,
}

export default theme
