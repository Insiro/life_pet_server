import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class AchievementCategory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  name!: string;
  @Column()
  description!: string;
}
