import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Habbit extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  target!: number;
  @Column()
  achieve!: number;
  @Column()
  desc!: string;
  @Column({ type: "date" })
  date!: Date;
}
