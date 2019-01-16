import { Column, Entity, OneToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { List } from './List'
import { Board } from './Board'

@Entity()
export class Lane {
  @PrimaryGeneratedColumn() id: number
  @Column() name: string
  @ManyToOne(type => Board, board => board.lanes, { eager: false, onDelete: 'CASCADE', nullable: true }) board: Board
  @OneToMany(type => List, list => list.laneId,  { eager: true }) lists: List[]
}
