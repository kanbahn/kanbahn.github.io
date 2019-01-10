import { Column, Entity, OneToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { List } from './List'
import { Board } from './Board'

@Entity()
export class Lane {
  @PrimaryGeneratedColumn() id: number
  @Column() name: string
  @ManyToOne(type => Board, board => board.lanes, { eager: true, onDelete: 'CASCADE', nullable: true }) board: Board
  @OneToMany(type => List, list => list.laneId) lists: List[]
}
