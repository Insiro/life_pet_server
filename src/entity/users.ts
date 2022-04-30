import { Entity, Column, BaseEntity, PrimaryColumn } from "typeorm";
import { AppDataSource } from "../data-source";
import { hash } from "../utils";

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
  nick_name!: string; // user nickname
  @Column()
  salt!: string;
  passwd_chk(passwd: string): boolean {
    return this.certificate === hash(passwd, this.salt);
  }
}
