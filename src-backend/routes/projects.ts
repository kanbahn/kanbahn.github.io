import { Request, Response, Router } from 'express'
import { getProjects, createProject } from '../database/projectQueries'

const router = Router()

router.get('/api/projects', async (request: Request, response: Response) => {
  response.send({ projects: await getProjects() })
})

router.post('/api/project', async (request: Request, response: Response) => {
  response.send(await createProject(request.body))
})

export default router
