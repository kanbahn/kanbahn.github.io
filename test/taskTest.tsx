import React from 'react'
import { Provider } from 'react-redux'
import { mount, ReactWrapper } from 'enzyme'
import App from '../src/App'
import { store } from '../src/store/store'

describe('task', async () => {
  let root: ReactWrapper<any>

  beforeAll(async () => {
    root = mount(
      <Provider store={store}>
        <App />
      </Provider>
    )
  })

  test('nothing', () => {
    console.log(root)
    expect(1).toEqual(1)
  })
})
