import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  BaseEntity,
} from "typeorm";

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
}

@Entity()
export class PetCategory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;
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
