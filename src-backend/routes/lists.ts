import { Request, Response, Router } from 'express'
import { getRepository } from 'typeorm'
import { List } from '../../src-common/entity/List'

const router = Router()

router.get('/api/lists', async (request: Request, response: Response) => {
  const listRepository = getRepository(List)
  const lists = await listRepository.find()
  response.send({ lists })
})

router.post('/api/lists', async (request: Request, response: Response) => {
  const listRepository = getRepository(List)
  const entity = listRepository.create(request.body)
  await listRepository.insert(entity)
  response.send(entity)
})

router.patch('/api/lists/:id', async (request: Request, response: Response) => {
  const id = Number(request.params.id)
  const listRepository = getRepository(List)
  const entity = await listRepository.save({ ...request.body, id })
  response.send(entity)
})

router.delete('/api/lists/:id', async (request: Request, response: Response) => {
  const id = Number(request.params.id)
  const listRepository = getRepository(List)
  await listRepository.delete({ id })
  response.send({})
})

export default router
