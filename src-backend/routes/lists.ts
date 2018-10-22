import { Request, Response, Router } from 'express'
import { createList, deleteList, getLists, updateList } from '../database/listQueries'

const router = Router()

router.get('/api/lists', async (request: Request, response: Response) => {
  response.send({ lists: await getLists() })
})

router.post('/api/lists', async (request: Request, response: Response) => {
  response.send(await createList(request.body))
})

router.patch('/api/lists/:id', async (request: Request, response: Response) => {
  response.send(await updateList(Number(request.params.id), request.body))
})

router.delete('/api/lists/:id', async (request: Request, response: Response) => {
  await deleteList(Number(request.params.id))
  response.send({})
})

export default router
