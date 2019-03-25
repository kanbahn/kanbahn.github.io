import { Request, Response, Router } from 'express'
import { createProject, getUsersProjects } from '../database/projectQueries'

const router = Router()

router.get('/api/projects', async (request: Request, response: Response) => {
  if (request.user) {
    const projects = await getUsersProjects(request.user.id)
    console.log(projects)
    response.send({ projects: projects })
  } else {
    response.send({ projects: [] })
  }
})

router.post('/api/project', async (request: Request, response: Response) => {
  response.send(await createProject(request.body))
})

export default router
