import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm'
import { Board } from './Board'
import { User } from './User'

@Entity()
export class Project {
  @PrimaryGeneratedColumn() id: number
  @Column() name: string
  @OneToMany(type => Board, board => board.project) boards: Board[]
  @ManyToMany(type => User)
  @JoinTable()
  owners: User[]
}
