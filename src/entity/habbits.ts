import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./users";

@Entity()
export class Habbit extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: string;
  @Column()
  target!: number;
  @Column()
  achieve!: number;
  @Column()
  desc!: string;
  @Column({ type: "date" })
  date!: Date;
  @ManyToOne(() => User, (user) => user.user_id, { cascade: true })
  user!: User;
}
