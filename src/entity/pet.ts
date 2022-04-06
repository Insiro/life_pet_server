import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  BaseEntity,
} from "typeorm";
import { User } from "./users";
import { PetCategory } from "./petCategory";

@Entity()
export class Pet extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  @ManyToOne(() => PetCategory, (category) => category.id)
  category!: PetCategory;
  @Column()
  intimacy!: number; // 0 < intimacy < 100 친밀도
  @Column()
  exp!: number; // 0< exp< 1000????
  @Column()
  level!: number;
  @Column()
  complexity!: 1 | 2 | 3;
  @ManyToOne(() => User, (user) => user.user_id, { cascade: true })
  owner!: User;
}
