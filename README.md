# Kanbahn

Kanban-board with multiple lanes. Tasks can be then grouped to different lanes e.g. one feature in one lane.

Preview:
![feature-lane-preview](/img/two-feature-lanes.png)

## Live demo

https://kanbahn.herokuapp.com

## Installation

- Clone project `git clone git@github.com:kanbahn/kanbahn.github.io.git kanbahn`
- Go to project root `cd kanbahn`
- Install dependencies `npm install`
- Run development server `npm start`
- Open browser [http://localhost:3000/](http://localhost:3000/)
- Run tests `npm test` (the server must be running simultaneously)

## Tech

- TypeScript
- Frontend
  - React+Redux
  - Drag'n'Drop with [React DnD](https://react-dnd.github.io/react-dnd/)
  - styled-components
- Backend/db
  - Express
  - PostgreSQL
  - [TypeORM](http://typeorm.io/#/)

## Development

Nice React Drag'n'Drop tutorial: [https://react-dnd.github.io/react-dnd/docs-tutorial.html](https://react-dnd.github.io/react-dnd/docs-tutorial.html)

## Licence

[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
