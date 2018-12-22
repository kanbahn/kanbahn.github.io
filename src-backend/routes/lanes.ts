import { Request, Response, Router } from 'express'
import { getLanes, createLane } from '../database/laneQueries'

const router = Router()

router.get('/api/lanes', async (request: Request, response: Response) => {
  response.send({ lanes: await getLanes() })
})

router.post('/api/lanes', async (request: Request, response: Response) => {
  response.send(await createLane(request.body))
})

export default router
