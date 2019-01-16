import { Request, Response, Router } from 'express'
import { createBoard, getBoards } from '../database/boardQueries'

const router = Router()

router.get('/api/boards', async (request: Request, response: Response) => {
  if (request.user) {
    response.send({ boards: await getBoards(request.user.id) })
  } else {
    response.send({ boards: [] })
  }
})

router.post('/api/boards', async (request: Request, response: Response) => {
  response.send(await createBoard(request.body))
})

export default router
