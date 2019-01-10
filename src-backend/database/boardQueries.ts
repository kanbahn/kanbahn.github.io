import { getRepository } from 'typeorm'
import { Board } from '../../src-common/entity/Board'

export async function getBoards() {
  const boardRepository = getRepository(Board)
  return boardRepository.find()
}

export async function createBoard(board: Board) {
  const boardRepository = getRepository(Board)
  const entity = boardRepository.create(board)
  await boardRepository.insert(entity)
  return entity
}
