import { Column, Entity, OneToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Task } from './Task'
import { Lane } from './Lane'

@Entity()
export class List {
  @PrimaryGeneratedColumn() id: number
  @Column() name: string
  @Column() lane: string
  @OneToMany(type => Task, task => task.list) tasks: Task[]
  @ManyToOne(type => Lane, lane => lane.lists, { eager: true, onDelete: 'CASCADE', nullable: true }) laneId: Lane
}
