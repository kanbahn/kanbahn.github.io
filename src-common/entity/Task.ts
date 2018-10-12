import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Task {
  @PrimaryGeneratedColumn() id: number
  @Column() title: string
  @Column() lane: string
  @Column() column: string
}
