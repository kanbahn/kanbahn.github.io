import React from 'react'
import styled from 'styled-components'
import Select from 'react-select'
import LoginButton from './LoginButton'
import { Profile } from 'passport'

const Header = (props: { user?: Profile | null }) => {
  // TODO: use real data from state
  const projectNames = [
    { value: 'project', label: 'ProjectName' },
  ]

  const boards = [
    { value: '1', label: 'Board 1' },
    { value: '2', label: 'Board 2' }
  ]

  return (
    <HeaderContainer>
      <SelectContainer>
        <Select options={projectNames} isClearable={false} defaultValue={projectNames[0]}/>
      </SelectContainer>
      <SelectContainer>
        <Select options={boards} isClearable={false} defaultValue={boards[0]}/>
      </SelectContainer>
      <LoginButton user={props.user} />
    </HeaderContainer>
  )
}

const HeaderContainer = styled.header`
  display: flex;
  justify-content: left;
`

const SelectContainer = styled.div`
  width: 200px;
  margin-bottom: 8px;
`
export default Header
