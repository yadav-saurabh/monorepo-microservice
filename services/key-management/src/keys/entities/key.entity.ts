import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Key {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'request_rate', default: 100 })
  rateLimit: number;

  @Column({ nullable: true })
  expiration: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;
}
