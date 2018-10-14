import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Task } from './Task'

@Entity()
export class Stage {
  @PrimaryGeneratedColumn() id: number
  @Column() name: string
  @Column() lane: string
  @OneToMany(type => Task, task => task.stage) tasks: Task[]
}
