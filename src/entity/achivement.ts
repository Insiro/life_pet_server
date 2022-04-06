import {
  Entity,
  Column,
  OneToMany,
  BaseEntity,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./users";
import { AchievementCategory } from "./achivementCategory";

@Entity()
export class Achievement extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  @OneToMany(() => User, (user) => user.user_id)
  user!: User;
  @OneToMany(() => AchievementCategory, (cate) => cate.id)
  category!: AchievementCategory;
  @Column()
  achive_time!: number;
}
