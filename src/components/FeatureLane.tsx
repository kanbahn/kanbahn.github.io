import React, { useState } from 'react'
import TaskColumn, { columnMargin } from './TaskColumn'
import { addList } from '../store/listReducer'
import { deleteLane, editLane } from '../store/laneReducer'
import { taskCreation, moveTask, deleteTask } from '../store/taskReducer'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Task } from '../../src-common/entity/Task'
import { List } from '../../src-common/entity/List'
import { Lane } from '../../src-common/entity/Lane'
import { GradientContainer, Title, transparentButtonStyles } from './common'
import { Plus } from 'react-feather'
import { StoreState } from '../store/store'
import MenuButton from './MenuButton'
import EditableText from './EditableText'
import Menu, { MenuItem } from './Menu'

interface FeatureLaneOwnProps {
  lane: Lane
}

interface FeatureLaneDispatchProps {
  addList: typeof addList
  taskCreation: typeof taskCreation
  moveTask: typeof moveTask
  deleteLane: typeof deleteLane
  editLane: typeof editLane
}

interface TaskById {
  [key: string]: Task
}

interface ListById {
  [key: string]: List
}

interface FeatureLaneStoreProps {
  lists: ListById
  tasks: TaskById
}

type FeatureLaneProps = FeatureLaneOwnProps & FeatureLaneDispatchProps & FeatureLaneStoreProps

const FeatureLane = (props: FeatureLaneProps) => {
  const [renaming, setRenaming] = useState(false)
  const addList = () => props.addList(props.lane.name, props.lane)
  const deleteThisLane = () => props.deleteLane(props.lane.id)
  const { lane, tasks, lists } = props

  const listIds =  Object.keys(lists)

  const lanesTasks = Object.keys(tasks)
    .map(key => tasks[Number(key)])
    .filter(task => listIds.indexOf(task.list.toString()) > -1 )

  const lanesColumns = Object.keys(lists)
    .map(key => lists[Number(key)])
    .filter(list => Number(list.lane) === lane.id);

  console.log(lanesColumns[0])

  const startRenaming = () => {
    setRenaming(true)
  }

  const renameFeature = async (newName: string) => {
    await props.editLane(lane.id, newName)
    setRenaming(false)
  }

  return (
    <GradientContainer>
      <FlexContainerHeader>
        <Title><EditableText text={lane.name} editing={renaming} done={renameFeature}/></Title>
        <MenuButton>
          <Menu>
            <MenuItem onClick={startRenaming}>Rename</MenuItem>
            <MenuItem onClick={deleteThisLane}>Delete</MenuItem>
          </Menu>
        </MenuButton>
      </FlexContainerHeader>
      <FlexContainer>
        {lanesColumns.map(list => (
          <TaskColumn
            key={list.id}
            list={list}
            columnSpan={1}
            laneName={lane.name}
            tasks={lanesTasks.filter(task => task.list === list.id)}
            moveTask={props.moveTask}
          />
        ))}

        <AddColumnButton onClick={addList}>
          <Plus/>
        </AddColumnButton>
      </FlexContainer>
    </GradientContainer>
  )
}

const FlexContainer = styled.div`
  position: relative;
  display: flex;
  box-sizing: border-box;
  flex-wrap: wrap;
`

const FlexContainerHeader = styled.div`
  justify-content: space-between;
  position: relative;
  display: flex;
  box-sizing: border-box;
  flex-wrap: wrap;
`

const AddColumnButton = styled.button`
  ${transparentButtonStyles}
  ${columnMargin};
`

const mapStateToProps = (state: StoreState) => {
  return {
    lists: state.lists,
    tasks: state.tasks
  }
}

const mapDispatchToProps = {
  taskCreation,
  moveTask,
  deleteTask,
  addList,
  deleteLane,
  editLane
}

const ConnectedFeatureLane = connect(mapStateToProps, mapDispatchToProps)(FeatureLane)

export default DragDropContext<FeatureLaneOwnProps>(HTML5Backend)(ConnectedFeatureLane)
