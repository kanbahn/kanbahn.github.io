import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { List } from './List'

@Entity()
export class Task {
  @PrimaryGeneratedColumn() id: number
  @Column() title: string
  @Column() list: number  
  //@ManyToOne(type => List, list => list.tasks, { eager: false, onDelete: 'CASCADE', nullable: false }) list: List
  @Column() index: number
}
