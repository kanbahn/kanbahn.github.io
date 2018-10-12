import { Request, Response, Router } from 'express'
import { getRepository } from 'typeorm'
import { Task } from '../../src-common/entity/Task'

const router = Router()

router.get('/tasks', async (request: Request, response: Response) => {
  const tasksRepository = getRepository(Task)
  const tasks = await tasksRepository.find()
  response.send({ tasks })
})

export default router
