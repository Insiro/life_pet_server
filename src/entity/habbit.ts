import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class StructedHabbit extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column({ type: "time" })
  sleep!: Date | null;
  @Column({ type: "time" })
  sleep_target!: Date | null;
  @Column({ type: "time" })
  awake!: Date | null;
  @Column({ type: "time" })
  awake_target!: Date | null;
  @Column()
  steps!: number;
  @Column()
  steps_target!: number;
  @Column({ type: "time" })
  health_time!: Date | null;
  @Column({ type: "time" })
  health_time_target!: Date | null;
  @Column({ type: "time" })
  study_time!: Date | null;
  @Column({ type: "time" })
  study_time_target!: Date | null;
  @Column({ type: "time" })
  morning_time!: Date | null;
  @Column({ type: "time" })
  morning_time_target!: Date | null;
  @Column({ type: "time" })
  launch_time!: Date | null;
  @Column({ type: "time" })
  launch_time_target!: Date | null;
  @Column({ type: "time" })
  dinner_time!: Date | null;
  @Column({ type: "time" })
  dinner_time_target!: Date | null;
  @Column({ type: "date" })
  date!: Date;
}
