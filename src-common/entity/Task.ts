import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Stage } from './Stage'

@Entity()
export class Task {
  @PrimaryGeneratedColumn() id: number
  @Column() title: string
  @ManyToOne(type => Stage, stage => stage.tasks, { onDelete: 'CASCADE' }) stage: Stage
}
