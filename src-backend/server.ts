import 'reflect-metadata'
import 'express-async-errors'
import * as path from 'path'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import tasks from './routes/tasks'
import { connectToDatabase } from './database'

connectToDatabase().then(() => {
  const app = express()
  app.use(bodyParser.json())

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('build'))

    app.get('/', (req, res) => {
      res.sendFile(path.join('build', 'index.html'))
    })
  }

  app.use(tasks)

  app.listen(process.env.PORT || 3001)
}).catch(error => {
  console.log(error)
  process.exit(1)
})
