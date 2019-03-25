import { Request, Response, Router } from 'express'
import { createTask, deleteTask, getTasksByUser, updateTask } from '../database/taskQueries'

const router = Router()

router.get('/api/tasks', async (request: Request, response: Response) => {
  if (request.user) {
    const usersTasks = await getTasksByUser(request.user.id)
    console.log('usersTasks', usersTasks)
    response.send({ tasks: usersTasks })
  } else {
    response.send({ tasks: [] })
  }
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
