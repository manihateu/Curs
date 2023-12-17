import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Archive } from './archive.entity';
import { Subscriber } from './subscriber.entity';

@Entity()
export class Document {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  theme: string;

  @Column()
  inventoryNumber: string;

  @Column()
  cellCode: string;

  @Column()
  quantity: number;

  @Column()
  entryDate: Date;

  @ManyToOne(() => Archive)
  @JoinColumn()
  archive: Archive;

  @ManyToOne(() => Subscriber)
  @JoinColumn()
  subscriber: Subscriber;
}