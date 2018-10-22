import { Request, Response, Router } from 'express'
import { createTask, deleteTask, getTasks, updateTask } from '../database/taskQueries'

const router = Router()

router.get('/api/tasks', async (request: Request, response: Response) => {
  response.send({ tasks: await getTasks() })
})

router.post('/api/tasks', async (request: Request, response: Response) => {
  response.send(await createTask(request.body))
})

router.patch('/api/tasks/:id', async (request: Request, response: Response) => {
  response.send(await updateTask(Number(request.params.id), request.body))
})

router.delete('/api/tasks/:id', async (request: Request, response: Response) => {
  await deleteTask(Number(request.params.id))
  response.send({})
})

export default router
