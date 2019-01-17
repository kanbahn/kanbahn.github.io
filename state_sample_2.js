const projects = [
  {
    id: 1,
    name: 'Project 1',
    owners: [
      {
        googleId: 123123,
      }
    ]
  }
]

const owners = [
  {
    userFK: 1,
    projectFK: 1
  },
  {
    userFK: 1,
    projectFK: 2
  }
]

const boards = [
  {
    id: 1,
    name: 'Board 1',
    projectFK: 1
  }
]

const lanes = [
  {
    id: 1,
    name: 'Lane 1',
    boardFK: 1,
    order: 1
  }
]

const columns = [
  {
    id: 1,
    name: 'Todo',
    lane: 1,
    order: 1
  },
  {
    id: 2,
    name: 'In progress',
    lane: 1,
    order: 2
  },
  {
    id: 3,
    name: 'Done',
    lane: 1,
    order: 3
  }
]

const tasks = [
  {
    id: 1,
    text: "create new project",
    columnFK: 1,
    order: 1
  },
  {
    id: 2,
    text: "create new board",
    columnFK: 2,
    order: 1
  },
  {
    id: 3,
    text: "show boards",
    columnFK: 3,
    order: 1
  }
]