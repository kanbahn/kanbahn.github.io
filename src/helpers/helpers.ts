interface ObjectWithId {
  id: number
}

interface IdObject {
  [key: string]: any
}

export function arrayToByIdObject(array: ObjectWithId[]): IdObject {
  const obj: IdObject = {}

  array.forEach(item => {
    const key: string = item.id.toString()
    obj[key] = item
  })

  return obj
}
