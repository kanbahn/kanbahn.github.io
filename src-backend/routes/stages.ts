import { Request, Response, Router } from 'express'
import { getRepository } from 'typeorm'
import { Stage } from '../../src-common/entity/Stage'

const router = Router()

router.get('/api/stages', async (request: Request, response: Response) => {
  const stageRepository = getRepository(Stage)
  const stages = await stageRepository.find()
  response.send({ stages })
})

router.post('/api/stages', async (request: Request, response: Response) => {
  const stageRepository = getRepository(Stage)
  const entity = stageRepository.create(request.body)
  await stageRepository.insert(entity)
  response.send(entity)
})

export default router
