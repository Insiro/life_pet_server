import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Timestamp,
} from "typeorm";

@Entity()
export class StructedHabbit extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  sleep!: Timestamp | null;
  @Column()
  sleep_target!: Timestamp | null;
  @Column()
  awake!: Timestamp | null;
  @Column()
  awake_target!: Timestamp | null;
  @Column()
  steps!: number | null;
  @Column()
  steps_target!: number | null;
  @Column()
  health_time!: Timestamp | null;
  @Column()
  health_time_target!: Timestamp | null;
  @Column()
  study_time!: Timestamp | null;
  @Column()
  study_time_target!: Timestamp | null;
  @Column({ type: "time" })
  morning_time!: Timestamp | null;
  @Column({ type: "time" })
  morning_time_target!: Timestamp | null;
  @Column()
  launch_time!: Timestamp | null;
  @Column()
  launch_time_target!: Timestamp | null;
  @Column()
  dinner_time!: Timestamp | null;
  @Column()
  dinner_time_target!: Timestamp | null;
  @Column()
  date!: Date;
}
