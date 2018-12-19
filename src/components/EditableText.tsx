import React, { useState, Fragment } from 'react'
import OutsideClickHandler from 'react-outside-click-handler'
import styled from 'styled-components'

interface Props {
  text: string
  editing: boolean
  done: (newValue: string) => void
}

const EditableText = (props: Props) => {
  const [text, setText] = useState(props.text)
  const finishEditing = () => props.done(text)
  const onFocus = (event: React.FocusEvent<HTMLInputElement>) => event.target.select()
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => setText(event.target.value)
  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => event.key === 'Enter' && finishEditing()

  if (!props.editing) {
    return <Fragment>{props.text}</Fragment>
  }

  return (
    <OutsideClickHandler onOutsideClick={finishEditing} display='block'>
      <Input
        type='text'
        value={text}
        onChange={onChange}
        onKeyDown={onKeyDown}
        autoFocus={true}
        onFocus={onFocus}
      />
    </OutsideClickHandler>
  )
}

const Input = styled.input`
  outline: none;
  font: inherit;
  color: inherit;
  border-radius: ${props => props.theme.borderRadius};
  text-align: center;
  height: 100%;
  width: 100%;
  padding: 5px;
  box-sizing: border-box;
  ${props => props.theme.input}
`

export default EditableText
