import React from 'react'
import { Provider } from 'react-redux'
import { mount, ReactWrapper } from 'enzyme'
import App from '../src/App'
import { store } from '../src/store/store'
import TaskColumn, { AddCardButton } from '../src/components/TaskColumn'
import { repeat, waitUntil } from './testUtils'
import Card from '../src/components/Card'
import MenuButton from '../src/components/MenuButton'
import { MenuItem } from '../src/components/Menu'

describe('task', async () => {
  let root: ReactWrapper<any>
  const getColumn = () => root.find(TaskColumn).first()

  beforeAll(async () => {
    root = mount(
      <Provider store={store}>
        <App />
      </Provider>
    )
    await waitUntil(root, () => root.find(TaskColumn).length > 0)
  })

  test('can be created', repeat(2, async () => {
    const cardCount = getColumn().find(Card).length
    const button = getColumn().find(AddCardButton)
    button.simulate('click')
    await waitUntil(root, () => getColumn().find(Card).length !== cardCount)
    expect(getColumn().find(Card).length).toEqual(cardCount + 1)
  }))

  test('can be deleted', repeat(2, async () => {
    const cardCount = getColumn().find(Card).length
    const menuButton = getColumn().find(MenuButton).last()
    menuButton.simulate('click')
    getColumn().find(MenuItem).last().simulate('click')
    await waitUntil(root, () => getColumn().find(Card).length !== cardCount)
    expect(getColumn().find(Card).length).toEqual(cardCount - 1)
  }))
})
