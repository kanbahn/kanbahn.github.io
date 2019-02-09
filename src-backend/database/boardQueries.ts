import { getRepository, getConnection } from 'typeorm'
import { Board } from '../../src-common/entity/Board'
const sql = require('yesql')('./src-backend/database/sql/',  {type: 'pg'})

export async function getBoards(userId: string) {
  return await getRepository(Board).find()
}

export async function getBoardsByUser(userId: string) {
  return await getConnection()
    .query(
      sql.getBoardsByUser().text,
      [userId]
    )
}

export async function createBoard(board: Board) {
  const boardRepository = getRepository(Board)
  const entity = boardRepository.create(board)
  await boardRepository.insert(entity)
  return entity
}
