# Kanbahn [![Build Status](https://travis-ci.org/kanbahn/kanbahn.github.io.svg?branch=master)](https://travis-ci.org/kanbahn/kanbahn.github.io)

Kanban-board with multiple lanes. Tasks can be then grouped to different lanes e.g. one feature in one lane.

Preview:
![feature-lane-preview](/img/two-feature-lanes.png)

## Live demo

https://kanbahn.herokuapp.com

## Työaikakirjanpito

[Työaikakirjanpito (Emil)](https://github.com/kanbahn/kanbahn.github.io/wiki/Ty%C3%B6aikakirjanpito-(Emil))

## Installation

- Clone project `git clone git@github.com:kanbahn/kanbahn.github.io.git kanbahn`
- Go to project root `cd kanbahn`
- Install dependencies `npm install`
- Start database
  - start a container with empty database `docker-compose up -d`
    - check `psql "postgres://kanbahner:passwd@localhost:5433/kanbahn_test" -c "\l"`
  - create database schema `psql "postgres://kanbahner:passwd@localhost:5433/kanbahn_test" --file ddl_full.sql`
    - check `psql "postgres://kanbahner:passwd@localhost:5433/kanbahn_test" -c "\dt"`
  - seed the database `psql "postgres://kanbahner:passwd@localhost:5433/kanbahn_test" --file seen-db.sql`
    - check `psql "postgres://kanbahner:passwd@localhost:5433/kanbahn_test" -c "SELECT * FROM public.flatall"`
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
