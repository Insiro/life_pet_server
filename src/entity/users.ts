import { Entity, Column, BaseEntity } from "typeorm";

@Entity()
export class User extends BaseEntity {
  @Column()
  user_name!: string;
  @Column()
  user_id!: string;
  @Column()
  email!: string;
  @Column()
  call!: string; // varchar 10
  @Column()
  certificate!: string; //pwd
  @Column()
  name!: string;
}
