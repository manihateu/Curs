import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
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