import {
  Entity,
  Column,
  OneToMany,
  BaseEntity,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./users";

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

@Entity()
export class AchievementCategory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  name!: string;
  @Column()
  description!: string;
}
