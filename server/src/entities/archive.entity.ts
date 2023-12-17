import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity()
@Unique(['cellCode'])
export class Archive {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  shelf: number;

  @Column()
  shelfNumber: number;

  @Column()
  cell: number;

  @Column()
  cellCode: string;

  @Column()
  filling: string;
}