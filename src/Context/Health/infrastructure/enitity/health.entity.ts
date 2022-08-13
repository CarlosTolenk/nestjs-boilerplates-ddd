import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class HealthEntity {
  @PrimaryGeneratedColumn()
  public id: number;
}
