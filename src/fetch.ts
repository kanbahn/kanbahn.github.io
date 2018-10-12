type HTTPMethod = 'GET' | 'POST'

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
