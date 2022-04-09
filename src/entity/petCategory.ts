import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";
@Entity()
export class PetCategory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: string;
  @Column()
  name!: string;
  @Column()
  image1!: string; //require to specifitcation Datatype of Images
  @Column()
  image2!: string;
  @Column()
  image3!: string;
  @Column()
  interaction1!: string;
  @Column()
  interaction2!: string;
  @Column()
  interaction3!: string;
}
