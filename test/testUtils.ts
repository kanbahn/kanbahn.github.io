import { ReactWrapper } from 'enzyme'

const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const waitInterval = 50

export const waitUntil = async (root: ReactWrapper, condition: () => boolean) => {
  while (!condition()) {
    await sleep(waitInterval)
    root.update()
  }
}

export const repeat = (times: number, fn: (n: number) => Promise<void>) => async () => {
  for (let i = 0; i < times; i++) {
    await fn(i)
  }
}
