import { getRepository } from 'typeorm'
import { Board } from '../../src-common/entity/Board'

export async function getBoards(userId: string) {
  return await getRepository(Board).find()
  /*return await getRepository(Board)
    .query(
      'SELECT b.* ' +
      'FROM project_owners_user AS o, project AS p, board AS b ' +
      'WHERE o."projectId" = p.id ' +
      'AND o."projectId" = b."projectId" ' +
      'AND o."userGoogleId" = $1'
    , [userId]
    )*/
}

export async function createBoard(board: Board) {
  const boardRepository = getRepository(Board)
  const entity = boardRepository.create(board)
  await boardRepository.insert(entity)
  return entity
}
