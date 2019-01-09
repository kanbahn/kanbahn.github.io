import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { List } from './List'

@Entity()
export class Lane {
  @PrimaryGeneratedColumn() id: number
  @Column() name: string
  @OneToMany(type => List, list => list.laneId) lists: List[]
}
