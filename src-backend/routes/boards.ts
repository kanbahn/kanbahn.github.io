import { Request, Response, Router } from 'express'
import { createBoard, getBoards } from '../database/boardQueries'

const router = Router()

router.get('/api/boards', async (request: Request, response: Response) => {
  response.send({ boards: await getBoards() })
})

router.post('/api/boards', async (request: Request, response: Response) => {
  response.send(await createBoard())
})

export default router
