import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm'
import { Lane } from './Lane'
import { Project } from './Project'

@Entity()
export class Board {
  @PrimaryGeneratedColumn() id: number
  @Column() name: string
  @OneToMany(type => Lane, lane => lane.board, { eager: true }) lanes: Lane[]
  @ManyToOne(type => Project, project => project.boards,
    { eager: false, onDelete: 'CASCADE', nullable: false }) project: Project
}
