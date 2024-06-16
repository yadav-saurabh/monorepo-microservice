import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Key {
  @PrimaryColumn('uuid')
  key: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'request_rate' })
  rateLimit: number;

  @Column({ type: 'date' })
  expiration: Date;

  @Column({ name: 'is_active' })
  isActive: boolean;
}
