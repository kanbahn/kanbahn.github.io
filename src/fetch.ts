import { debounce } from 'lodash'

type HTTPMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE'

const fetchJSON = (method: HTTPMethod) => async (url: string, body?: object) => {
  const response = await fetch(url, {
    method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })

  if (!response.ok) {
    throw Error(`${response.status} ${response.statusText} ${response.url}`)
  }

  return await response.json()
}

export const getJSON = fetchJSON('GET')
export const postJSON = fetchJSON('POST')
export const patchJSON = fetchJSON('PATCH')
export const deleteJSON = fetchJSON('DELETE')

export const debouncedPatchJSON = debounce(patchJSON, 1000)
