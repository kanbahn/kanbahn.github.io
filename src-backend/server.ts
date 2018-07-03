import * as express from 'express'
import { TaskData } from '../src-common/model'

const app = express()

app.get('/tasks', (req, res) => {
  const tasks: TaskData[] = [
    { title: 'Task 7', id: 7123895348954, position: { lane: 'featurex', column: 'todo' } },
    { title: 'Task 8', id: 9487319478394, position: { lane: 'featurex', column: 'todo' } },
    { title: 'Task 9', id: 7584923593475, position: { lane: 'featurex', column: 'todo' } },
    { title: 'Task 10', id: 4237876189251, position: { lane: 'featurex', column: 'todo' } },
    { title: 'Task 11', id: 4238472368945, position: { lane: 'featurex', column: 'todo' } },
    { title: 'Task 12', id: 8742317834736, position: { lane: 'featurex', column: 'todo' } },
    { title: 'Task 6', id: 7482976342078, position: { lane: 'featurex', column: 'inprogress' } },
    { title: 'Task 8', id: 1234790456454, position: { lane: 'featurey', column: 'todo' } },
  ]

  res.send({ tasks })
})

app.listen(process.env.PORT || 3001)
