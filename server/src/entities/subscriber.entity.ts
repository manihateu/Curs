import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Subscriber {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  department: string;

  @Column()
  phone: string;

  @Column()
  receivedDate: Date;
}