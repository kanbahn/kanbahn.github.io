import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { Board } from './Board'

@Entity()
export class Project {
  @PrimaryGeneratedColumn() id: number
  @Column() name: string
  @OneToMany(type => Board, board => board.project) boards: Board[]
}
