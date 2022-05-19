import { Entity, BaseEntity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./users";
@Entity()
export class Friend extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: string;
  @ManyToOne(() => User, (user) => user.user_id, { cascade: true })
  user1!: User;
  @ManyToOne(() => User, (user) => user.user_id, { cascade: true })
  user2!: User;
}
