import React from 'react'
import OutsideClickHandler from 'react-outside-click-handler'
import styled from 'styled-components'
import { borderRadius, lightGray } from './common'

interface Props {
  text: string
  editing: boolean
  done: (newValue: string) => void
}

interface State {
  value: string
}

class EditableText extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      value: props.text
    }
  }

  onFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.select()
  }

  onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: event.target.value })
  }

  onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      this.props.done(this.state.value)
    }
  }

  onOutsideClick = () => {
    this.props.done(this.state.value)
  }

  render() {
    const { text, editing } = this.props
    const { value } = this.state

    if (!editing) {
      return text
    }

    return (
      <OutsideClickHandler onOutsideClick={this.onOutsideClick} display='block'>
        <Input
          type='text'
          value={value}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          autoFocus={true}
          onFocus={this.onFocus}
        />
      </OutsideClickHandler>
    )
  }
}

const Input = styled.input`
  outline: none;
  font: inherit;
  color: inherit;
  border: 1px solid ${lightGray};
  border-radius: ${borderRadius};
  text-align: center;
  height: 100%;
  width: 100%;
  padding: 5px;
  box-sizing: border-box;
`

export default EditableText
