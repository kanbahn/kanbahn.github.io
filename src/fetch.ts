import { debounce } from 'lodash'

type HTTPMethod = 'GET' | 'POST' | 'PATCH'

const fetchJSON = (method: HTTPMethod) => async (url: string, body?: object) => {
  const response = await fetch(url, {
    method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })

  return await response.json()
}

export const getJSON = fetchJSON('GET')
export const postJSON = fetchJSON('POST')
export const patchJSON = fetchJSON('PATCH')

export const debouncedPatchJSON = debounce(patchJSON, 1000)