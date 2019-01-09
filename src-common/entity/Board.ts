import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { Lane } from './Lane'

@Entity()
export class Board {
  @PrimaryGeneratedColumn() id: number
  @Column() name: string
  @OneToMany(type => Lane, lane => lane.board) lanes: Lane[]
}
