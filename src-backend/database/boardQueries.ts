import { getRepository } from 'typeorm'
import { Board } from '../../src-common/entity/Board'

export async function getBoards() {
  const boardRepository = getRepository(Board)
  return boardRepository.find()
}

export async function createBoard() {
  const boardRepository = getRepository(Board)
  const entity = boardRepository.create({ name: 'newBoard' })
  await boardRepository.insert(entity)
  return entity
}
