import { Entity, Column, BaseEntity, PrimaryColumn } from "typeorm";

@Entity()
export class User extends BaseEntity {
  @PrimaryColumn()
  user_id!: string;
  @Column()
  user_name!: string;
  @Column()
  email!: string;
  @Column()
  call!: string; // varchar 10
  @Column()
  certificate!: string; //pwd
  @Column()
  name!: string;
  @Column()
  salt!: string;
}
