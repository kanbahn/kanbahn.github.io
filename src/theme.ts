import { useEffect, useState } from 'react'
import { InterpolationValue } from 'styled-components'

const themes = ['skeuomorphic', 'minimal']

export interface Theme {
  name: string
  boxShadow: string
  borderRadius: string
  borderColor: string
  lane: InterpolationValue[]
  column: InterpolationValue[]
  card: InterpolationValue[]
  menu: InterpolationValue[]
  input: InterpolationValue[]
}

export const useTheme = (initialTheme: string) => {
  const [theme, setTheme] = useState(initialTheme)
  const [styles, setStyles] = useState<Theme | undefined>(undefined)

  useEffect(() => {
    import(`./themes/${theme}`).then(exports => setStyles(exports.default))
  }, [theme])

  const changeTheme = () => {
    setTheme(themes[(themes.indexOf(theme) + 1) % themes.length])
  }

  return { theme: styles, changeTheme }
}
