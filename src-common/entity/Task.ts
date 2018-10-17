import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { List } from './List'

@Entity()
export class Task {
  @PrimaryGeneratedColumn() id: number
  @Column() title: string
  @ManyToOne(type => List, list => list.tasks, { eager: true, onDelete: 'CASCADE', nullable: false }) list: List
  @Column() index: number
}
