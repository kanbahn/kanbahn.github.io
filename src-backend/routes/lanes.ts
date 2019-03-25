import { Request, Response, Router } from 'express'
import { getLanesByUser, createLane, deleteLane, editLane } from '../database/laneQueries'
const router = Router()

router.get('/api/lanes', async (request: Request, response: Response) => {
  if (request.user) {
    const usersLanes = await getLanesByUser(request.user.id)
    response.send({ lanes: usersLanes })
  } else {
    response.send({ lanes: [] })
  }
})

router.post('/api/lanes', async (request: Request, response: Response) => {
  response.send(await createLane(request.body))
})

router.delete('/api/lane/:id', async (request: Request, response: Response) => {
  await deleteLane(Number(request.params.id))
  response.send({})
})

router.patch('/api/lane/:laneId', async (request: Request, response: Response) => {
  response.send(await editLane(Number(request.params.laneId), request.body))
})

export default router
