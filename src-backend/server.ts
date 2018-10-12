import 'reflect-metadata'
import 'express-async-errors'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import tasks from './routes/tasks'
import { connectToDatabase } from './database'

connectToDatabase().then(() => {
  const app = express()
  app.use(bodyParser.json())
  app.use(tasks)
  app.listen(process.env.PORT || 3001)
}).catch(error => {
  console.log(error)
  process.exit(1)
})
